const section = document.getElementById('settings-section');

function renderSettings(config, actions) {
    section.innerHTML = `
        <div class="section-title">
            <div><h2>Configuración</h2><p>Exporta, importa o limpia tus datos.</p></div>
        </div>
        <div class="card-grid">
            <div class="card">
                <h2>Preferencias</h2>
                <div class="form-row">
                    <button id="theme-set" class="button-secondary">Cambiar tema</button>
                </div>
            </div>
            <div class="card">
                <h2>Exportar / importar</h2>
                <div class="form-actions">
                    <button id="export-data" class="button-primary">Exportar JSON</button>
                    <button id="import-data" class="button-secondary">Importar JSON</button>
                </div>
            </div>
            <div class="card">
                <h2>Datos</h2>
                <p>Elimina todos los datos almacenados en el navegador.</p>
                <button id="clear-storage" class="button-danger">Eliminar datos</button>
            </div>
        </div>
    `;

    section.querySelector('#export-data').addEventListener('click', actions.onExport);
    section.querySelector('#import-data').addEventListener('click', actions.onImport);
    section.querySelector('#clear-storage').addEventListener('click', actions.onClearStorage);
    section.querySelector('#theme-set').addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
        actions.onThemeChange(nextTheme);
    });
}

export { renderSettings };
