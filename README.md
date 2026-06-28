# Task Manager App

A full-stack MERN task manager that lets you create, search, update, complete, and delete tasks — with data persisted in MongoDB Atlas and deployed live on Vercel.

**Live App:** [https://task-manager-frontend-steel-nine.vercel.app](https://task-manager-frontend-steel-nine.vercel.app)

---

## Features

- **Create tasks** — Add new tasks with a single click
- **Mark complete** — Toggle tasks as done/undone with strikethrough styling
- **Edit tasks** — Update task names inline
- **Delete tasks** — Remove tasks you no longer need
- **Search** — Filter tasks in real time
- **Toast notifications** — Success and error feedback on every action
- **Cloud persistence** — All tasks saved to MongoDB Atlas
- **Live deployment** — Frontend and backend hosted on Vercel

---

## Tech Stack

| Layer      | Technology                                      |
| ---------- | ----------------------------------------------- |
| Frontend   | React, Bootstrap, React Toastify, React Icons   |
| Backend    | Node.js, Express 5                              |
| Database   | MongoDB Atlas, Mongoose                         |
| Deployment | Vercel (separate projects for frontend & API)   |
| Version Control | Git, GitHub                                |

---

## Live Links

| Service        | URL                                                                 |
| -------------- | ------------------------------------------------------------------- |
| **Frontend**   | [task-manager-frontend-steel-nine.vercel.app](https://task-manager-frontend-steel-nine.vercel.app) |
| **Backend API**| [task-manager-app-qegw.vercel.app](https://task-manager-app-qegw.vercel.app) |
| **GitHub**     | [github.com/JitinSaxenaa/Task-Manager-App](https://github.com/JitinSaxenaa/Task-Manager-App) |

---

## Architecture

```mermaid
flowchart LR
    User([User Browser]) --> Frontend[React Frontend\nVercel]
    Frontend -->|REST API| Backend[Express API\nVercel Serverless]
    Backend -->|Mongoose| MongoDB[(MongoDB Atlas\ntaskmanager.todos)]
```

---

## Project Structure

```
Task-Manager-App/
├── frontend/                  # React client
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── TaskManager.js     # Main UI component
│   │   ├── api.js             # API service layer
│   │   └── utils.js           # Toast helpers & API URL
│   ├── package.json
│   └── vercel.json
│
├── backend/                   # Express REST API
│   ├── controllers/
│   │   └── taskcontroller.js
│   ├── models/
│   │   ├── db.js              # MongoDB connection (serverless-safe)
│   │   └── taskmodel.js
│   ├── routes/
│   │   └── taskrouter.js
│   ├── index.js               # Express app entry point
│   ├── package.json
│   └── vercel.json
│
└── README.md
```

---

## Getting Started (Local Development)

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/JitinSaxenaa/Task-Manager-App.git
cd Task-Manager-App
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `backend/.env` file:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string_here
```

Start the backend:

```bash
npm start
```

The API runs at `http://localhost:8080`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The app opens at `http://localhost:3000`.

> **Note:** For local development, the frontend uses the production API URL by default. To point it at your local backend, update `REACT_APP_API_URL` in `frontend/src/utils.js` or set it as an environment variable:

```env
REACT_APP_API_URL=http://localhost:8080
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable    | Description                          | Example                                      |
| ----------- | ------------------------------------ | -------------------------------------------- |
| `PORT`      | Server port (local dev)              | `8080`                                       |
| `MONGO_URI` | MongoDB Atlas connection string      | `mongodb+srv://user:pass@cluster.mongodb.net/taskmanager` |

### Frontend (optional)

| Variable            | Description              | Default                                          |
| ------------------- | ------------------------ | ------------------------------------------------ |
| `REACT_APP_API_URL` | Backend API base URL     | `https://task-manager-app-qegw.vercel.app`       |

---

## API Reference

Base URL: `https://task-manager-app-qegw.vercel.app`

| Method   | Endpoint      | Description        | Request Body                          |
| -------- | ------------- | ------------------ | ------------------------------------- |
| `GET`    | `/tasks`      | Get all tasks      | —                                     |
| `POST`   | `/tasks`      | Create a task      | `{ "taskName": "string", "isDone": false }` |
| `PUT`    | `/tasks/:id`  | Update a task      | `{ "taskName": "string", "isDone": true }`  |
| `DELETE` | `/tasks/:id`  | Delete a task      | —                                     |

### Example responses

**GET /tasks**
```json
{
  "message": "All Tasks",
  "success": true,
  "data": [
    {
      "_id": "6a4187e0613493001c88b43c",
      "taskName": "Buy groceries",
      "isDone": false,
      "__v": 0
    }
  ]
}
```

**POST /tasks**
```json
{
  "message": "Task is created",
  "success": true
}
```

---

## Database

Tasks are stored in MongoDB Atlas:

| Property   | Value        |
| ---------- | ------------ |
| Database   | `taskmanager`|
| Collection | `todos`      |

### View your data

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Open your cluster → **Browse Collections**
3. Navigate to **taskmanager** → **todos**

---

## Deployment (Vercel)

This project uses **two separate Vercel projects** — one for the frontend and one for the backend API.

### Backend

| Setting          | Value      |
| ---------------- | ---------- |
| Root Directory   | `backend`  |
| Framework        | Express    |
| Build Command    | *(none)*   |

**Environment variables** (Vercel → Settings → Environment Variables):

```
MONGO_URI = your_mongodb_connection_string
```

### Frontend

| Setting          | Value           |
| ---------------- | --------------- |
| Root Directory   | `frontend`      |
| Framework        | Create React App|
| Build Command    | `npm run build` |
| Output Directory | `build`         |

### MongoDB Atlas — Network Access

Vercel uses dynamic IP addresses. In MongoDB Atlas → **Network Access**, add:

```
0.0.0.0/0   (Allow access from anywhere)
```

Your database remains protected by username and password in the connection string.

---

## Scripts

### Frontend

```bash
npm start    # Start dev server (localhost:3000)
npm run build   # Production build
npm test     # Run tests
```

### Backend

```bash
npm start    # Start dev server with nodemon (localhost:8080)
```

---

## Troubleshooting

| Problem | Solution |
| ------- | -------- |
| API returns 500 / timeout | Check MongoDB Atlas **Network Access** includes `0.0.0.0/0` |
| `Cannot find module` on Vercel | Ensure import paths use **lowercase** folder names (`models`, not `Models`) |
| Tasks not saving locally | Verify `MONGO_URI` in `backend/.env` is correct |
| Frontend can't reach API | Confirm `REACT_APP_API_URL` points to the correct backend URL |
| Build fails on Vercel | Run `npm run build` locally first; check all dependencies are in `package.json` |

---

## Author

**Jitin Saxena**

- GitHub: [@JitinSaxenaa](https://github.com/JitinSaxenaa)
- Repository: [Task-Manager-App](https://github.com/JitinSaxenaa/Task-Manager-App)

---

## License

This project is open source and available under the [ISC License](https://opensource.org/licenses/ISC).
