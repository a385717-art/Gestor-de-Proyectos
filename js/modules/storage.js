const STORAGE_KEY = 'taskflow_state';
const CONFIG_KEY = 'taskflow_config';

const defaultState = {
    selectedProjectId: null,
    projects: [],
    tasks: [],
    users: [],
    activity: [],
    counters: {
        projectId: 1,
        taskId: 1,
        userId: 1,
    },
};

const defaultConfig = {
    theme: 'light',
};

function loadState() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : structuredClone(defaultState);
    } catch {
        return structuredClone(defaultState);
    }
}

function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadConfig() {
    try {
        const stored = localStorage.getItem(CONFIG_KEY);
        return stored ? JSON.parse(stored) : { ...defaultConfig };
    } catch {
        return { ...defaultConfig };
    }
}

function saveConfig(config) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

function exportAppData(state, config) {
    return JSON.stringify({ state, config }, null, 2);
}

function importAppData(jsonText) {
    const parsed = JSON.parse(jsonText);
    if (!parsed.state || !parsed.config) {
        throw new Error('Estructura de datos inválida');
    }
    return parsed;
}

function clearAllData() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CONFIG_KEY);
}

function createActivity(message) {
    return {
        id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        message,
        date: new Date().toISOString(),
    };
}

export { loadState, saveState, loadConfig, saveConfig, exportAppData, importAppData, clearAllData, createActivity };
