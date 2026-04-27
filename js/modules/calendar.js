import { formatDate } from './utils.js';
const section = document.getElementById('calendar-section');

function renderCalendar(state) {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstWeekday = new Date(year, month, 1).getDay();
    const days = [];
    for (let i = 0; i < firstWeekday; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
    }

    const tasksByDate = state.tasks.reduce((map, task) => {
        if (task.dueDate) {
            map[task.dueDate] = map[task.dueDate] || [];
            map[task.dueDate].push(task);
        }
        return map;
    }, {});

    section.innerHTML = `
        <div class="section-title">
            <div><h2>Calendario</h2><p>Vista mensual de tareas según fecha límite.</p></div>
        </div>
        <div class="card">
            <div class="calendar-grid">
                ${['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map((weekday) => `<div class="calendar-cell"><strong>${weekday}</strong></div>`).join('')}
                ${days.map((date) => {
                    if (!date) return '<div class="calendar-cell"></div>';
                    const key = date.toISOString().slice(0, 10);
                    const tasks = tasksByDate[key] || [];
                    return `
                        <div class="calendar-cell">
                            <header><span>${date.getDate()}</span></header>
                            ${tasks.slice(0, 3).map((task) => `<span class="calendar-task">${task.title}</span>`).join('')}
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

export { renderCalendar };
