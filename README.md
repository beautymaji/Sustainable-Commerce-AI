<h1 align="center">Sustainable Commerce AI</h1>

<p align="center">
<strong>An Intelligent MERN Stack System for Automated Cataloging & Customer Support</strong>
<br />
<em>Sustainable Commerce AI</em>
</p>

<p align="center">
<img src="https://img.shields.io/badge/Stack-MERN-green" alt="MERN Stack">
<img src="https://img.shields.io/badge/AI-OpenAI-blue" alt="OpenAI">
<img src="https://img.shields.io/badge/Modules-2_Implemented-orange" alt="Modules">
</p>


📖 Table of Contents
1.Project Overview
2.System Architecture
3.Implemented Modules
4.AI Prompt Design Strategy
5.Outline of Remaining Modules
6.Technical Requirements
7.Setup & Installation


📖 Project Overview
Sustainable Commerce AI is a production-ready application designed to reduce manual catalog effort and enhance customer support for sustainable B2B platforms.

This project fulfills the requirements of the Rayeva AI Systems Assignment by implementing Module 1 (Auto-Category) and Module 4 (WhatsApp Support Bot). It demonstrates the integration of LLMs (Large Language Models) with real business logic to ensure accuracy, structured outputs, and practical usefulness.

🏗️ Architecture Overview
+-----------------------+       +-----------------------+       +-----------------------+|       FRONTEND        |       |       BACKEND         |       |    EXTERNAL SERVICES  ||       (React/Vite)    |       |    (Python/FastAPI)   |       |                       |+-----------------------+       +-----------------------+       +-----------------------+|                       |       |                       |       |                       ||  [ Module 1 UI ]      |       |  [ API Endpoints ]    |       |   OpenAI API (GPT-4)  ||  - Product Form       | <---> |  - /api/categorize    | <---> |   (Structured Output) ||  - JSON Viewer        |       |  - /api/support-chat  |       |                       ||                       |       |                       |       +-----------------------+|  [ Module 4 UI ]      |       |  [ Business Logic ]   |       |                       ||  - Chat Interface     |       |  - Prompt Engineering |       |   WhatsApp Business   ||  - Order Status       |       |  - Data Validation    |       |   API (Future Scope)  ||                       |       |  - Error Handling     |       |                       |+-----------------------+       +-----------------------+       +-----------------------+                                        |                                        v                                +-----------------------+                                |      DATABASE         |                                |      (SQLite/SQL)     |                                +-----------------------+                                | - Products            |                                | - Orders              |                                | - Conversation Logs   |                                +-----------------------+
                        


Architectural Highlights
1.Separation of AI Logic: The services/openaiService.js isolates all AI interactions. This allows the system to switch between Real AI and Mock Mode seamlessly without breaking the application.

2.Grounding Layer: Before sending prompts to the AI, the backend queries MongoDB (e.g., checking Order Status). This data is injected into the prompt, ensuring the AI's response is factually correct based on the system's state.

3.Structured Output: Mongoose schemas validate the AI's JSON response before saving to the database, ensuring data integrity.



🛠️ Implemented Modules
🟢 Module 1: AI Auto-Category & Tag Generator
Objective: Reduce manual catalog effort.

Workflow:

1.Input: User provides Product Name and Description.
2.AI Processing: The backend sends a prompt requesting a strict JSON structure containing primaryCategory, subCategory, seoTags, and sustainabilityFilters.
3.Business Logic Grounding: The backend validates the primaryCategory against a predefined list. If the AI hallucinates an invalid category, the system corrects it to "Miscellaneous".
4.Storage: The validated structured data is saved to the Product collection in MongoDB.

🟢 Module 4: AI WhatsApp Support Bot
Objective: Automate customer support with escalation logic.

Workflow:

1.Input: User sends a chat message.
2.Intent Detection: The AI analyzes the message to determine intent (Order Status, Refund, General).
3.Data Injection (RAG): If an Order ID is detected (e.g., "ORD-123"), the backend fetches the real status from the Order collection and injects it into the prompt context.
4.Safety Logic: If the intent is "Refund", the system sets an escalate: true flag, triggering a visual alert in the UI for human intervention.
5.Logging: All prompts and responses are stored in the AILog collection for transparency.


🤖 AI Prompt Design Strategy
To ensure the AI returns usable data, specific strategies were employed:

1. Schema Enforcement:
The prompt explicitly instructs the model to return only JSON.

System Prompt: "Output ONLY valid JSON. Do not include markdown formatting or explanation text."

2. Context Injection (Module 4):
To prevent hallucinations about order status, real data is provided to the AI.

User Prompt: "User asked: 'Where is ORD-123?'. System Data: Order found with status 'Shipped'. Answer the user based on this data."

3. Robustness (Mock Mode):
The architecture includes a fallback mechanism. If the OpenAI API key is invalid or missing, the system switches to "Mock Mode," returning pre-defined structured JSON. This ensures the frontend UI is always functional for demonstration purposes.


✅ Technical Requirements Checklist
Requirement                       Implementation Status

Structured JSON Outputs	         ✅ Enforced via Mongoose Schemas & Prompt Engineering.
Prompt + Response Logging	       ✅ Stored in AILog collection; visible in UI Logs page.
Environment-based API Keys	     ✅ Managed via .env file (Excluded from Git).
Separation of Logic	             ✅ Distinct Routes, Services, and Models folders.
Error Handling	                 ✅ Try/Catch blocks in API; User-friendly error alerts in UI 


🚀 Setup & Installation
Prerequisites
Node.js (v18+)
MongoDB (Running locally or Atlas URI)
OpenAI API Key (Optional - Project runs in Mock Mode without it)
1. Clone Repository
bash

git clone  https://github.com/beautymaji/Sustainable-Commerce-AI
cd Sustainable-Commerce-AI
2. Backend Setup
bash

cd server
npm install
Create a .env file in the server folder:

env

PORT=5000
MONGO_URI=mongodb://localhost:27017/rayeva_ai
OPENAI_API_KEY=sk-your_key_here
Start Server:

bash

npm start
3. Frontend Setup
Open a new terminal:

bash

cd client
npm install
npm run dev
4. Access Application
Open http://localhost:5173. Register an account to access the dashboard.

👤 Author
[Beauty Maji]
