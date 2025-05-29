const state = {
    isActive: true,
    blockedCount: 0,
    startTime: null,
    filtersCount: 0,
    trackersCount: 0,
    scriptsCount: 0,
    theme: 'dark',
    lastUpdate: new Date(),
    adBlockInterval: null,
    statsInterval: null,
    accentColor: '#6a5acd'
};

const statusText = document.getElementById('statusText');
const themeToggle = document.getElementById('themeToggle');
const blockedCountEl = document.getElementById('blockedCount');
const uptimeEl = document.getElementById('uptime');
const toggleBtn = document.getElementById('toggleBtn');
const loadingProgress = document.getElementById('loadingProgress');
const lastUpdateEl = document.getElementById('lastUpdate');
const filtersCountEl = document.getElementById('filtersCount');
const trackersCountEl = document.getElementById('trackersCount');
const scriptsCountEl = document.getElementById('scriptsCount');

function init() {
    const savedState = localStorage.getItem('bloxState');
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            
            state.isActive = parsed.isActive;
            state.blockedCount = parsed.blockedCount;
            state.startTime = parsed.startTime ? new Date(parsed.startTime) : null;
            state.filtersCount = parsed.filtersCount || 0;
            state.trackersCount = parsed.trackersCount || 0;
            state.scriptsCount = parsed.scriptsCount || 0;
            state.theme = parsed.theme || 'dark';
            state.lastUpdate = parsed.lastUpdate ? new Date(parsed.lastUpdate) : new Date();
            
            if (state.isActive && !state.startTime) {
                state.startTime = new Date();
            }
        } catch (e) {
            console.error('Error loading state:', e);
            resetState();
        }
    } else {
        resetState();
    }
    
    applyTheme();
    
    updateUI();
    
    startAdBlockingSimulation();
    
    startUptimeCounter();
    
    loadFiltersStats();
    
    updateLastUpdateDisplay();
    
    state.statsInterval = setInterval(updateLastUpdateDisplay, 60000);
}

function resetState() {
    state.isActive = true;
    state.blockedCount = 0;
    state.startTime = new Date();
    state.filtersCount = 0;
    state.trackersCount = 0;
    state.scriptsCount = 0;
    state.theme = 'dark';
    state.lastUpdate = new Date();
}

// Применение темы
function applyTheme() {
    if (state.theme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.checked = true;
    } else {
        document.body.classList.remove('light-theme');
        themeToggle.checked = false;
    }
}

function updateUI() {
    statusText.textContent = state.isActive ? 'active' : 'inactive';
    statusText.classList.toggle('inactive', !state.isActive);
    statusText.classList.toggle('active', state.isActive);
    
    toggleBtn.textContent = state.isActive ? 'Disable' : 'Enable';
    toggleBtn.classList.toggle('inactive', !state.isActive);
    
    blockedCountEl.textContent = formatNumber(state.blockedCount);
    updateUptime();
    
    filtersCountEl.textContent = formatNumber(state.filtersCount);
    trackersCountEl.textContent = formatNumber(state.trackersCount);
    scriptsCountEl.textContent = formatNumber(state.scriptsCount);
}

function formatNumber(num) {
    if (num > 999999) return (num / 1000000).toFixed(1) + 'M';
    if (num > 9999) return (num / 1000).toFixed(1) + 'K';
    if (num > 999) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function updateUptime() {
    if (!state.isActive || !state.startTime) {
        uptimeEl.textContent = '0:00';
        return;
    }
    
    const seconds = Math.floor((new Date() - state.startTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    uptimeEl.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function startUptimeCounter() {
    if (!state.isActive) return;
    
    updateUptime();
    
    setInterval(updateUptime, 1000);
}

function loadFiltersStats() {
    setTimeout(() => {
        state.filtersCount = 12492 + Math.floor(Math.random() * 1000);
        state.trackersCount = 347 + Math.floor(Math.random() * 100);
        state.scriptsCount = 42 + Math.floor(Math.random() * 20);
        updateUI();
        saveState();
    }, 1000);
}

function updateLastUpdateDisplay() {
    const now = new Date();
    const diffInMinutes = Math.floor((now - state.lastUpdate) / (1000 * 60));

let updateText;
if (diffInMinutes < 1) {
    updateText = "Updated: just now";
} else if (diffInMinutes < 60) {
    updateText = `Updated: ${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
} else {
    const diffInHours = Math.floor(diffInMinutes / 60);
    updateText = `Updated: ${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
}

lastUpdateEl.textContent = updateText;
}

function startAdBlockingSimulation() {
if (!state.isActive) return;

if (state.adBlockInterval) {
    clearInterval(state.adBlockInterval);
}

state.adBlockInterval = setInterval(() => {
    if (state.isActive) {
        const increment = Math.floor(Math.random() * 5) + 1;
        state.blockedCount += increment;
        blockedCountEl.textContent = formatNumber(state.blockedCount);
        
        if (state.blockedCount % 10 === 0) {
            saveState();
        }
    }
}, 2000);
}

themeToggle.addEventListener('change', () => {
    state.theme = themeToggle.checked ? 'light' : 'dark';
    applyTheme();
    saveState();
});

toggleBtn.addEventListener('click', () => {
    loadingProgress.style.width = '100%';

    setTimeout(() => {
        state.isActive = !state.isActive;
        
        if (state.isActive) {
            state.startTime = new Date();
            startAdBlockingSimulation();
            startUptimeCounter();
        } else {
            if (state.adBlockInterval) {
                clearInterval(state.adBlockInterval);
                state.adBlockInterval = null;
            }
        }
        
        updateUI();
        
        saveState();
        
        setTimeout(() => {
            loadingProgress.style.width = '0%';
        }, 300);
    }, 500);
});

function saveState() {
    state.lastUpdate = new Date();
    localStorage.setItem('bloxState', JSON.stringify({
        isActive: state.isActive,
        blockedCount: state.blockedCount,
        startTime: state.startTime,
        filtersCount: state.filtersCount,
        trackersCount: state.trackersCount,
        scriptsCount: state.scriptsCount,
        theme: state.theme,
        lastUpdate: state.lastUpdate
    }));
}

window.addEventListener('beforeunload', () => {
    if (state.adBlockInterval) {
        clearInterval(state.adBlockInterval);
    }
    if (state.statsInterval) {
        clearInterval(state.statsInterval);
    }
});

document.addEventListener('DOMContentLoaded', init);

chrome.runtime.sendMessage({action: "getBlockedCount"}, (response) => {
    if (response && response.count) {
        state.blockedCount = response.count;
        updateUI();
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateBlockedCount") {
        state.blockedCount = request.count;
        updateUI();
    }
});