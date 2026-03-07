const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// 1. Import Routes
const productRoutes = require('./routes/productRoutes');
const botRoutes = require('./routes/botRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// 2. Middleware Setup
app.use(cors()); // Enable CORS for frontend connection
app.use(express.json()); // Parse JSON bodies

// 3. Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rayeva_ai';
const PORT = process.env.PORT || 5000;

console.log("Attempting to connect to database...");

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
    
    // 4. Start Server ONLY after DB connects
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  });

// 5. API Routes
app.use('/api/products', productRoutes);
app.use('/api/bot', botRoutes);
app.use('/api/auth', authRoutes);

// 6. Basic Route for testing
app.get('/', (req, res) => {
  res.send('Sustainable Commerce AI Backend is Active');
});