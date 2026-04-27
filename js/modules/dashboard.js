import { formatDate } from './utils.js';
const section = document.getElementById('dashboard-section');

function renderDashboard(state, actions) {
    const tasks = state.tasks;
    const totalProjects = state.projects.length;
    const pending = tasks.filter((task) => task.status === 'pendiente').length;
    const completed = tasks.filter((task) => task.status === 'terminado').length;
    const progressPercent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

    section.innerHTML = `
        <div class="section-title">
            <div><h2>Dashboard</h2><p>Resumen general de proyectos y tareas.</p></div>
        </div>
        <div class="card-grid">
            <div class="card">
                <span class="stat-label">Total de proyectos</span>
                <span class="stat-number">${totalProjects}</span>
            </div>
            <div class="card">
                <span class="stat-label">Tareas pendientes</span>
                <span class="stat-number">${pending}</span>
            </div>
            <div class="card">
                <span class="stat-label">Tareas completadas</span>
                <span class="stat-number">${completed}</span>
            </div>
            <div class="card">
                <span class="stat-label">Avance promedio</span>
                <span class="stat-number">${progressPercent}%</span>
            </div>
        </div>
        <div class="card" style="margin-top:18px;">
            <h2>Gráfica de Avance</h2>
            <canvas id="progressChart" width="400" height="200"></canvas>
        </div>
        <div class="card" style="margin-top:18px;">
            <h2>Administrar Pendientes</h2>
            <ul class="task-list">
                ${tasks.filter((task) => task.status === 'pendiente').map((task) => `
                    <li class="task-item">
                        <div>
                            <strong>${task.title}</strong>
                            <div>${task.description || 'Sin descripción'}</div>
                            <div class="task-footer">
                                <span class="badge badge-${task.priority}">${task.priority}</span>
                                <span>${formatDate(task.dueDate)}</span>
                            </div>
                        </div>
                        <div class="task-actions">
                            <button class="complete-btn" data-id="${task.id}">Completar</button>
                            <button class="edit-btn" data-id="${task.id}">Editar</button>
                            <button class="delete-btn" data-id="${task.id}">Eliminar</button>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>
        <div class="card" style="margin-top:18px;">
            <h2>Actividad reciente</h2>
            <ul class="activity-list">
                ${state.activity.slice(0, 6).map((item) => `
                    <li class="activity-item">
                        <div>${item.message}</div>
                        <div class="task-footer">${formatDate(item.date)}</div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    // Crear la gráfica
    const ctx = document.getElementById('progressChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completadas', 'Pendientes'],
            datasets: [{
                data: [completed, pending],
                backgroundColor: ['#4CAF50', '#FFC107'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total ? Math.round((context.parsed / total) * 100) : 0;
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // Agregar event listeners para los botones
    section.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const taskId = btn.dataset.id;
            const task = state.tasks.find(t => t.id === taskId);
            if (task) {
                task.status = 'terminado';
                actions.updateTask(task);
            }
        });
    });

    section.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const taskId = btn.dataset.id;
            actions.removeTask(taskId);
        });
    });

    section.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const taskId = btn.dataset.id;
            const task = state.tasks.find(t => t.id === taskId);
            if (task) {
                // Aquí podrías abrir un modal para editar, pero por simplicidad, cambiar a completado o algo
                // Para este ejemplo, simplemente mostrar un alert
                alert('Editar tarea: ' + task.title);
            }
        });
    });
}

export { renderDashboard };
