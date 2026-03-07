const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const AILog = require('../models/AILog');
const { generateStructuredResponse } = require('../services/openaiService');

// --- Module 1: Categorization Endpoint ---
router.post('/categorize', async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Product name and description required" });
  }

  const systemPrompt = `
    You are a sustainable commerce catalog manager. 
    Categorize the product based on its name and description.
    Output ONLY valid JSON with keys: primaryCategory, subCategory, seoTags (array), sustainabilityFilters (array).
    Valid primary categories are: "Packaging", "Kitchenware", "Stationery", "Apparel".
    Sustainability filters examples: plastic-free, vegan, compostable.
  `;

  const userPrompt = `Product: ${name}. Description: ${description}`;

  try {
    // 1. Call AI Service
    const aiResult = await generateStructuredResponse(systemPrompt, userPrompt, 'CategoryGenerator');

    // 2. Business Logic Validation (Grounding)
    const validCategories = ["Packaging", "Kitchenware", "Stationery", "Apparel"];
    if (!validCategories.includes(aiResult.primaryCategory)) {
      aiResult.primaryCategory = "Miscellaneous"; // Fallback
    }

    // 3. Store in Database
    const newProduct = new Product({
      name,
      description,
      primaryCategory: aiResult.primaryCategory,
      subCategory: aiResult.subCategory,
      seoTags: aiResult.seoTags,
      sustainabilityFilters: aiResult.sustainabilityFilters
    });

    await newProduct.save();

    // 4. Return Structured JSON
    res.status(201).json(newProduct);

  } catch (err) {
    console.error("Categorization Error:", err);
    res.status(500).json({ error: err.message });
  }
});


// --- NEW: Dashboard Statistics Endpoint ---
router.get('/stats', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const logCount = await AILog.countDocuments();
    
    res.json({
      productsAnalyzed: productCount,
      aiInteractions: logCount,
      accuracy: "98.5%", // Mock static data for demo
      tokensSaved: productCount * 150 // Mock calculation
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- NEW: AI Logs Endpoint (For Transparency Page) ---
router.get('/logs', async (req, res) => {
  try {
    // Fetch the 50 most recent logs
    const logs = await AILog.find().sort({ timestamp: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;