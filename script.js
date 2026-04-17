// ==========================================
// CONFIGURATION
// ==========================================
const WEATHER_API_KEY = '1cccf101107bc34d5aad46c86d2aca9a'; // Your working key
const RA_USERNAME = 'ChristIBelieve';
const RA_API_KEY = '9PxEif7cD3fe8NTgXJZbp6A1pE0wrgur';

// ==========================================
// 1. WEATHER WIDGET (reuse your working code)
// ==========================================
async function getWeather(city) {
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = 'Loading...';
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
        if (!res.ok) throw new Error('City not found');
        const data = await res.json();
        resultDiv.innerHTML = `${data.name}: ${Math.round(data.main.temp)}°C, ${data.weather[0].description}`;
    } catch (err) {
        resultDiv.innerHTML = `❌ ${err.message}`;
    }
}
document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    if (city) getWeather(city);
});

// ==========================================
// 2. QUOTE WIDGET (free API)
// ==========================================
async function getQuote() {
    const quoteDiv = document.getElementById('quoteText');
    quoteDiv.innerHTML = 'Fetching...';
    try {
        const res = await fetch('https://api.quotable.io/random');
        const data = await res.json();
        quoteDiv.innerHTML = `“${data.content}”<br>— ${data.author}`;
    } catch (err) {
        quoteDiv.innerHTML = '❌ Failed to load quote';
    }
}
document.getElementById('newQuoteBtn').addEventListener('click', getQuote);
getQuote(); // load one on page start

// ==========================================
// 3. HABIT TRACKER (localStorage)
// ==========================================
let habits = JSON.parse(localStorage.getItem('habits')) || [];

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

function renderHabits() {
    const container = document.getElementById('habitList');
    container.innerHTML = '';
    habits.forEach((habit, index) => {
        const div = document.createElement('div');
        div.className = 'habit-item';
        div.innerHTML = `
            <input type="checkbox" ${habit.done ? 'checked' : ''} data-index="${index}">
            <label>${escapeHtml(habit.text)}</label>
            <button data-index="${index}">DEL</button>
        `;
        container.appendChild(div);
    });
    // Attach events
    document.querySelectorAll('#habitList input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const idx = parseInt(e.target.dataset.index);
            habits[idx].done = e.target.checked;
            saveHabits();
        });
    });
    document.querySelectorAll('#habitList button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.target.dataset.index);
            habits.splice(idx, 1);
            saveHabits();
            renderHabits();
        });
    });
}

document.getElementById('addHabitBtn').addEventListener('click', () => {
    const input = document.getElementById('newHabit');
    const text = input.value.trim();
    if (text) {
        habits.push({ text: text, done: false });
        saveHabits();
        renderHabits();
        input.value = '';
    }
});
renderHabits();

// ==========================================
// 4. RA MISSABLE COUNT (your scanner logic, simplified)
// ==========================================
async function scanMissableCount() {
    const resultDiv = document.getElementById('raResult');
    resultDiv.innerHTML = 'Scanning...';
    try {
        // Fetch recent games
        const gamesRes = await fetch(`https://retroachievements.org/API/API_GetUserRecentlyPlayedGames.php?u=${RA_USERNAME}&y=${RA_API_KEY}&c=10`);
        const games = await gamesRes.json();
        if (!games || games.length === 0) throw new Error('No recent games');

        let totalMissable = 0;
        for (const game of games) {
            const gameRes = await fetch(`https://retroachievements.org/API/API_GetGameInfoAndUserProgress.php?g=${game.GameID}&u=${RA_USERNAME}&y=${RA_API_KEY}`);
            const gameData = await gameRes.json();
            const achievements = gameData.Achievements || {};
            for (const [id, ach] of Object.entries(achievements)) {
                // Check if earned
                const earned = ach.DateEarned || ach.dateEarned || ach.Achieved === true || ach.Achieved === 1;
                if (!earned && (ach.Type === 'missable' || (ach.Title && ach.Title.toLowerCase().includes('[m]')))) {
                    totalMissable++;
                }
            }
            await new Promise(r => setTimeout(r, 200)); // rate limit
        }
        resultDiv.innerHTML = `⚠️ ${totalMissable} missable achievements across your recent games.`;
    } catch (err) {
        resultDiv.innerHTML = `❌ ${err.message}`;
    }
}
document.getElementById('scanRaBtn').addEventListener('click', scanMissableCount);

// Helper
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}