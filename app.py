from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pipeline import run_research_pipeline

class ResearchRequest(BaseModel):
    topic: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Multi Agent Research API Running"}

@app.post("/research")
def research(req: ResearchRequest):

    result = run_research_pipeline(req.topic)

    return result