
# // PERSONAL DASHBOARD

A customizable dashboard that shows weather, daily quotes, habit tracking, and your RetroAchievements missable count – all in one place. Built for daily use.

## 🔗 Live Demo

*Deployed at:* `https://roysworth.github.io/personal-dashboard`

---

## 🛠️ Built With

- HTML5, CSS3, JavaScript (ES6)
- OpenWeatherMap API
- Quotable.io API (free)
- RetroAchievements Web API
- LocalStorage API

---

## 🚀 Features

- **Weather Widget** – fetch current weather by city (uses your OpenWeatherMap key)
- **Daily Quote** – random motivational quote from free API
- **Habit Tracker** – add/check/delete habits; persists in localStorage
- **RA Missable Count** – scans your recent games and counts unearned missable achievements
- **Responsive CSS Grid** – widgets rearrange automatically on any screen
- **Green Motherboard Aesthetic** – terminal-style design with neon accents

---

## 📚 What I Learned

| Skill | How I Used It |
|-------|----------------|
| CSS Grid | Created flexible, responsive widget layout |
| Multiple API Integration | Called 3 different APIs from one page |
| Async/Await with Rate Limiting | Sequentially fetched RA game data without hitting limits |
| LocalStorage | Saved habits and their completion state across sessions |
| Modular Code Structure | Each widget has its own logic, but lives in one file |
| Event Handling | Button clicks, checkbox changes, dynamic DOM updates |
| Git & GitHub Pages | Version control and deployment |

---

## 💡 Why I Built This

I wanted a single page I could open every morning to check the weather, get a quote, track my habits, and see how many missable RetroAchievements I still need to grab. Instead of using 4 different apps, I built my own dashboard that does exactly what I need – and nothing I don't.

---

## 🔧 How to Run Locally

1. Clone the repo:  
   `git clone https://github.com/roysworth/personal-dashboard.git`
2. Open in **VS Code**.
3. Install the **Live Server** extension (by Ritwick Dey).
4. Right-click `index.html` → **Open with Live Server**.
5. Add your own API keys in `script.js` (weather + RetroAchievements).

> ⚠️ Do not double-click `index.html` – the dashboard needs a real HTTP server to fetch external APIs.

---

## 🗺️ Future Improvements

- Dark/light mode toggle saved to localStorage
- Drag-and-drop widget reordering
- Clock widget with date
- Expand RA widget to show full achievement names (not just count)

---

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org) for weather data
- [Quotable](https://github.com/lukePeavey/quotable) for free quotes
- [RetroAchievements](https://retroachievements.org) for the API

---

**Made by roysworth / ChristIBelieve** – because why use 4 apps when you can build 1?
```

---

Copy and paste this into your README.md file inside the personal-dashboard folder. It keeps the same concise, table‑driven style as your previous READMEs and clearly shows what you built and learned.
