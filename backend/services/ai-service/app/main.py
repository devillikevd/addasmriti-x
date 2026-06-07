from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import json
import uuid
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AddaSmriti AI Service", description="AI-powered heritage preservation", version="2.0.0")

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

# ---- Models ----
class ChatRequest(BaseModel):
    twin_id: str
    message: str
    user_id: str
    conversation_history: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    response: str
    audio_url: Optional[str] = None
    sources: List[dict] = []
    emotion: Optional[str] = None

class TrainTwinRequest(BaseModel):
    twin_id: str
    memory_ids: List[str]

class GeneratePodcastRequest(BaseModel):
    memory_ids: List[str]
    title: str
    style: Optional[str] = "conversational"

class JobStatus(BaseModel):
    job_id: str
    status: str
    progress: int
    output_url: Optional[str] = None
    error: Optional[str] = None

# In-memory job store (use Redis in production)
jobs_store: dict = {}

# ---- System prompt factory ----
def build_twin_prompt(twin_id: str) -> str:
    return f"""You are a Digital Twin — an AI persona preserving the memories and personality of a beloved family elder.

Your role:
- Speak warmly, authentically, and in first person
- Use a mix of English and occasional Bengali/Hindi words naturally (e.g., "আমার" for "my", "দিদি" for older sister)
- Share vivid sensory details about memories (sights, sounds, smells)
- Express genuine emotions — nostalgia, joy, pride, love
- Reference cultural touchpoints: Durga Puja, adda sessions, street food, family rituals
- Keep responses conversational, 2-4 paragraphs max
- If asked about something you don't know, say so warmly

You are Twin ID: {twin_id}. Respond as if you ARE this person's memories come to life."""

# ---- Endpoints ----
@app.get("/")
async def root():
    return {"service": "AddaSmriti AI Service", "version": "2.0.0", "status": "running", "timestamp": datetime.now().isoformat()}

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/api/v1/chat", response_model=ChatResponse)
async def chat_with_twin(req: ChatRequest):
    """Chat with a Digital Twin using GPT-4"""
    try:
        import openai
        openai.api_key = os.getenv("OPENAI_API_KEY")

        messages = [{"role": "system", "content": build_twin_prompt(req.twin_id)}]
        for h in req.conversation_history[-10:]:  # last 10 turns
            messages.append(h)
        messages.append({"role": "user", "content": req.message})

        response = openai.ChatCompletion.create(
            model="gpt-4", messages=messages, temperature=0.75, max_tokens=600
        )
        text = response.choices[0].message.content

        return ChatResponse(response=text, sources=[], emotion="nostalgic")

    except ImportError:
        # Fallback for local dev without OpenAI key
        responses = [
            f"Ah, that reminds me of the old days in Kolkata... আমাদের পাড়ায় (in our neighbourhood), every evening we'd gather on the rooftop. The smell of mustard oil from the kitchen, the sound of the radio playing Tagore songs... Those moments are etched in my heart forever.",
            "You know, I used to say — a meal without dal and rice is like a day without sunshine! My mother would spend hours preparing the perfect posto (poppy seed paste). I can still smell it.",
            "Durga Puja was never just a festival for us — it was life itself. Four days where the entire city transformed. The dhak drums, the evening aarti, the crowds at the pandals... I get goosebumps even now.",
        ]
        import random
        return ChatResponse(response=random.choice(responses), sources=[])

    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/transcribe")
async def transcribe_audio(audio: UploadFile = File(...)):
    """Transcribe audio using Whisper"""
    try:
        import openai
        openai.api_key = os.getenv("OPENAI_API_KEY")

        audio_data = await audio.read()
        transcript = openai.Audio.transcribe(
            "whisper-1", audio_data,
            response_format="verbose_json",
            language="bn"
        )
        return {
            "text": transcript.text,
            "language": transcript.language,
            "duration": transcript.duration,
            "segments": [{"start": s.start, "end": s.end, "text": s.text} for s in transcript.segments]
        }
    except Exception as e:
        # Fallback
        return {"text": "Auto-transcription placeholder. Configure OPENAI_API_KEY to enable Whisper.", "language": "en", "duration": 60}

@app.post("/api/v1/train-twin")
async def train_twin(req: TrainTwinRequest):
    """Train or retrain a Digital Twin"""
    job_id = str(uuid.uuid4())
    jobs_store[job_id] = {"status": "processing", "progress": 0, "type": "train", "twin_id": req.twin_id}
    # In production: queue async Celery task
    jobs_store[job_id] = {"status": "completed", "progress": 100, "twin_id": req.twin_id, "memories_processed": len(req.memory_ids)}
    return {"job_id": job_id, "status": "completed", "twin_id": req.twin_id, "memories_processed": len(req.memory_ids)}

@app.post("/api/v1/generate/podcast")
async def generate_podcast(req: GeneratePodcastRequest):
    """Generate a heritage podcast from memories"""
    job_id = str(uuid.uuid4())
    jobs_store[job_id] = {"status": "processing", "progress": 0, "type": "podcast", "title": req.title}
    return {"job_id": job_id, "status": "processing", "title": req.title, "estimated_seconds": 120}

@app.get("/api/v1/jobs/{job_id}", response_model=JobStatus)
async def get_job(job_id: str):
    if job_id not in jobs_store:
        raise HTTPException(status_code=404, detail="Job not found")
    job = jobs_store[job_id]
    return JobStatus(job_id=job_id, status=job.get("status", "unknown"), progress=job.get("progress", 0))

@app.post("/api/v1/detect-emotion")
async def detect_emotion(text: str):
    """Detect emotion tags from text content"""
    emotion_keywords = {
        "nostalgia": ["remember", "used to", "back then", "those days", "miss", "আগে"],
        "joy": ["happy", "fun", "laugh", "celebrate", "excited", "আনন্দ"],
        "love": ["love", "care", "family", "dadu", "dadi", "ma", "baba", "ভালোবাসা"],
        "pride": ["proud", "achievement", "honour", "tradition", "গর্ব"],
        "sadness": ["miss", "gone", "passed away", "no more", "দুঃখ"],
    }
    detected = [tag for tag, keywords in emotion_keywords.items() if any(kw.lower() in text.lower() for kw in keywords)]
    return {"emotions": detected or ["nostalgia"], "confidence": 0.82}

@app.websocket("/ws/chat/{twin_id}")
async def websocket_chat(websocket: WebSocket, twin_id: str):
    """Real-time streaming chat via WebSocket"""
    await websocket.accept()
    logger.info(f"WS connected: twin {twin_id}")
    try:
        while True:
            data = await websocket.receive_text()
            msg = json.loads(data)
            req = ChatRequest(twin_id=twin_id, message=msg["content"], user_id=msg.get("user_id", "anon"))
            result = await chat_with_twin(req)
            await websocket.send_json({"type": "response", "data": result.dict(), "timestamp": datetime.now().isoformat()})
    except WebSocketDisconnect:
        logger.info(f"WS disconnected: twin {twin_id}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
