# Sistema de Gestión de Proyectos & Tareas

## 📖 Descripción General
[cite_start]El **Sistema de Gestión de Proyectos & Tareas** es una aplicación web responsiva diseñada para facilitar la organización de flujos de trabajo[cite: 3, 134]. [cite_start]Elaborado bajo la metodología Ágil (principios INVEST)[cite: 5, 9], este sistema permite a los usuarios gestionar sus proyectos mediante tableros visuales, métricas en tiempo real y asignación de actividades, todo ejecutado con alta velocidad en el navegador del usuario sin necesidad de un backend tradicional.

## ✨ Características Principales

* **Gestión de Proyectos y Tareas:** Creación, edición y eliminación de proyectos y tareas individuales. [cite_start]Permite asignar fechas límite, descripciones, y niveles de prioridad (Alta, Media, Baja)[cite: 14, 33, 44].
* [cite_start]**Tablero Kanban Interactivo:** Interfaz visual con columnas de estado (Pendiente, En Progreso, Terminado) que soporta la funcionalidad *Drag & Drop* para mover tareas de manera intuitiva[cite: 52, 57].
* [cite_start]**Dashboard y Estadísticas:** Panel principal con un resumen de métricas, un *feed* de actividad reciente (últimas 10 acciones) y gráficos visuales que muestran la distribución del trabajo y el porcentaje de avance[cite: 63, 66, 72, 76].
* [cite_start]**Vista de Calendario:** Organización de las tareas en una vista mensual basada en sus fechas límite para no perder eventos importantes[cite: 81, 82].
* [cite_start]**Gestión de Equipo (Simulada):** Capacidad para registrar perfiles de usuario simples y asignarles tareas, emulando un entorno colaborativo[cite: 87, 92].
* [cite_start]**Respaldo y Portabilidad:** Exportación e importación de todos los datos del área de trabajo mediante archivos `.json`, lo que permite crear copias de seguridad de forma sencilla[cite: 110, 114].
* [cite_start]**Modo Oscuro:** Adaptabilidad de la interfaz con cambio dinámico entre tema claro y oscuro, respetando las preferencias del sistema operativo[cite: 106, 107].

## 🛠 Arquitectura y Tecnologías

[cite_start]El proyecto se apega a una arquitectura pura de Frontend enfocada en el rendimiento (carga inicial menor a 3 segundos) y la mantenibilidad:
* [cite_start]**Estructura y Estilos:** HTML y CSS (uso de variables CSS para los temas y diseño completamente *responsive*)[cite: 108, 134].
* [cite_start]**Lógica de Negocio:** JavaScript Vanilla organizado en módulos funcionales separados (por ejemplo: `projects.js`, `tasks.js`, `storage.js`).
* [cite_start]**Persistencia de Datos:** Todos los proyectos, tareas, usuarios e historial se guardan automáticamente a través de la API `LocalStorage` bajo claves dedicadas (ej. `pm_projects`, `pm_config`), garantizando que no se pierda el trabajo al recargar la página[cite: 97].
* [cite_start]**Librerías Adicionales sugeridas:** Compatibilidad con `Chart.js` para la generación de gráficas visuales y `SortableJS` (o HTML5 API) para el comportamiento Drag & Drop[cite: 58, 73].

## 🚀 Instalación y Uso Local

[cite_start]Dado que el sistema confía en el almacenamiento local del navegador para funcionar (`LocalStorage`)[cite: 97], la instalación es extremadamente sencilla y no requiere servidores o bases de datos:

1. **Clona este repositorio** en tu máquina local:
   ```bash
   git clone [https://github.com/tu-usuario/sistema-gestion-proyectos.git](https://github.com/tu-usuario/sistema-gestion-proyectos.git)
