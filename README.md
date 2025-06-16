# AI CV & Cover Letter Generator

An AI-powered application that analyzes job descriptions and automatically tailors your CV and generates a customized cover letter, using OpenAI's GPT models.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite, Axios, Tailwind CSS) |
| Backend | FastAPI (Python 3, Uvicorn) |
| Deployment | Render.com |
| Source Control | GitLab |
| LLM API | OpenAI GPT |
| Packaging | REST API |

---

## 🔧 Features

* Upload CV in PDF or DOCX format
* Paste job description
* AI generates:

  * Tailored CV adaptation
  * Personalized cover letter
* Download generated files
* Clean responsive UI with dark theme
* Fully serverless deployment possible

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```env
OPENAI_API_KEY=your_openai_api_key_here
```

✅ On Render, these variables are configured directly via Render Dashboard (Environment tab).

---

## ⚙ Installation (Local Development)

### 1️⃣ Clone the repo

```bash
git clone git@gitlab.com:<your_username>/ai-cv-and-cover-letter-generator.git
cd ai-cv-and-cover-letter-generator
```

---

### 2️⃣ Setup backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

✅ Create a `.env` file:

```bash
cp .env.example .env
```

And add your OpenAI API key.

Run backend locally:

```bash
uvicorn app.main:app --reload
```

API will be accessible at:
`http://127.0.0.1:8000/generate/`

---

### 3️⃣ Setup frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:
`http://127.0.0.1:5173`

---

### 4️⃣ Axios URL Configuration (for local development)

Inside `frontend/src/App.jsx`, set the backend URL:

```javascript
const response = await axios.post("http://127.0.0.1:8000/generate/", formData);
```

✅ For deployment, you will use the Render URL (see below).

---

## 🚀 Deployment (Render.com)

### 1️⃣ Backend (FastAPI)

* New Web Service → connect GitLab repo
* Root Directory: `backend`
* Language: `Python 3`
* Build Command:

```bash
pip install -r requirements.txt
```

* Start Command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 10000
```

* Environment Variables:

```env
OPENAI_API_KEY=your_api_key_here
```

* Instance Type: `Free`

---

### 2️⃣ Frontend (React)

* Use Render **Static Site** deployment
* Root Directory: `frontend`
* Build Command:

```bash
npm install && npm run build
```

* Publish Directory:

```bash
dist
```

✅ You don’t need a Start Command for static sites.

---

### 3️⃣ Update axios URL for production

Inside `frontend/src/App.jsx`, update:

```javascript
const response = await axios.post("https://your-backend-name.onrender.com/generate/", formData);
```

✅ Always include `/generate/` at the end.

---

## ✅ Live Demo

You can now publicly share this link.
👉 Anyone with the link can start using your SaaS!

---

## 💸 Pricing & Free Tier Summary

| Service         | Cost                       |
| --------------- | -------------------------- |
| Render Frontend | ✅ Free                     |
| Render Backend  | ✅ Free (limited RAM & CPU) |
| GitLab          | ✅ Free                     |
| OpenAI          | ⚠ Paid (after free credit) |

---

## ⚠ Important Notes

* This app fully depends on your OpenAI API key → always monitor usage
* You may want to implement rate limiting or auth before public release
* Render Free Tier sleeps after inactivity

---

## 🎯 Future Improvements

* Add user authentication (Supabase/Auth0)
* Stripe payments integration
* SaaS analytics dashboard
* Error handling improvements
* Usage logging & admin panel
* Deployment on DigitalOcean / Fly.io / Railway

---

## 👨‍💻 Author

**Mirko Messina**

* GitLab: [mirkomessina87](https://gitlab.com/mirkomessina87)
* GitHub mirror: [mirko95](https://github.com/mirko95)
* LinkedIn: [mirko-messina95](https://linkedin.com/in/mirko-messina95)