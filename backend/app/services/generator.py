import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

prompt_template = """
You are an expert career consultant. The user provided the following CV and job description.

CV:
{cv}

Job Description:
{job}

Your task is NOT to invent or create new information.

Your only task is to adapt the existing CV to better fit the job description by:
- Reordering content if needed
- Emphasizing relevant skills, experiences and qualifications that match the job
- Rephrasing sentences to align with keywords in the job description
- Removing irrelevant content if necessary

⚠ Do NOT create new experiences, skills, achievements or certifications.
⚠ Only work with the information provided in the CV.

Output format:
CV:
<<<CV>>>
[write the adapted CV here]

COVER LETTER:
<<<COVER>>>
[generate a short and convincing cover letter based on the adapted CV and job description]
"""


async def generate_documents(cv_text, job_text):
    prompt = prompt_template.format(cv=cv_text, job=job_text)
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a career advisor AI."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=3000
    )

    output = response.choices[0].message.content

    try:
        tailored_cv = output.split("<<<CV>>>")[1].split("<<<COVER>>>")[0].strip()
        cover_letter = output.split("<<<COVER>>>")[1].strip()
    except IndexError:
        tailored_cv = output
        cover_letter = ""

    return tailored_cv, cover_letter
