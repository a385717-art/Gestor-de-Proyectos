import { formatDate, createId } from './utils.js';
const section = document.getElementById('kanban-section');

function renderKanban(state, actions) {
    const project = state.projects.find((item) => item.id === state.selectedProjectId);
    const projectTasks = project ? state.tasks.filter((task) => task.projectId === project.id) : [];

    section.innerHTML = `
        <div class="section-title">
            <div><h2>Tablero Kanban</h2><p>Mueve las tareas entre estados.</p></div>
            <button id="new-task" class="button-primary">Nueva tarea</button>
        </div>
        ${project ? `<div class="board-grid">
            ${['pendiente','en progreso','terminado'].map((stateName) => `
                <div class="board-column" data-status="${stateName}">
                    <div class="column-header"><h3>${stateName.replace('en progreso','En progreso')}</h3><span>${projectTasks.filter((task) => task.status === stateName).length}</span></div>
                    ${projectTasks.filter((task) => task.status === stateName).map((task) => `
                        <article class="task-card" draggable="true" data-id="${task.id}">
                            <strong>${task.title}</strong>
                            <div>${task.description || 'Sin descripción'}</div>
                            <div class="task-footer">
                                <span class="badge badge-${task.priority}">${task.priority}</span>
                                <span>${formatDate(task.dueDate)}</span>
                            </div>
                            <div class="task-actions">
                                <button data-action="edit" data-id="${task.id}">Editar</button>
                                <button data-action="delete" data-id="${task.id}">Eliminar</button>
                            </div>
                        </article>
                    `).join('')}
                </div>
            `).join('')}
        </div>` : '<div class="card"><p>Selecciona un proyecto para ver su tablero.</p></div>'}
    `;

    if (project) {
        section.querySelectorAll('.task-card').forEach((card) => {
            card.addEventListener('dragstart', () => card.classList.add('dragging'));
            card.addEventListener('dragend', () => card.classList.remove('dragging'));
        });
        section.querySelectorAll('.board-column').forEach((column) => {
            column.addEventListener('dragover', (event) => event.preventDefault());
            column.addEventListener('drop', (event) => {
                event.preventDefault();
                const taskId = document.querySelector('.dragging')?.dataset.id;
                if (taskId) {
                    actions.moveTask(taskId, column);
                }
            });
        });
        section.querySelector('#new-task').addEventListener('click', () => showTaskForm(null, project, actions, state));
        section.querySelectorAll('button[data-action]').forEach((button) => {
            button.addEventListener('click', () => {
                const taskId = button.dataset.id;
                const task = state.tasks.find((item) => item.id === taskId);
                if (button.dataset.action === 'edit' && task) {
                    showTaskForm(task, project, actions, state);
                }
                if (button.dataset.action === 'delete' && confirm('¿Eliminar esta tarea?')) {
                    actions.removeTask(taskId);
                }
            });
        });
    }
}

function showTaskForm(task, project, actions, state) {
    const modal = document.createElement('div');
    modal.className = 'card';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.zIndex = '200';
    modal.style.width = 'min(520px, 92vw)';
    modal.innerHTML = `
        <div class="section-title"><h2>${task ? 'Editar tarea' : 'Nueva tarea'}</h2></div>
        <div class="form-row">
            <input id="task-title" type="text" placeholder="Título" value="${task?.title || ''}" />
            <textarea id="task-description" placeholder="Descripción">${task?.description || ''}</textarea>
            <div class="input-inline">
                <select id="task-priority">
                    <option value="alta" ${task?.priority === 'alta' ? 'selected' : ''}>Alta</option>
                    <option value="media" ${task?.priority === 'media' ? 'selected' : ''}>Media</option>
                    <option value="baja" ${task?.priority === 'baja' ? 'selected' : ''}>Baja</option>
                </select>
                <select id="task-status">
                    <option value="pendiente" ${task?.status === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                    <option value="en progreso" ${task?.status === 'en progreso' ? 'selected' : ''}>En progreso</option>
                    <option value="terminado" ${task?.status === 'terminado' ? 'selected' : ''}>Terminado</option>
                </select>
            </div>
            <div class="input-inline">
                <input id="task-duedate" type="date" value="${task?.dueDate || ''}" />
                <select id="task-assignee">
                    <option value="">Sin asignar</option>
                </select>
            </div>
        </div>
        <div class="form-actions">
            <button id="cancel-task" class="button-secondary">Cancelar</button>
            <button id="save-task" class="button-primary">Guardar</button>
        </div>
    `;
    document.body.appendChild(modal);

    const assigneeSelect = modal.querySelector('#task-assignee');
    state.users.forEach((user) => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        if (task?.assigneeId === user.id) option.selected = true;
        assigneeSelect.appendChild(option);
    });

    modal.querySelector('#cancel-task').addEventListener('click', () => modal.remove());
    modal.querySelector('#save-task').addEventListener('click', () => {
        const title = modal.querySelector('#task-title').value.trim();
        const description = modal.querySelector('#task-description').value.trim();
        const priority = modal.querySelector('#task-priority').value;
        const status = modal.querySelector('#task-status').value;
        const dueDate = modal.querySelector('#task-duedate').value;
        const assigneeId = modal.querySelector('#task-assignee').value || null;
        if (!title || !dueDate) {
            alert('El título y la fecha límite son obligatorios.');
            return;
        }
        if (task) {
            actions.updateTask({ ...task, title, description, priority, status, dueDate, assigneeId, updatedAt: new Date().toISOString() });
        } else {
            actions.addTask({
                id: createId('task'),
                projectId: project.id,
                title,
                description,
                priority,
                status,
                dueDate,
                assigneeId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        }
        modal.remove();
    });
}

export { renderKanban };
