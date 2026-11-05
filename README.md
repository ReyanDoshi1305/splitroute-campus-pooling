# 🚗 SplitRoute – Smart Campus Commute & Fare Pooling.

> **A problem-solving React web application designed for college students to coordinate daily cab/auto rides, share seats, and split commute fares dynamically.**

[![Built with React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite_6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/)
[![HTML5 & CSS3](https://img.shields.io/badge/Design-HTML5_%26_Custom_CSS3-E34F26?style=for-the-badge&logo=html5)](https://developer.mozilla.org/)
[![Vercel Ready](https://img.shields.io/badge/Deployment-Vercel_Ready-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

---

## 📌 The Real-World Problem It Solves

Every morning at college transit hubs (Metro Stations, Bus Terminals, Hostels), dozens of students hail individual cabs or auto-rickshaws heading to the same campus gate.
* Taking a cab solo costs **₹250 – ₹350 ($12–$15)**.
* When 3 or 4 students share that same cab, the cost drops to **₹60 – ₹85 ($3–$4) per person**.
* **Why it doesn't happen naturally:** Students don't know who is going where, timing is awkward to coordinate, and safety is an understandable concern.

**SplitRoute** solves this by providing a unified campus commute board where students can discover, offer, or join rides with verified campus peers in real-time.

---

## ✨ Key Features

1. **⚡ Dynamic Fare-Split Engine:**
   * Automatically calculates fair per-student costs in real-time as seats are booked:
     $$\text{Fare per Student} = \left\lceil \frac{\text{Total Cab Fare}}{\text{Total Occupants}} \right\rceil$$
2. **🛡️ Campus Verified & Women-Only Safety Filter:**
   * Displays student department and verification badges.
   * Includes an instant toggle for **Women-Only Pools**.
3. **💾 LocalStorage Client Persistence:**
   * Hosted rides and booked seats persist in your browser's `localStorage` across page reloads.
4. **📍 Route & Keyword Search:**
   * Filter pools by pickup/destination (Metro Gate 2, Library, Engineering block, Hostel) or vehicle type (Cab/Sedan, Auto-Rickshaw, Personal Car).
5. **🧮 Interactive Fare Calculator:**
   * Standalone estimation tool showing exact savings for 2, 3, and 4 student splits.
6. **📋 "My Rides" Dashboard:**
   * Dedicated tab to manage active bookings, track personal savings, and cancel/leave rides.

---

## 🛠️ Technology Stack (Syllabus Covered)

* **HTML5:** Semantic document structure, accessible form controls, and modern modal dialogs.
* **CSS3:** Custom responsive layout, CSS variables (design tokens), flexbox, grid, glassmorphism header, and micro-animations.
* **JavaScript (ES6+):** Array operations (`map`, `filter`, `reduce`), `localStorage` serialization, destructuring, arrow functions.
* **React Framework:**
  * Component-driven architecture (`Navbar`, `RideCard`, `FilterBar`, `CreateRideModal`, `JoinRideModal`, `FareCalculatorModal`).
  * React Hooks: `useState`, `useEffect`, `useMemo`.
* **Vite:** High-performance local development server and optimized production bundler.

---

## 🚀 Running on Localhost

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your computer.

### Step 1: Open Terminal in the Project Directory
```bash
cd "c:\Users\ADMIN\Desktop\Webtech project antigravity"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run the Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Visit the URL shown in your terminal (usually `http://localhost:5173/`).

---

## 🌐 Deploying to Vercel (Free 1-Click Hosting)

1. Push this project to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial commit of SplitRoute campus pooling app"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
3. Click **"Add New" $\rightarrow$ "Project"**.
4. Select your `SplitRoute` repository and click **"Deploy"**.
5. Vercel will automatically build the Vite React application and provide you with a live `https://your-project.vercel.app` URL to submit!

---

## 🎓 Viva / Presentation Cheat Sheet (For College Evaluation)

* **Q: How does the application maintain state when a user books a ride?**  
  * *Answer:* React's `useState` manages the live array of rides in memory. A React `useEffect` hook monitors changes and automatically serializes the data into browser `localStorage`, ensuring data persists even if the page refreshes.
* **Q: How does the dynamic fare calculation work?**  
  * *Answer:* Rather than hardcoding static prices, the app divides the total vehicle fare by the length of the `passengers` array plus the host, using `Math.ceil()` to avoid fractional currency issues.
* **Q: How does the application handle responsiveness?**  
  * *Answer:* We use CSS Grid with `repeat(auto-fill, minmax(360px, 1fr))` and media queries to adapt the layout seamlessly from mobile screens to desktop monitors.

---

© 2026 SplitRoute – Web Technologies Project.
---

 

 👥 Team Members & Contributors
* Reyan Doshi - Roll No: `24BIT177` - GitHub: [@ReyanDoshi1305](https://github.com/ReyanDoshi1305)
* Anoushka Aithal - Roll No: `24BIT147` - GitHub: [@anoushkaaithal](https://github.com/anoushkaaithal)
* Yesha Makhija - Roll No: `24BIT161` - GitHub: [@yeshamakhija](https://github.com/YeshaMakhija)
