# TaskFlow — Full-Stack Task Management

A professional, modern, and fully automated full-stack task management application. Built natively with the bleeding-edge **Next.js App Router**, powered by a robust **Node.js/Express** backend, and deployed automatically via **GitHub Actions** to AWS EC2 using **Docker**.

## 🏗️ Architecture & Tech Stack

### 🎨 Frontend (Next.js Application)
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **State & Data Fetching:** React 19 Context, Axios, `react-hot-toast`
- **UI & Styling:** Tailwind CSS v4, Lucide React Icons
- **Design System:** Custom **Glassmorphism** with an elegant Earth-tone (Light Brown/Amber & White) visual aesthetic, smooth transitions, micro-animations, and animated SVGs.

### ⚙️ Backend (Node.js API)
- **Environment:** Node.js
- **Framework:** Express.js 4.21+
- **Database:** MongoDB via Mongoose
- **Security:** JWT-based robust authentication (`jsonwebtoken`, `bcryptjs`), and explicit CORS control.

### 🚀 Infrastructure & DevOps (CI/CD)
TaskFlow features a completely automated modern DevOps pipeline:
1. **GitHub Actions**: On every push to `main`, temporary cloud runners securely checkout the code.
2. **Dockerization**: The frontend and backend are containerized (`Dockerfile`), injecting live production IPs.
3. **Registry**: Built containers are published directly to **Docker Hub**.
4. **Live EC2 Deployment**: The pipeline remotes into the AWS EC2, pulls the fresh Docker images, safely prunes the old dependencies, and restarts the environment instantly using `docker-compose.yml`.

---

## ✨ Features

- **End-to-End User Authentication** — Secure Registration, Login, and JWT session handling.
- **Task CRUD Operations** — Create, Read, Update, and Delete your tasks seamlessly.
- **Smart Task Properties** — Track Title, extensive Descriptions, varied Statuses, Priorities, and precise Due Dates.
- **Dynamic Dashboard** — Beautiful Glassmoprhic stat cards, an animated radial completion rate SVG chart, and a quick-view of recent tasks.
- **Search & Filter Mechanism** — Comprehensive filtering globally by status/priority, combined with a real-time title search search query.
- **One-Click Toggles** — Cycle instantly through *todo → in-progress → completed* without opening a task block.
- **Fully Responsive** — Works perfectly on Mobile with customized sliding hamburger navigation.
- **Aesthetic Excellence** — Warm light-mode UI, frosted glass utility overlays, subtle hover shadows, and beautiful CSS gradients.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- MongoDB (Running locally or an Atlas connection URI)

### 1. Backend Setup
```bash
cd backend
npm install
# Ensure you have a .env file with your mongo connection (e.g. MONGO_URI, JWT_SECRET)
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
- Frontend: `http://localhost:3000`
- Backend API runs on: `http://localhost:5000/api`

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
| `DELETE`| `/api/tasks/:id` | Drop a task |
