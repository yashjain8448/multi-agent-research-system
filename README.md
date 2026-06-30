# 🤖 Multi-Agent Research System

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi)
![LangChain](https://img.shields.io/badge/LangChain-black?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python)
![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render)

An AI-powered research assistant built using a **multi-agent architecture**. The system automatically searches the web, extracts key insights, generates a structured research report, and critiques its own output using four specialized AI agents.

---

## 🚀 Live Demo

🌐 **Application:** https://multi-agent-research-system-topaz.vercel.app

---

## ✨ Features

- 🔍 **Search Agent**
  - Searches the web using Tavily Search API
  - Retrieves the most relevant and authoritative sources
  - Displays source titles, snippets, and clickable links

- 📖 **Reader Agent**
  - Selects the most useful source
  - Extracts key concepts
  - Identifies important statistics
  - Generates an executive summary

- ✍️ **Writer Agent**
  - Produces a professional research report
  - Includes introduction, findings, conclusion, and references
  - Uses only verified research collected by previous agents

- 🧐 **Critic Agent**
  - Reviews the generated report
  - Assigns an overall quality score
  - Highlights strengths
  - Suggests improvements

- 🎨 Modern React UI
  - Expand/Collapse cards
  - Copy report functionality
  - Markdown rendering
  - Responsive design

---

# 🏗️ System Architecture

```
                    User Topic
                         │
                         ▼
                🔍 Search Agent
                         │
                         ▼
                📖 Reader Agent
                         │
                         ▼
                ✍️ Writer Agent
                         │
                         ▼
                🧐 Critic Agent
                         │
                         ▼
                  Final Research
```

---

# 🛠️ Tech Stack

### Frontend

- React
- Vite
- Bootstrap
- React Markdown

### Backend

- FastAPI
- LangChain
- Tavily Search API
- OpenAI / Mistral
- Python

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

# 🔮 Future Improvements

- PDF report export
- Multi-source synthesis
- Research history
- Authentication
- Citation generation
- Streaming responses
- Agent reasoning visualization

---

# 👨‍💻 Author

**Yash Jain**

- GitHub: https://github.com/yashjain8448
- LinkedIn: https://www.linkedin.com/in/yash-jain-b87527272/

---

## ⭐ If you found this project useful, consider giving it a star!
