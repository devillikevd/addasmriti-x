<div align="center">

# 🏛️ AddaSmriti X
**The World's Most Advanced Cultural Intelligence Operating System**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![AI](https://img.shields.io/badge/AI-GPT--4o%20%7C%20Claude%203.5-purple?style=for-the-badge)](https://openai.com/)

*Preserve your heritage. Clone your voice. Interact with your past. Forever.*

</div>

---

## 🚀 Live Deployment Status

| Service | Status | URL |
|---|---|---|
| Frontend | ✅ Live | https://frontend-kappa-six-68.vercel.app |
| Backend | ⚠️ Pending deployment | Configured via `render.yaml` |
| Database | ⚠️ Provisioning ready | `render.yaml` PostgreSQL blueprint |

> Tip: Deploy the backend to Render using `render deploys create <service-id> --confirm` after selecting the active workspace.

---

## 🌟 Executive Summary
AddaSmriti X is a culturally intelligent platform built to rescue and preserve heritage through generative AI, 3D memory graphs, and immersive storytelling.

It is designed to support:
* **Enterprise-grade heritage preservation** for museums, education, and family archives
* **AI-powered memory cloning** with voice, emotion, and contextual recall
* **Spatial storytelling** with interactive 3D memory topologies
* **Secure multimodal archives** with privacy-first controls and cloud-native infrastructure

---

## 🧠 Platform Capabilities

### Digital Twin & Memory Intelligence
* Voice cloning, story synthesis, and memory emulation.
* Conversational heritage agents with context-aware retrieval.
* Multilingual memory understanding for Indian and global languages.

### Memory DNA Graph
* 3D graph visualization of memories, people, and cultural nodes.
* Relationship inference across time, location, and family history.
* Semantic search powered by Pinecone and knowledge graph indexing.

### Generative Heritage Media
* AI documentary generation from audio logs.
* Automatic photo restoration and colorization.
* Procedural background ambience matched to history and mood.

### Community & Immersion
* Video/audio Adda rooms for modern cultural exchange.
* Gamified heritage challenges and community collections.
* Live transcription, translation, and archive publishing.

---

## 💻 Architecture

### Frontend
* **Next.js 15** with App Router
* **React 19 + TypeScript**
* **Tailwind CSS** for responsive, glassmorphic UI
* **Three.js / @react-three/fiber** for 3D spatial experiences
* **Framer Motion** for polished transitions

### Backend
* **FastAPI** with Uvicorn
* **PostgreSQL** via Render blueprint
* **AI integrations:** OpenAI GPT-4o and Claude 3.5
* **Vector search:** Pinecone
* **Audio TTS:** ElevenLabs

### Infrastructure
* **Frontend deployment:** Vercel
* **Backend + database:** Render
* **Containerization:** Docker + Docker Compose
* **Configuration as code:** `render.yaml` and `docker-compose.yml`

---

## 🔧 Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Access: `http://localhost:3000`

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Access: `http://localhost:8000`

### Full stack with Docker
```bash
docker-compose up --build
```

---

## 📦 Deployment Notes
* Use `vercel` or GitHub integration to deploy the frontend automatically.
* Use `render.yaml` to provision the backend service and Postgres instance on Render.
* If backend deployment is pending, authenticate the Render CLI and run:
  ```bash
  render workspace set <workspace-id>
  render blueprints validate render.yaml
  render deploys create <service-id> --confirm
  ```

---

## 🧪 Quality + Ops
* Written for production readiness with TypeScript, Pydantic, and typed API contracts.
* Smart caching and edge-ready design for global access.
* Ready for monitoring, logging, and observability once Render deployment is active.

---

<div align="center">
  <i>"AddaSmriti X turns cultural memories into living digital heritage."</i><br>
  Built for preservation, powered by AI.
</div>
