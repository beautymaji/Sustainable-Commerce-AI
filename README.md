<h1 align="center">Sustainable Commerce AI</h1>

<p align="center">
<strong>An Intelligent MERN Stack System for Automated Cataloging & Customer Support</strong>
<br />
<em>Rayeva – AI Systems Assignment</em>
</p>

<p align="center">
<img src="https://img.shields.io/badge/Stack-MERN-green" alt="MERN Stack">
<img src="https://img.shields.io/badge/AI-OpenAI-blue" alt="OpenAI">
<img src="https://img.shields.io/badge/Modules-2_Implemented-orange" alt="Modules">
</p>

📖 Table of Contents
Project Overview
Objective
Implemented Modules
Architecture Overview
AI Prompt Design Strategy
Outline of Remaining Modules
Technical Requirements Checklist
Setup & Installation
Demo Video
📖 Project Overview
Sustainable Commerce AI is a production-ready application designed to streamline operations for sustainable B2B platforms. It reduces manual catalog effort and enhances customer support through applied AI integrated with real business logic.

This project fulfills the requirements of the Rayeva AI Systems Assignment by implementing Module 1 (Auto-Category) and Module 4 (WhatsApp Support Bot).

Key Features:

🏷️ AI Auto-Category & Tag Generator: Automates product categorization with structured JSON outputs.
💬 AI WhatsApp Support Bot: Handles customer queries with logic-based grounding (e.g., checking real order status).
🔐 Authentication System: Secure Login/Signup for admin users.
📊 Transparency Dashboard: View AI logs and system statistics.
🎯 Objective
The goal was to build structured, production-ready AI integrated with real business logic. The system avoids "black box" AI implementations by:

Grounding: Validating AI outputs against business rules (e.g., predefined categories).
Context Injection: Feeding real database data (Order Status) into the AI before it generates a response.
Logging: Storing every prompt and response in MongoDB for auditability.
🛠️ Implemented Modules
🟢 Module 1: AI Auto-Category & Tag Generator
Input: Product Name & Description.
Process:
Sends data to OpenAI API with a strict JSON schema requirement.
Business Logic Grounding: Validates the returned category against a predefined list (['Packaging', 'Kitchenware', etc.]). If the AI hallucinates a category, it defaults to "Miscellaneous".
Output: Structured JSON containing primaryCategory, subCategory, seoTags, and sustainabilityFilters.
Storage: Saves the result to MongoDB.
🟢 Module 4: AI WhatsApp Support Bot
Input: User chat message.
Process:
Intent Detection: AI analyzes if the user is asking for status, a refund, or general info.
Logic Grounding (RAG): If an Order ID (e.g., "ORD-123") is detected in the message, the backend queries MongoDB for real status data before prompting the AI.
Escalation Logic: If the intent is "Refund", the system flags escalate: true, triggering a manual handover alert in the UI.
Output: Human-readable response + Escalation flags.
🏛️ Architecture Overview
The application follows a Service-Oriented Architecture using the MERN stack.

text

┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   React Client  │─────▶│   Express API   │─────▶│    MongoDB      │
│   (Port 5173)   │      │   (Port 5000)   │      │   (Database)    │
└─────────────────┘      └────────┬────────┘      └─────────────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   OpenAI API    │
                         │   (AI Model)    │
                         └─────────────────┘
Folder Structure:

client/: React frontend (Vite) with separated Pages, Components, and Context.
server/models: Mongoose schemas for structured data validation.
server/services: Encapsulated AI logic (OpenAI Service).
server/routes: API endpoints separated by module.
🤖 AI Prompt Design Strategy
We used specific prompt engineering techniques to ensure reliability.

1. Structured Output Enforcement
We instructed the model to return only valid JSON, making the output parseable by the backend.

System Prompt: "You are a sustainable commerce catalog manager. Output ONLY valid JSON with keys: primaryCategory, subCategory, seoTags, sustainabilityFilters."

2. Context Injection (Module 4)
To prevent the AI from lying about order status, we inject real data into the prompt at runtime.

Backend Logic: const order = await Order.findOne({ orderId: 'ORD-123' });
Prompt: "User asked about order ORD-123. System Context: Status is 'Shipped', ETA is 'Tomorrow'. Answer the user based on this context."

3. Safe Mode (Mock Data)
To ensure the project works for evaluation without a paid API key, the system includes a fallback mechanism that returns structured mock data if the API key is invalid, ensuring the UI is always functional.

📝 Outline of Remaining Modules
Module 2: AI B2B Proposal Generator
Architecture:
Input: Budget limit & Client Industry.
Logic: Backend calculates the optimal product mix based on budget constraints (Math-based, not AI).
AI Layer: Generates the "Impact Positioning Summary" text based on the calculated product list.
Module 3: AI Impact Reporting Generator
Architecture:
Input: Order ID.
Logic: Calculates Plastic Saved and Carbon Avoided using standard formulas (Logic-based).
AI Layer: Converts raw numbers into a "Human-readable impact statement" (Creative text generation).
✅ Technical Requirements Checklist
Requirement
Implementation
Structured JSON Outputs	✅ Enforced via Prompt Engineering & Mongoose Schema validation.
Prompt + Response Logging	✅ All interactions are saved in the AILog collection in MongoDB.
Environment-based API Keys	✅ Keys stored in .env file (excluded from GitHub).
Separation of AI & Business Logic	✅ routes handle HTTP, services handle AI, models handle data.
Error Handling	✅ Try/Catch blocks in API routes; Frontend error alerts.

🚀 Setup & Installation
Prerequisites
Node.js (v18+)
MongoDB (Local instance or Atlas URI)
OpenAI API Key (Optional - works with Mock Mode without it)
1. Clone the Repository
bash

git clone https://github.com/beautymaji/Sustainable-Commerce-AI.git
cd Sustainable-Commerce-AI
2. Setup Backend
bash

cd server
npm install
Create a .env file in the server folder:

env

PORT=5000
MONGO_URI=mongodb://localhost:27017/rayeva_ai
OPENAI_API_KEY=sk-your_key_here
Start the server:

bash

npm start
3. Setup Frontend
Open a new terminal:

bash

cd client
npm install
npm run dev
4. Access the Application
Open http://localhost:5173 in your browser.

Sign Up: Create a new account.
Login: Access the dashboard.
Test Modules: Navigate to "Auto-Category" or "Support Bot" via the sidebar.

 Author
Beauty Maji
Role: Full Stack / AI Intern Applicant