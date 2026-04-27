import { createId, formatDate } from './utils.js';
const section = document.getElementById('users-section');

function renderUsers(state, actions) {
    section.innerHTML = `
        <div class="section-title">
            <div><h2>Usuarios</h2><p>Perfiles simples y asignación de tareas.</p></div>
            <button id="new-user" class="button-primary">Nuevo usuario</button>
        </div>
        <div class="card-grid">
            ${state.users.map((user) => `
                <div class="card">
                    <h3>${user.name}</h3>
                    <p>Creado: ${formatDate(user.createdAt)}</p>
                    <div class="task-actions">
                        <button data-action="delete" data-id="${user.id}">Eliminar</button>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="card">
            <h2>Asignaciones</h2>
            <table class="table">
                <thead>
                    <tr><th>Tarea</th><th>Proyecto</th><th>Responsable</th></tr>
                </thead>
                <tbody>
                    ${state.tasks.map((task) => {
                        const project = state.projects.find((proj) => proj.id === task.projectId);
                        const user = state.users.find((usr) => usr.id === task.assigneeId);
                        return `<tr><td>${task.title}</td><td>${project?.name || 'Sin proyecto'}</td><td>${user?.name || 'Sin asignar'}</td></tr>`;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;

    section.querySelector('#new-user').addEventListener('click', () => showUserForm(actions));
    section.querySelectorAll('button[data-action="delete"]').forEach((button) => {
        button.addEventListener('click', () => {
            if (confirm('¿Eliminar este usuario?')) {
                actions.removeUser(button.dataset.id);
            }
        });
    });
}

function showUserForm(actions) {
    const modal = document.createElement('div');
    modal.className = 'card';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.zIndex = '200';
    modal.style.width = 'min(520px, 92vw)';
    modal.innerHTML = `
        <div class="section-title"><h2>Crear usuario</h2></div>
        <div class="form-row">
            <input id="user-name" type="text" placeholder="Nombre" />
        </div>
        <div class="form-actions">
            <button id="cancel-user" class="button-secondary">Cancelar</button>
            <button id="save-user" class="button-primary">Guardar</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('#cancel-user').addEventListener('click', () => modal.remove());
    modal.querySelector('#save-user').addEventListener('click', () => {
        const name = modal.querySelector('#user-name').value.trim();
        if (!name) {
            alert('El nombre es obligatorio.');
            return;
        }
        actions.addUser({
            id: createId('user'),
            name,
            createdAt: new Date().toISOString(),
        });
        modal.remove();
    });
}

export { renderUsers };
