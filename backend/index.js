const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const paymentRoutes = require('./routes/payments');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.options("*", cors());
app.all('/*', (req, res) => {
  res.status(404).send('Route not found');
});
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log('MongoDB connected'))
     .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});
