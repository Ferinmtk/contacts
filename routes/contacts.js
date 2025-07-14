// routes/contacts.js
const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContactById,
} = require('../controllers/contactsController');

router.get('/', getAllContacts);         // /contacts
router.get('/:id', getContactById);      // /contacts/:id

module.exports = router;
