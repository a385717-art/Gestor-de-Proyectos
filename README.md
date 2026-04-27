# TaskFlow

TaskFlow es una aplicación web de gestión de proyectos y tareas desarrollada con HTML, CSS y JavaScript, usando LocalStorage para persistencia.

## Funcionalidades
- Crear, editar y eliminar proyectos.
- Crear, editar y eliminar tareas con prioridad, estado y fecha límite.
- Tablero Kanban con drag and drop.
- Dashboard con métricas y actividad reciente.
- Calendario mensual de tareas.
- Perfiles de usuario simples y asignación de tareas.
- Modo claro/oscuro.
- Exportar / importar datos en JSON.
- Eliminar todos los datos de LocalStorage.

## Instalación y Ejecución

### Prerrequisitos
- Un navegador web moderno (Chrome, Firefox, Edge, etc.).
- Python 3 instalado (para ejecutar el servidor local) o cualquier servidor HTTP.

### Pasos para ejecutar localmente
1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/a385717-art/Gestor-de-Proyectos.git
   cd Gestor-de-Proyectos
   ```

2. **Ejecuta un servidor local**:
   - Con Python 3:
     ```bash
     python3 -m http.server 8000
     ```
   - O con Node.js (instala `http-server` globalmente):
     ```bash
     npx http-server -p 8000
     ```

3. **Abre en el navegador**:
   - Ve a `http://localhost:8000` en tu navegador.
   - La aplicación se cargará automáticamente.

## Uso
1. Navega entre las secciones con el menú superior.
2. Agrega proyectos, tareas y usuarios desde las secciones correspondientes.
3. Usa el tablero Kanban para mover tareas entre estados con drag and drop.
4. Revisa métricas en el Dashboard.
5. Cambia entre modo claro y oscuro con el botón en la esquina superior derecha.

## Contribución
¡Las contribuciones son bienvenidas! Para contribuir:
1. Haz un fork del repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

### Guías de desarrollo
- Usa módulos ES6 para organizar el código.
- Mantén la consistencia con los estilos CSS existentes.
- Prueba en múltiples navegadores.
- Asegúrate de que la aplicación funcione sin dependencias externas (excepto Chart.js para gráficas).

## Requisitos
El sistema sigue los requerimientos funcionales y no funcionales definidos para la aplicación TaskFlow.

## Licencia
[Especifica la licencia si aplica, por ejemplo MIT].
