const { Router } = require('express');
const Contact = require('./contact.model');
const {
  validateCreateUserMiddleware,
  validateUpdateUserMiddleware,
} = require('./contact.validator');

const contactsRouter = Router();

contactsRouter.get('/contacts/', async (req, res) => {
  try {
    const list = await Contact.getContacts();
    res.json(list);
    res.end();
  } catch (e) {
    console.log(e);
  }
});

contactsRouter.get('/contacts/:contactId', async (req, res) => {
  try {
    const searchedContactId = req.params.contactId;
    const searchedContact = await Contact.getContactById(searchedContactId);
    if (!searchedContact) {
      res.status(404).json('Contact not found');
      return;
    }
    res.status(200).json(searchedContact);
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
  }
});

contactsRouter.post(
  '/contacts/',
  validateCreateUserMiddleware,
  async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      const adddedContact = await Contact.createContact({ name, email, phone });
      res.status(201).send(adddedContact);
    } catch (e) {
      console.log(e);
    } finally {
      res.end();
    }
  },
);

contactsRouter.delete('/contacts/:contactId', async (req, res) => {
  try {
    const searchedContactId = req.params.contactId;
    const removedContact = await Contact.deleteContactById(searchedContactId);
    if (!removedContact) {
      res.status(404).json('Contact not found');
      return;
    }
    res
      .status(200)
      .send({ message: `deleted contact with id: ${searchedContactId}` });
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
  }
});

contactsRouter.patch(
  '/contacts/:contactId',
  validateUpdateUserMiddleware,
  async (req, res) => {
    try {
      const searchedContactId = req.params.contactId;
      const updateData = req.body;

      if (Object.keys(updateData).length === 0) {
        res.status(404).send({ message: 'missing updated field' });
        return;
      }

      const updatedContact = await Contact.updateContactById(
        searchedContactId,
        updateData,
      );

      if (!updatedContact) {
        res.status(404).json('Contact not found');
        return;
      }

      res.status(200).send(updatedContact);
    } catch (e) {
      console.log(e);
    } finally {
      res.end();
    }
  },
);

module.exports = contactsRouter;
