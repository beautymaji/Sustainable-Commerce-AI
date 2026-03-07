const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { generateStructuredResponse } = require('../services/openaiService');

router.post('/chat', async (req, res) => {
  const { message, sender } = req.body;

  // 1. Define System Prompt
  const systemPrompt = `
    You are a helpful WhatsApp support bot for Rayeva.
    Analyze the user's message. Determine the intent (order_status, return_policy, refund, general).
    If the user wants a refund, set "escalate" to true.
    Output ONLY valid JSON with keys: replyMessage, escalate (boolean), detectedIntent.
  `;

  let contextData = "";
  
  // 2. Business Logic Grounding: Check for Order ID in message
  const orderIdMatch = message.match(/\bORD-\d+\b/); // Simple Regex for ORD-123
  
  if (orderIdMatch) {
    const order = await Order.findOne({ orderId: orderIdMatch[0] });
    if (order) {
      contextData = `Context: User asked about order ${order.orderId}. Status: ${order.status}, ETA: ${order.estimatedDelivery}.`;
    } else {
      contextData = `Context: Order ${orderIdMatch[0]} not found in database.`;
    }
  }

  const userPrompt = `User message: "${message}". ${contextData}`;

  try {
    // 3. Get AI Response
    const aiResponse = await generateStructuredResponse(systemPrompt, userPrompt, 'WhatsAppBot');

    // 4. Logic check for escalation
    if (aiResponse.escalate) {
      console.log(`🚨 ALERT: Human intervention needed for ${sender}`);
    }

    res.json(aiResponse);

  } catch (err) {
    res.status(500).json({ error: "Bot failed to process request" });
  }
});

module.exports = router;