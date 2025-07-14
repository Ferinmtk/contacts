// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();            // loads PORT default
const { connectDB } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());               // body‑parser

// simple health check
app.get('/', (req, res) => res.send('API is running'));

const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);


const PORT = process.env.PORT || 3000;

// connect to DB first, then start listening
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀  Server ready on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌  Failed to connect to MongoDB', err);
    process.exit(1);
  });

module.exports = app;                  // keeps it test‑friendly
