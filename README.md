
---

```markdown
# 🤖 AlFaaz Chatbot

A sleek, modern, and responsive AI chatbot application powered by Google's **Gemini API**.  
This project features a full-stack architecture with a React frontend and a Node.js/Express backend.

![AlFaaz Screenshot](./assets/screenshot.png) <!-- Replace with your own screenshot or demo gif -->

---

## ✨ Features

- **Real-time AI Conversation**: Engage in dynamic conversations powered by the `gemini-1.5-flash` model.  
- **Markdown Rendering**: The bot's responses are beautifully formatted, supporting lists, bold text, and more.  
- **Modern UI/UX**: A clean, visually appealing interface built with the Mantine component library.  
- **Robust Backend**: A secure and efficient backend built with Node.js, Express, and TypeScript.  
- **Error Handling**: Graceful error handling and clear user feedback for API or network issues.  
- **Rate Limiting**: Protects the backend from abuse with basic rate limiting.  

---

## 🛠️ Tech Stack

**Frontend**: React, TypeScript, Vite, Mantine UI, Axios  
**Backend**: Node.js, Express, TypeScript, Google Gemini API  
**Styling**: PostCSS, CSS Modules  
**Deployment**: Vercel (Frontend), Render/Heroku/Railway (Backend)  

---

## 📂 Project Structure

```

alfaaz-chatbot/
│
├── backend/   # Node.js + Express server
│   └── src/   # Backend code
│
└── frontend/  # React + Vite application
└── src/   # Frontend code

````

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 🔑 Prerequisites
- Node.js (v18.x or later recommended)  
- npm (comes with Node.js)  
- A Google Gemini API Key → [Get one from Google AI Studio](https://aistudio.google.com/)  

---

### ⚙️ Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/alfaaz-chatbot.git
cd alfaaz-chatbot
````

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory and add:

```env
# Server port
PORT=3001

# Your secret Gemini API Key
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"

# Frontend URL for CORS
CORS_ORIGIN=http://localhost:5173
```

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory and add:

```env
VITE_API_BASE_URL=http://localhost:3001
```

---

### ▶️ Running the Application

Run backend and frontend in separate terminals:

#### Start Backend Server

```bash
cd backend
npm run dev
```

Server will run at: **[http://localhost:3001](http://localhost:3001)**

#### Start Frontend Application

```bash
cd frontend
npm run dev
```

App will be available at: **[http://localhost:5173](http://localhost:5173)**

Open your browser → [http://localhost:5173](http://localhost:5173) → Start chatting with **AlFaaz** 🎉

---

## 📡 Example API Call (Backend → Gemini)

```ts
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(message);
    res.json({ reply: response.text() });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
```

---

## 📝 License

This project is licensed under the **MIT License** – see the [LICENSE.md](LICENSE.md) file for details.

---

## 💡 Future Improvements

* Add persistent chat history with a database (MongoDB/Postgres)
* Enable multi-user authentication
* Deploy with CI/CD pipelines

---

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-18.x-green)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)
![Mantine](https://img.shields.io/badge/ui-Mantine-339af0)

