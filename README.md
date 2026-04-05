# TaskFlow — Full-Stack Task Management

A professional, modern, and fully automated full-stack task management application. Built natively with the bleeding-edge **Next.js App Router**, powered by a robust **Node.js/Express** backend, and deployed automatically via **GitHub Actions** and hosted on **Render**.

🚀 **Live Demo:** [taskfllow-1-wg5w.onrender.com](https://taskfllow-1-wg5w.onrender.com/)

## 🏗️ Architecture & Tech Stack

### 🎨 Frontend (Next.js Application)
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **State & Data Fetching:** React 19 Context, Axios, `react-hot-toast`
- **UI & Styling:** Tailwind CSS v4, Lucide React Icons
- **Design System:** Custom **Glassmorphism** with an elegant Earth-tone (Light Brown/Amber & White) visual aesthetic, smooth transitions, micro-animations, and animated SVGs.

### ⚙️ Backend (Node.js API)
- **Environment:** Node.js
- **Framework:** Express.js
- **Security:** JWT-based robust authentication (`jsonwebtoken`, `bcryptjs`), and dynamic CORS control natively mapped to the frontend URL.

### 🚀 Infrastructure & DevOps (CI/CD)
TaskFlow features a completely automated modern DevOps pipeline incorporating CI/CD and direct cloud hosting:

1. **GitHub Actions (CI)**: On every push to the `main` branch, a GitHub Actions cloud runner automatically checks out the code structure.
2. **Dockerization**: The frontend and backend environments are perfectly containerized side-by-side using secure, multi-stage Docker builds.
3. **Docker Hub Registry**: The CI pipeline permanently securely pushes production-ready images online. You can view/pull the public images here:
   - **Frontend Image**: [hub.docker.com/r/shuaib777sas/frontend](https://hub.docker.com/r/shuaib777sas/frontend)
   - **Backend Image**: [hub.docker.com/r/shuaib777sas/backend](https://hub.docker.com/r/shuaib777sas/backend)
4. **Render Deployment (CD)**: The application acts as two live Next.js and Node.js Web Services deployed natively on **Render**, communicating safely across an encrypted HTTPS network via tightly coupled Environment Variables (`FRONTEND_URL` & `NEXT_PUBLIC_API_URL`).

---

## ✨ Features

- **End-to-End User Authentication** — Secure Registration, Login, and JWT session handling.
- **Task CRUD Operations** — Create, Read, Update, and Delete your tasks seamlessly.
- **Smart Task Properties** — Track Title, extensive Descriptions, varied Statuses, Priorities, and precise Due Dates.
- **Dynamic Dashboard** — Beautiful Glassmorphic stat cards, an animated radial completion rate SVG chart, and a quick-view of recent tasks.
- **Search & Filter Mechanism** — Comprehensive filtering globally by status/priority, combined with a real-time title search box.
- **One-Click Toggles** — Cycle instantly through *todo → in-progress → completed* without opening a task block.
- **Fully Responsive** — Works perfectly on Mobile with a customized sliding hamburger navigation menu.
- **Aesthetic Excellence** — Warm light-mode UI, frosted glass utility overlays, subtle hover shadows, and beautiful CSS gradients.

---

## 🚀 Getting Started Locally

### 1. Backend Setup
```bash
cd backend
npm install
# Place your development secrets inside .env
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Ensure .env.local contains: NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm run dev
```

### 3. Open in Browser
- Frontend is served dynamically at: `http://localhost:3000`
- Backend API listens actively on: `http://localhost:5000/api`

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login user via JWT |
| `GET`  | `/api/auth/me` | Fetch authenticated current user profile |
| `GET`  | `/api/tasks` | Get all tasks (Supports status/priority filters) |
| `GET`  | `/api/tasks/stats` | Aggregate high-level task statistics |
| `POST` | `/api/tasks` | Create a new task |
| `PUT`  | `/api/tasks/:id` | Update an existing task |
| `DELETE`| `/api/tasks/:id` | Drop a specific task |
