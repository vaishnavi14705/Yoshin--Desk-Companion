import os
from fastapi import FastAPI, HTTPException
import requests
import httpx  # Replace requests with httpx

app = FastAPI()

GROQ_API_KEY = "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"
GROQ_URL = "https://api.groq.com/v1/chat/completions"

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific frontend URLs in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/chat")
async def chat_with_llama(user_input: dict):
    query = user_input.get("message", "")

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "llama3-7b-8k",
        "messages": [{"role": "user", "content": query}]
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(GROQ_URL, headers=headers, json=data)
            response.raise_for_status()  # Raise an error for bad responses
            
            output = response.json()
            answer = output["choices"][0]["message"]["content"]
            return {"response": answer}
        
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))





