# HelioSense Premium Frontend MVP

A production-style React + TypeScript implementation of the HelioSense Live Training Safety Intelligence Platform.

## Included

- Premium responsive sports-tech UI
- Coach dashboard
- Live training session
- Compact athlete cards with risk prioritisation
- Green, yellow, orange and red risk states
- Immediate critical alert modal with confirmable coach actions
- Working athlete actions: Rest, Hydrate, Reduce, Resume, End Session and Medical Attention
- Full athlete profile drawer
- AI Insights with explainable recommendation modal
- Academy Owner monitoring dashboard
- Parent-friendly dashboard
- Demo role switcher
- Mobile responsive navigation
- Mock state designed to be replaced by REST APIs and Socket.IO

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Recommended next backend phase

- Node.js/NestJS or Express API
- PostgreSQL + Prisma
- JWT authentication and role guards
- Socket.IO real-time session events
- Rule-based risk engine service
- Weather API integration
- PDF/Excel report generation
# final-hello
