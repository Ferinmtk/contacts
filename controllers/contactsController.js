// controllers/contactsController.js
const { ObjectId } = require('mongodb');
const { getDb } = require('../config/db');

/**
 * GET /contacts       – return all contacts
 */
async function getAllContacts(req, res, next) {
  try {
    const contacts = await getDb()
      .collection('contacts')
      .find()
      .toArray();
    res.json(contacts);
  } catch (err) {
    next(err); 
  }
}

/**
 * GET /contacts/:id   – return one contact by _id
 */
async function getContactById(req, res, next) {
  try {
    const id = new ObjectId(req.params.id);
    const contact = await getDb()
      .collection('contacts')
      .findOne({ _id: id });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    // Covers malformed ObjectId and other issues
    if (err instanceof TypeError || err.name === 'BSONError') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    next(err);
  }
}

module.exports = {
  getAllContacts,
  getContactById,
};
