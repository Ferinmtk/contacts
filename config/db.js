// config/db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();          // reads .env automatically

const client = new MongoClient(process.env.MONGODB_URI);
let db;                              // will hold the live connection

async function connectDB() {
  if (db) return db;                 // reuse if already connected
  await client.connect();            // throws if bad URI
  db = client.db();                  // default DB in the URI
  console.log('✅  MongoDB connected');
  return db;
}

function getDb() {
  if (!db) throw new Error('DB not initialized. Call connectDB first.');
  return db;
}

module.exports = { connectDB, getDb };
