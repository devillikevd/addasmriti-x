# AddaSmriti X — API Reference

## AI Service (Port 8002)

| Method | Path | Description |
|--------|------|-------------|
| GET  | /health | Health check |
| POST | /api/v1/chat | Chat with Digital Twin |
| POST | /api/v1/transcribe | Whisper audio transcription |
| POST | /api/v1/train-twin | Train/retrain a Digital Twin |
| POST | /api/v1/generate/podcast | Generate heritage podcast |
| GET  | /api/v1/jobs/{id} | Get job status |
| POST | /api/v1/detect-emotion | Detect emotions in text |
| WS   | /ws/chat/{twin_id} | Real-time streaming chat |

### Chat Example

```bash
curl -X POST http://localhost:8002/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"twin_id":"twin-1","message":"Tell me about Durga Puja","user_id":"u1"}'
```

## Memory Service (Port 8001)

| Method | Path | Description |
|--------|------|-------------|
| GET  | /api/v1/memories/ | List memories (paginated) |
| POST | /api/v1/memories/ | Create memory |
| GET  | /api/v1/memories/{id}/ | Get memory detail |
| PATCH | /api/v1/memories/{id}/ | Update memory |
| DELETE | /api/v1/memories/{id}/ | Delete memory |
| POST | /api/v1/memories/{id}/like/ | Like a memory |
| POST | /api/v1/memories/{id}/share/ | Share a memory |

### Query Parameters

- `?memory_type=festival`
- `?language=bn`
- `?is_public=true`
- `?search=durga+puja`
- `?ordering=-cultural_significance`
- `?page=2`
