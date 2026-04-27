import { formatDate, createId } from './utils.js';
const section = document.getElementById('projects-section');

function renderProjects(state, actions) {
    const project = state.projects.find((item) => item.id === state.selectedProjectId);
    section.innerHTML = `
        <div class="section-title">
            <div><h2>Proyectos</h2><p>Crea y administra proyectos.</p></div>
            <button id="new-project" class="button-primary">Nuevo proyecto</button>
        </div>
        <div class="card-grid">
            ${state.projects.map((item) => `
                <div class="card ${item.id === state.selectedProjectId ? 'selected' : ''}">
                    <h3>${item.name}</h3>
                    <p>${item.description || 'Sin descripción'}</p>
                    <div class="task-footer">
                        <small>${formatDate(item.createdAt)}</small>
                    </div>
                    <div class="task-actions">
                        <button data-action="select" data-id="${item.id}">Abrir</button>
                        <button data-action="edit" data-id="${item.id}">Editar</button>
                        <button data-action="delete" data-id="${item.id}">Eliminar</button>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="card">
            <h2>${project ? `Proyecto seleccionado: ${project.name}` : 'Selecciona un proyecto'}</h2>
            ${project ? `
                <p>${project.description || 'Este proyecto no tiene descripción.'}</p>
                <p><strong>ID:</strong> ${project.id}</p>
            ` : '<p>Elige un proyecto o crea uno nuevo para administrar tareas.</p>'}
        </div>
    `;

    section.querySelector('#new-project').addEventListener('click', () => {
        showProjectForm('Crear nuevo proyecto', null, actions);
    });

    section.querySelectorAll('button[data-action]').forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            const project = state.projects.find((item) => item.id === id);
            if (button.dataset.action === 'select') {
                actions.selectProject(id);
            }
            if (button.dataset.action === 'edit' && project) {
                showProjectForm('Editar proyecto', project, actions);
            }
            if (button.dataset.action === 'delete' && confirm('¿Eliminar este proyecto y sus tareas?')) {
                actions.removeProject(id);
            }
        });
    });
}

function showProjectForm(title, project, actions) {
    const modal = document.createElement('div');
    modal.className = 'card';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.zIndex = '200';
    modal.style.width = 'min(520px, 92vw)';
    modal.innerHTML = `
        <div class="section-title"><h2>${title}</h2></div>
        <div class="form-row">
            <input id="project-name" type="text" placeholder="Nombre del proyecto" value="${project?.name || ''}" />
            <textarea id="project-description" placeholder="Descripción breve">${project?.description || ''}</textarea>
        </div>
        <div class="form-actions">
            <button id="cancel-project" class="button-secondary">Cancelar</button>
            <button id="save-project" class="button-primary">Guardar</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('cancel-project').addEventListener('click', () => modal.remove());
    document.getElementById('save-project').addEventListener('click', () => {
        const name = document.getElementById('project-name').value.trim();
        const description = document.getElementById('project-description').value.trim();
        if (!name) {
            alert('El nombre del proyecto es obligatorio.');
            return;
        }
        if (project) {
            actions.updateProject({ ...project, name, description });
        } else {
            actions.addProject({
                id: createId('proj'),
                name,
                description,
                createdAt: new Date().toISOString(),
            });
        }
        modal.remove();
    });
}

export { renderProjects };
