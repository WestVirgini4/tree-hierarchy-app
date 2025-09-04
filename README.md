# Tree Hierarchy Application

A full-stack web application for displaying hierarchical tree data.

## Live Demo

- Frontend: https://tree-hierarchy-app-vx5t.vercel.app/
- Backend API: https://tree-hierarchy-app-backend.onrender.com/

## Technology Stack

**Frontend**
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Deployed on Vercel

**Backend**
- Node.js + Express + TypeScript
- Deployed on Render

## Features

- Interactive tree visualization with expand/collapse
- Real-time search functionality
- Lazy loading of child nodes
- Responsive design

## Local Development

**Backend Setup:**
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3001
```

**Frontend Setup:**
```bash
cd frontend
npm install  
npm run dev
# Runs on http://localhost:3000
```

## API Endpoints

- `GET /` - API status
- `GET /api/nodes/root` - Get root nodes
- `GET /api/nodes/:id/children` - Get child nodes
- `GET /api/search?q=query` - Search nodes

## Deployment

- Frontend: Vercel (auto-deploy from GitHub)
- Backend: Render (auto-deploy from GitHub)