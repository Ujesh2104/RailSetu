# 🚆 RailSetu

A simple railway companion web app to check **live train status** and estimate **journey fares** — built from scratch while learning web development.

> ⚠️ This is a learning/practice project, not a production app. There are plenty of polished railway apps out there (IRCTC, ixigo, etc.). I built this to get hands-on experience with HTML, CSS, JavaScript, and real API integration — writing every line myself and understanding each concept along the way.

---

## ✨ Features

- **Live Train Status** — Enter a train number and departure date to see where the train currently is, its route, current station, and next stop — powered by real-time IRCTC data.
- **Fare Estimator** — Calculates an approximate fare between any two stations of the tracked train, based on distance and travel class (Sleeper / 3AC / 2AC).
- **Clean dark UI** — A glassmorphism-style interface with a railway-themed background.
- **Responsive** — Works on both desktop and mobile.

---

## 🛠️ Built With

- **HTML5** — Semantic structure
- **CSS3** — Flexbox, Grid, glassmorphism, responsive design
- **JavaScript (Vanilla)** — DOM manipulation, event handling, `fetch` API, JSON parsing
- **RapidAPI (IRCTC)** — Live train running status data

---

## 📚 What I Learned

This project was my hands-on introduction to several core web development concepts:

- Building a complete frontend from scratch with semantic HTML and modern CSS
- Writing JavaScript from the ground up — selectors, events, reading input values
- Integrating a **real API** for the first time — `fetch`, request headers, API keys, and parsing JSON responses
- Connecting two features so they share data (the fare estimator uses the tracked train's station data)
- The full **Git & GitHub workflow** via terminal — including resolving my first merge conflict

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Ujesh2104/RailSetu.git
   ```
2. Open `index.html` in your browser.

> **Note:** The app uses a RapidAPI key for demo purposes. For your own use, sign up at [RapidAPI](https://rapidapi.com/), subscribe to the IRCTC train status API, and replace the key in `script.js`.

---

## 📸 How It Works

1. Enter a train number (e.g. `12434`) and select a departure date.
2. Click **Check live status** to see the train's current location and route.
3. In the fare section, pick the **From** and **To** stations and a travel class.
4. Click **Calculate fare** for an approximate fare estimate.

---

## 🔮 Future Improvements

- Hide the API key using a backend (currently exposed, as it's a frontend-only learning project)
- Add a visual journey progress bar
- Show delay/early information for each station
- Save recently searched trains

---

## 👤 Author

**Ujesh Mishra**
B.Tech — Electronics & Computer Science Engineering
[GitHub](https://github.com/Ujesh2104)

---

*Built with curiosity, one bug at a time.* 🚂
