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

Core Objectives:

->Automate product categorization with strict JSON schema enforcement.
->Ground AI responses in real database data (preventing hallucinations).
->Provide a transparent logging system for all AI interactions.


🏛️ System Architecture
The application follows a Service-Oriented Architecture using the MERN Stack (MongoDB, Express, React, Node.js). This ensures a clear Separation of Concerns between the Presentation Layer, Business Logic, and AI Integration.

High-Level Diagram
graph TD
    subgraph "Frontend (React + Vite)"
        A[User Interface] -->|REST API Call| B[Context API State]
    end

    subgraph "Backend (Node + Express)"
        C[API Routes] --> D[Business Logic Layer]
        D -->|Data Validation| E[(MongoDB)]
        D -->|Prompt Engineering| F[AI Service]
    end

    subgraph "External Services"
        F -->|Structured Request| G[OpenAI API]
        G -->|JSON Response| F
    end

    B -->|JSON Payload| C


 Architectural Highlights
1. Separation of AI Logic: The services/openaiService.js isolates all AI interactions. This allows the system to switch between Real AI and Mock Mode seamlessly without breaking the application.
2. Grounding Layer: Before sending prompts to the AI, the backend queries MongoDB (e.g., checking Order Status). This data is injected into the prompt, ensuring the AI's response is factually correct based on the system's state.
3. Structured Output: Mongoose schemas validate the AI's JSON response before saving to the database, ensuring data integrity.

🛠️ Implemented Modules
🟢 Module 1: AI Auto-Category & Tag Generator
Objective: Reduce manual catalog effort.

Workflow:

1. Input: User provides Product Name and Description.
2. AI Processing: The backend sends a prompt requesting a strict JSON structure containing primaryCategory, subCategory, seoTags, and sustainabilityFilters.
3. Business Logic Grounding: The backend validates the primaryCategory against a predefined list. If the AI hallucinates an invalid category, the system corrects it to "Miscellaneous".
4. Storage: The validated structured data is saved to the Product collection in MongoDB.

🟢 Module 4: AI WhatsApp Support Bot
Objective: Automate customer support with escalation logic.

Workflow:

1. Input: User sends a chat message.
2. Intent Detection: The AI analyzes the message to determine intent (Order Status, Refund, General).
3. Data Injection (RAG): If an Order ID is detected (e.g., "ORD-123"), the backend fetches the real status from the Order collection and injects it into the prompt context.
4. Safety Logic: If the intent is "Refund", the system sets an escalate: true flag, triggering a visual alert in the UI for human intervention.
5. Logging: All prompts and responses are stored in the AILog collection for transparency.


🤖 AI Prompt Design Strategy
To ensure the AI returns usable data, specific strategies were employed:

1. Schema Enforcement:
The prompt explicitly instructs the model to return only JSON.

System Prompt: "Output ONLY valid JSON. Do not include markdown formatting or explanation text."

2. Context Injection (Module 4):
To prevent hallucinations about order status, real data is provided to the AI.

User Prompt: "User asked: 'Where is ORD-123?'. System Data: Order found with status 'Shipped'. Answer the user based on this data."

3. Robustness (Mock Mode):
The architecture includes a fallback mechanism. If the OpenAI API key is invalid or missing, the system switches to "Mock Mode," returning pre-defined structured JSON. This ensures the frontend UI is always functional for demonstration purposes


📝 Outline of Remaining Modules
As per the assignment scope, the following modules are architected but not fully implemented:

Module 2: AI B2B Proposal Generator

Architecture: Takes budget and client_type as input. The backend logic filters products within budget. The AI generates a persuasive "Impact Summary" based on the selected product list.
Module 3: AI Impact Reporting Generator

Architecture: Logic-heavy calculation module. The backend calculates raw metrics (Plastic Saved, Carbon Avoided) using formulas. The AI is used only to convert these metrics into a human-readable paragraph for the customer.

