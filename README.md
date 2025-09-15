# 🦸 Superhero API

A serverless API for managing superheroes and their powers.  
This project is built with modern technologies to ensure scalability, performance, and ease of deployment.

---

## 🚀 Tech Stack

- **Framework:** [Fastify](https://fastify.dev/) – lightweight and fast Node.js framework
- **Database ORM:** [Prisma](https://www.prisma.io/) – type-safe database client
- **Database:** [PostgreSQL](https://www.postgresql.org/) managed via [Supabase](https://supabase.com/)
- **Storage:** [Supabase Storage](https://supabase.com/storage) – for managing file uploads
- **Deployment:** [Vercel](https://vercel.com/) – deployed as serverless functions

---

## 📂 Project Structure

api/
└── index.ts # Vercel serverless function entry point

src/
├── features/
│ ├── superhero/ # Superhero routes, controllers, services
│ └── super-power/ # Superpower routes, controllers, services
├── shared/
│ ├── plugins/ # Fastify plugins
│ ├── services/ # Shared services
│ └── utils/ # Utility functions and helpers
└── server.ts # Local development entry point

---

## ⚡️ Features

- Create, read, update, and delete superheroes
- Manage superpowers and assign them to superheroes
- File upload support (via Supabase storage)
- Auto-generated API documentation (Swagger UI)
- Deployed as **serverless functions** on Vercel

---

## 🔧 Setup & Development

1. **Clone repository**
   ```bash
   git clone https://github.com/PeEpEGa/superhero-app-api.git
   cd superhero-app-api
   Install dependencies
   ```

npm install
Configure environment variables
Create a .env file in the root:

.env
DATABASE_URL="postgresql://username:password@db.supabase.co:5432/postgres"
DIRECT_URL="postgresql://username:password@db.supabase.co:5432/postgres?pgbouncer=false"

SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_KEY="your-supabase-service-key"

Run database migrations
npx prisma migrate dev

Start development server
npm run dev

🌍 Deployment
The project is deployed on Vercel.

Fastify runs inside Vercel serverless functions (entry point: /api/index.ts).

Database and file storage are fully managed by Supabase.

📖 API Documentation

Once the server is running, Swagger UI is available at:
http://localhost:3000/documentation

In production (Vercel deployment):
https://your-vercel-app.vercel.app/documentation
