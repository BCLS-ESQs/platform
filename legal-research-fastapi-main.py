"""
FastAPI Legal Research Backend for ESQs Platform Integration
Enhances existing Synthia AI and LAW Matrix capabilities with external legal database access
"""

from fastapi import FastAPI, HTTPException, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
import httpx
import asyncio
import hashlib
import json
import os
from datetime import datetime

app = FastAPI(
    title="ESQs Legal Research API",
    description="FastAPI backend to enhance ESQs platform legal research capabilities",
    version="1.0.0"
)

# CORS middleware for ESQs platform integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:3001", 
        "http://localhost:3002",
        "https://esqs-backend.onrender.com",
        "https://esqs-ai-bridge.onrender.com", 
        "https://esqs-synthia.onrender.com",
        "*"  # Allow all origins for production (configure more strictly in production)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class ResearchQuery(BaseModel):
    query: str
    practice_area: Optional[str] = None
    jurisdiction: Optional[str] = "Utah"
    external_sources: Optional[List[str]] = ["google_scholar", "justia"]
    synthia_enhancement: bool = True

class Citation(BaseModel):
    text: str
    case_name: Optional[str] = None
    court: Optional[str] = None
    year: Optional[int] = None
    citation_format: Optional[str] = None

class ESQsAPIClient:
    """Client to communicate with existing ESQs platform APIs"""
    
    def __init__(self):
        # Use environment variables for production deployment
        self.esqs_backend_url = os.environ.get("ESQS_BACKEND_URL", "http://localhost:3000")
        self.synthia_url = os.environ.get("SYNTHIA_URL", "http://localhost:3002")
    
    async def get_synthia_research(self, query: str) -> Dict[str, Any]:
        """Get research results from existing Synthia AI system"""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.synthia_url}/synthia/analyze-code",
                    json={"query": query, "type": "legal_research"},
                    timeout=30.0
                )
                return response.json() if response.status_code == 200 else {}
            except Exception as e:
                print(f"Error connecting to Synthia: {e}")
                return {}

# Initialize API client
esqs_client = ESQsAPIClient()

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "service": "ESQs Legal Research API",
        "status": "active",
        "version": "1.0.0",
        "integration_points": [
            "ESQs Backend (Port 3000)",
            "Synthia AI (Port 3002)",
            "External Legal Databases"
        ]
    }

@app.post("/api/research/enhanced")
async def enhanced_legal_research(query: ResearchQuery):
    """
    Enhanced legal research combining Synthia AI with external legal databases
    """
    try:
        # Get existing Synthia research
        synthia_results = await esqs_client.get_synthia_research(query.query)
        
        # Simulate external research (to be implemented with actual APIs)
        external_results = {
            "google_scholar": f"Scholar results for: {query.query}",
            "justia": f"Justia results for: {query.query}",
            "westlaw": "Integration pending",
            "lexis": "Integration pending"
        }
        
        return {
            "query": query.query,
            "synthia_analysis": synthia_results,
            "external_research": external_results,
            "confidence_score": 0.85,
            "sources": ["synthia_ai", "google_scholar", "justia"],
            "timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Research error: {str(e)}")

if __name__ == "__main__":
    print("🚀 Starting ESQs Legal Research FastAPI Backend")
    print("🔗 Integrating with ESQs Platform")
    
    # Get port from environment variable for Render deployment
    port = int(os.environ.get("PORT", 8000))
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        reload=False,
        log_level="info"
    )
