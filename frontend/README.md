**2. Setup Backend:**

```bash
cd backend
npm init -y
npm install express cors
npm install -D @types/node @types/express @types/cors ts-node typescript
# Create server.ts, routes/, data/ folders as shown in project structure
```

**3. Setup Frontend:**

```bash
cd ../frontend
npm create vite@latest . -- --template react-ts
npm install
npm install tailwindcss @tailwindcss/vite
# Configure vite.config.ts with tailwindcss plugin
```

**Alternative: Use existing project:**

```bash
cd challenge2-tree-hierarchy/backend && npm install
cd ../frontend && npm install
```

### Development

**1. Start Backend (Terminal 1):**

```bash
cd backend
npm run dev
# Server runs on http://localhost:3001
```

**2. Start Frontend (Terminal 2):**

```bash
cd frontend
npm run dev
# Client runs on http://localhost:3000
```

**3. Generate Tree Data:**

```bash
# Generate sample tree (155 nodes, 3 levels deep)
curl -X POST "http://localhost:3001/dev/seed?breadth=5&depth=3"
```

### Usage

1. **View Tree**: Navigate to http://localhost:3000
2. **Expand Nodes**: Click folder icons (📁📂) to expand/collapse
3. **Search**: Type 3+ characters to search nodes in real-time
4. **Lazy Loading**: Children are fetched only when first expanded

## 🛠️ Technology Stack

### Backend

- **Node.js** + **Express.js** - Web server
- **TypeScript** - Type safety
- **CORS** - Cross-origin requests

### Frontend

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server (fast HMR)
- **TypeScript 5.8** - Type safety
- **Tailwind CSS v4** - Utility-first styling with @tailwindcss/vite plugim
