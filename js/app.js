import { loadState, saveState, loadConfig, saveConfig, exportAppData, importAppData, clearAllData, createActivity } from './modules/storage.js';
import { applyTheme, initThemeToggle } from './modules/config.js';
import { showToast } from './modules/notifications.js';
import { renderDashboard } from './modules/dashboard.js';
import { renderProjects } from './modules/projects.js';
import { renderKanban } from './modules/kanban.js';
import { renderCalendar } from './modules/calendar.js';
import { renderUsers } from './modules/users.js';
import { renderSettings } from './modules/statistics.js';

const sections = Array.from(document.querySelectorAll('.app-section'));
const navButtons = Array.from(document.querySelectorAll('.nav-button'));
const themeButton = document.getElementById('theme-toggle');

let state = loadState();
let config = loadConfig();

function save() {
    saveState(state);
    renderAll();
}

function selectSection(sectionId) {
    sections.forEach((section) => {
        section.classList.toggle('active', section.id === `${sectionId}-section`);
    });
    navButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.section === sectionId);
    });
}

function renderAll() {
    renderDashboard(state, {
        updateTask,
        removeTask,
        addTask,
    });
    renderProjects(state, {
        addProject,
        updateProject,
        removeProject,
        selectProject,
    });
    renderKanban(state, {
        addTask,
        updateTask,
        removeTask,
        moveTask,
        selectProject,
        state,
    });
    renderCalendar(state);
    renderUsers(state, {
        addUser,
        updateUser,
        removeUser,
        assignTask,
    });
    renderSettings(config, {
        onExport: () => {
            const data = exportAppData(state, config);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'taskflow-data.json';
            a.click();
            URL.revokeObjectURL(url);
            showToast('Datos exportados correctamente.', 'success');
        },
        onImport: async () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';
            input.addEventListener('change', async () => {
                if (!input.files?.length) return;
                const text = await input.files[0].text();
                try {
                    const imported = importAppData(text);
                    state = imported.state;
                    config = imported.config;
                    saveConfig(config);
                    saveState(state);
                    applyTheme(config.theme);
                    renderAll();
                    showToast('Datos importados correctamente.', 'success');
                } catch (err) {
                    showToast('Archivo JSON inválido.', 'error');
                }
            });
            input.click();
        },
        onClearStorage: () => {
            clearAllData();
            state = loadState();
            config = loadConfig();
            applyTheme(config.theme);
            renderAll();
            showToast('Todos los datos han sido eliminados.', 'warning');
        },
        onThemeChange: (theme) => {
            config.theme = theme;
            saveConfig(config);
            applyTheme(theme);
            showToast(`Tema cambiado a ${theme}.`, 'success');
        },
    });
}

function ensureProjectSelection() {
    if (!state.selectedProjectId && state.projects.length) {
        state.selectedProjectId = state.projects[0].id;
    }
}

function selectProject(projectId) {
    state.selectedProjectId = projectId;
    save();
}

function addProject(project) {
    state.projects.push(project);
    state.selectedProjectId = project.id;
    state.activity.unshift(createActivity(`Proyecto creado: ${project.name}`));
    save();
    showToast('Proyecto agregado.', 'success');
}

function updateProject(project) {
    const index = state.projects.findIndex((item) => item.id === project.id);
    if (index < 0) return;
    state.projects[index] = project;
    state.activity.unshift(createActivity(`Proyecto actualizado: ${project.name}`));
    save();
    showToast('Proyecto actualizado.', 'success');
}

function removeProject(projectId) {
    state.projects = state.projects.filter((project) => project.id !== projectId);
    state.tasks = state.tasks.filter((task) => task.projectId !== projectId);
    if (state.selectedProjectId === projectId) {
        state.selectedProjectId = state.projects[0]?.id || null;
    }
    state.activity.unshift(createActivity('Proyecto eliminado.'));
    save();
    showToast('Proyecto eliminado.', 'warning');
}

function addTask(task) {
    state.tasks.push(task);
    state.activity.unshift(createActivity(`Tarea creada: ${task.title}`));
    save();
    showToast('Tarea agregada.', 'success');
}

function updateTask(task) {
    const index = state.tasks.findIndex((item) => item.id === task.id);
    if (index < 0) return;
    state.tasks[index] = task;
    state.activity.unshift(createActivity(`Tarea actualizada: ${task.title}`));
    save();
    showToast('Tarea actualizada.', 'success');
}

function removeTask(taskId) {
    state.tasks = state.tasks.filter((task) => task.id !== taskId);
    state.activity.unshift(createActivity('Tarea eliminada.'));
    save();
    showToast('Tarea eliminada.', 'warning');
}

function moveTask(taskId, column) {
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task) return;
    task.status = column.dataset.status;
    task.updatedAt = new Date().toISOString();
    state.activity.unshift(createActivity(`Tarea movida a ${task.status}: ${task.title}`));
    save();
}

function addUser(user) {
    state.users.push(user);
    state.activity.unshift(createActivity(`Usuario creado: ${user.name}`));
    save();
    showToast('Usuario agregado.', 'success');
}

function updateUser(user) {
    const index = state.users.findIndex((item) => item.id === user.id);
    if (index < 0) return;
    state.users[index] = user;
    state.activity.unshift(createActivity(`Usuario actualizado: ${user.name}`));
    save();
    showToast('Usuario actualizado.', 'success');
}

function removeUser(userId) {
    state.users = state.users.filter((user) => user.id !== userId);
    state.tasks = state.tasks.map((task) => ({ ...task, assigneeId: task.assigneeId === userId ? null : task.assigneeId }));
    state.activity.unshift(createActivity('Usuario eliminado.'));
    save();
    showToast('Usuario eliminado.', 'warning');
}

function assignTask(taskId, userId) {
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task) return;
    task.assigneeId = userId;
    task.updatedAt = new Date().toISOString();
    state.activity.unshift(createActivity(`Tarea asignada: ${task.title}`));
    save();
    showToast('Tarea asignada.', 'success');
}

function initialize() {
    if (!state.counters) {
        state = {
            ...state,
            selectedProjectId: null,
            projects: state.projects || [],
            tasks: state.tasks || [],
            users: state.users || [],
            activity: state.activity || [],
            counters: { projectId: 1, taskId: 1, userId: 1 },
        };
        saveState(state);
    }
    ensureProjectSelection();
    applyTheme(config.theme);
    initThemeToggle(themeButton, config.theme, (theme) => {
        config.theme = theme;
        saveConfig(config);
        applyTheme(theme);
        showToast(`Tema cambiado a ${theme}.`, 'success');
    });
    navButtons.forEach((button) => {
        button.addEventListener('click', () => selectSection(button.dataset.section));
    });
    renderAll();
}

initialize();
