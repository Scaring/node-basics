const { Router } = require('express');

const contacts = require('./contacts');
const { validateCreateUserMiddleware } = require('./contact.validator');

const contactsRouter = Router();

contactsRouter.get('/contacts/', async (req, res) => {
  try {
    const list = await contacts.listContacts();
    res.status(200).send(list);
  } catch (e) {
    console.log(e);
  }
});

contactsRouter.get('/contacts/:contactId', async (req, res) => {
  try {
    const searchedContactId = Number(req.params.contactId);
    const searchedContact = await contacts.getContactById(searchedContactId);

    if (!searchedContact) {
      res.status(404).send({ message: 'Not found' });
      return;
    }

    res.status(200).send(searchedContact);
    console.log('Contact sent!');
  } catch (e) {
    console.log(e);
  }
});

contactsRouter.post(
  '/contacts/',
  validateCreateUserMiddleware,
  async (req, res) => {
    try {
      const { name, email, phone } = req.body;

      if (!name || !email || !phone) {
        res.status(404).send({ message: 'missing required field' });
        return;
      }

      const adddedContact = await contacts.addContact(name, email, phone);
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
    const searchedContactId = Number(req.params.contactId);
    const removedContact = await contacts.removeContact(searchedContactId);

    if (!removedContact) {
      res.status(404).send({ message: 'Not found' });
      return;
    }

    res.status(200).send({ message: 'contact deleted' });
  } catch (e) {
    console.log(e);
  }
});

contactsRouter.patch('/contacts/:contactId', async (req, res) => {
  try {
    const searchedContactId = Number(req.params.contactId);
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      res.status(404).send({ message: 'missing required name field' });
      return;
    }

    const updatedContact = await contacts.updateContact(
      searchedContactId,
      updateData,
    );

    if (!updatedContact) {
      res.status(404).send({ message: 'Not found' });
      return;
    }

    res.status(200).send(updatedContact);
  } catch (e) {
    console.log(e);
  }
});

module.exports = contactsRouter;
