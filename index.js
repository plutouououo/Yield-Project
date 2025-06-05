const express = require('express');
require('dotenv').config();
const depositRouter = require('./routes/deposit');
const withdrawRouter = require('./routes/withdraw');
const yieldRouter = require('./routes/yield');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Sudah built-in sejak Express 4.16
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/deposit', depositRouter);
app.use('/withdraw', withdrawRouter);
app.use('/yield', yieldRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
