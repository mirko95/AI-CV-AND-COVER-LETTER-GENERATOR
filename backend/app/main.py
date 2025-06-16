from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from app.services import cv_parser, job_parser, generator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate/")
async def generate(cv_file: UploadFile, job_description: str = Form(...)):
    cv_text = await cv_parser.parse_cv(cv_file)
    job_text = await job_parser.parse_job_description(job_description)
    tailored_cv, cover_letter = await generator.generate_documents(cv_text, job_text)
    return {
        "tailored_cv": tailored_cv,
        "cover_letter": cover_letter
    }
