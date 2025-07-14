const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();
const contactsRoutes = require('./routes/contacts');

app.use(express.json());
app.use('/contacts', contactsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
