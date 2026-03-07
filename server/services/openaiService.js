const AILog = require('../models/AILog');
require('dotenv').config();

async function generateStructuredResponse(systemPrompt, userPrompt, moduleName) {
  
  // Check if API Key is valid (not the placeholder)
  const apiKey = process.env.OPENAI_API_KEY;
  const isKeyValid = apiKey && !apiKey.includes('your') && apiKey.startsWith('sk-');

  if (isKeyValid) {
    // --- REAL AI MODE (Use if you have a valid key) ---
    try {
      const OpenAI = require('openai');
      const openai = new OpenAI({ apiKey });
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
      });

      const content = response.choices[0].message.content;
      return JSON.parse(content);
    } catch (err) {
      console.error("OpenAI Error:", err.message);
      // Fall back to mock data if API fails
      return getMockData(moduleName, userPrompt); 
    }
  } else {
    // --- MOCK MODE (Safe Mode for Demo) ---
    console.log(`⚠️ No valid API Key detected. Using Mock Data for: ${moduleName}`);
    return getMockData(moduleName, userPrompt);
  }
}

// Helper function to generate mock data
function getMockData(moduleName, userPrompt) {
  let mockResponse = {};

  if (moduleName === 'CategoryGenerator') {
    mockResponse = {
      primaryCategory: "Packaging",
      subCategory: "Eco-Friendly Shipping",
      seoTags: ["sustainable", "biodegradable", "eco-packaging", "green business", "compostable"],
      sustainabilityFilters: ["plastic-free", "recycled", "compostable"]
    };
  } else if (moduleName === 'WhatsAppBot') {
    if (userPrompt.includes("ORD-123")) {
      mockResponse = {
        replyMessage: "Mock Bot: Order ORD-123 is currently Shipped and will arrive Tomorrow.",
        escalate: false,
        intent: "order_status"
      };
    } else if (userPrompt.toLowerCase().includes("refund")) {
      mockResponse = {
        replyMessage: "Mock Bot: I understand you want a refund. I am escalating this to a human agent.",
        escalate: true,
        intent: "refund"
      };
    } else {
      mockResponse = {
        replyMessage: "Mock Bot: Hello! I am here to help with your sustainable orders.",
        escalate: false,
        intent: "general"
      };
    }
  }

  return mockResponse;
}

module.exports = { generateStructuredResponse };