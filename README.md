# TaskFlow — Full-Stack Task Manager

A modern, full-stack task management application built with **Next.js**, **Node.js + Express**, and **MongoDB**.

## 🏗️ Project Structure

```
/project-root
├── /frontend          # Next.js (React + TypeScript + Tailwind CSS)
│   ├── /src
│   │   ├── /app       # App Router pages
│   │   ├── /context   # Auth context provider
│   │   └── /lib       # API client utilities
│   └── ...
├── /backend           # Node.js + Express REST API
│   ├── /config        # Database connection
│   ├── /middleware     # JWT authentication
│   ├── /models        # Mongoose schemas (User, Task)
│   ├── /routes        # API routes (auth, tasks)
│   └── server.js      # Entry point
└── README.md
```

## ✨ Features

- **User Authentication** — Register, login, JWT-based sessions
- **Task CRUD** — Create, read, update, delete tasks
- **Task Properties** — Title, description, status, priority, due date
- **Dashboard** — Stats cards, completion rate chart, recent tasks
- **Search & Filter** — Filter by status/priority, search by title
- **Status Toggle** — Click to cycle through todo → in-progress → completed
- **Responsive Design** — Mobile-first with sidebar navigation
- **Beautiful UI** — Glassmorphism, gradients, micro-animations, dark theme

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1. Backend Setup

```bash
cd backend
npm install
# Edit .env with your MongoDB URI
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Open in browser

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/tasks` | Get all tasks (with filters) |
| GET | `/api/tasks/stats` | Get task statistics |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
