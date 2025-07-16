const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => res.send('API is running'));

// Routes
const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);

// Global error handler (optional but recommended)
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀  Server ready on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌  Failed to connect to MongoDB', err);
    process.exit(1);
  });

module.exports = app;
