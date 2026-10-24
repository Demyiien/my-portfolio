# jee.ply 🚐📍

> **Next-generation commuter route finder, fare calculator, and transit assistant for Cebu City jeepneys.**

[![Live Demo](https://img.shields.io/badge/Demo-jee--ply.vercel.app-ff2b2b?style=for-the-badge&logo=vercel)](https://jee-ply.vercel.app)
[![Platform](https://img.shields.io/badge/Platform-Mobile%20Only%20%F0%9F%93%B1-blue?style=for-the-badge)](#-mobile-optimized-notice)
[![Mapping](https://img.shields.io/badge/Maps-Leaflet%20%2F%20OSM-green?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)
[![License](https://img.shields.io/badge/License-MIT-black?style=for-the-badge)](#)

---

## 📱 Mobile-Optimized Notice

> [!IMPORTANT]
> **jee.ply is exclusively engineered and optimized for mobile devices.**
> 
> The UI layout, touch-drag bottom sheets, floating Manong AI chathead, and GPS pin placements are tailored specifically for handheld smartphone use during daily commutes.
> 
> * **On Mobile:** Open directly in your mobile browser at [https://jee-ply.vercel.app](https://jee-ply.vercel.app).
> * **On Desktop:** Open Developer Tools (`F12` or `Ctrl + Shift + I` / `Cmd + Option + I`), toggle the **Device Toolbar / Mobile Emulation** (`Ctrl + Shift + M`), and select a mobile viewport (such as iPhone 14/15, Pixel 7, or Galaxy S20).

---

## 🌟 Key Features

* **🗺️ Interactive Cebu Transit Map**: Powered by **Leaflet.js** and OpenStreetMap, pre-bounded specifically to Metro Cebu (`10.15, 123.68` to `10.45, 124.05`).
* **📍 Smart Origin, Destination & Detour Routing**: Drop map pins directly onto roads or pick from verified Cebu landmarks. Supports multi-point detour stops along the route.
* **💰 Real-Time LTFRB Fare Calculation**: Computes official regulated fares based on Haversine geodesic distance:
  $$\text{Fare} = \begin{cases} ₱13, & \text{if } d \le 4\text{ km} \\ 13 + \lceil(d - 4) \times 1.80\rceil, & \text{if } d > 4\text{ km} \end{cases}$$
* **🤖 Manong AI Transit Assistant**: An interactive floating chathead ("Manong") ready to answer transit questions, recommend route transfers, and give commuter guidance on the go.
* **📋 Verified Cebu Jeepney Routes**: Curated database grounded in **LTFRB Region 7 franchise records** and CommuteTour guidelines covering key codes (e.g., `04L`, `17B`, `13C`, `06B`) and major terminals (IT Park, Ayala Center, Colon, Carbon, SM City Cebu).

---

## 🛠️ Tech Stack

* **Front End**: Pure Semantic HTML5, CSS3 (Mobile-First responsive sheets, CSS variables), Vanilla JavaScript (ES6+ Modules)
* **Maps & GIS**: [Leaflet.js](https://leafletjs.com/) with OpenStreetMap raster tiles
* **Math & Geometry**: Haversine formula for spherical distance calculations and coordinate interpolation
* **Hosting**: [Vercel](https://vercel.com/)

---

## 📂 Project Architecture

```text
jee.ply/
├── index.html        # Mobile viewport shell, PWA meta tags & modal containers
├── style.css         # Mobile styling, touch-friendly UI components, drawer transitions
├── app.js            # Core application state, Leaflet initialization, event listeners
├── functions.js      # Fare calculator (calcFare) & Haversine distance engine
├── routes.js         # Verified LTFRB Cebu jeepney routes and stop coordinates
├── coordinates.js    # GPS coordinate registry for intersections and landmarks
├── landmarks.js      # Curated directory of major Cebu hubs, terminals, and malls
├── manong.js         # Interactive Manong AI chathead widget & response engine
├── assets/           # App graphics, branding, and transit illustrations
└── icons/            # App launcher & UI icons
```

---

## 🚀 Getting Started

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Demyiien/jee.ply.git
   cd jee.ply
   ```

2. **Serve the project locally:**
   Because `jee.ply` is a static web application, you can use any static server:
   ```bash
   # Using npx serve:
   npx serve .

   # Or using Python 3:
   python -m http.server 3000
   ```

3. **View on Mobile or Device Simulator:**
   * Open `http://localhost:3000` in your browser.
   * Enable Mobile Emulation (`Ctrl + Shift + M` / `Cmd + Shift + M`) in Chrome or Edge DevTools for the intended mobile experience.

---

## 🌐 Live Deployment

The latest version is deployed and live at:
👉 **[https://jee-ply.vercel.app](https://jee-ply.vercel.app)**

---

## 🤝 Contributing

Contributions, additional route submissions, and landmark updates are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AddRoute04C`)
3. Commit your Changes (`git commit -m "feat: add 04C Lahug to Carbon route"`)
4. Push to the Branch (`git push origin feature/AddRoute04C`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
