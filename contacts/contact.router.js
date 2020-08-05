const { Router } = require('express');
const Contact = require('./contact.model');
const authMiddleware = require('../middlewares/auth.middleware');
const {
  validateCreateUserMiddleware,
  validateUpdateUserMiddleware,
} = require('./contact.validator');
const { avatarUploader } = require('../middlewares/avatarUploader.middleware');

const contactsRouter = Router();

contactsRouter.get('/', authMiddleware, async (req, res) => {
  try {
    const list = await Contact.getContacts();
    res.json(list);
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
  }
});

contactsRouter.get('/getById/:contactId', authMiddleware, async (req, res) => {
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

contactsRouter.get('/current', authMiddleware, async (req, res) => {
  try {
    const searchedContact = await req.current;
    if (!searchedContact) {
      res.status(401).send({
        message: 'Not authorized',
      });
      return;
    }
    res.status(200).send({
      email: searchedContact.email,
      subscription: searchedContact.subscription,
    });
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
  }
});

contactsRouter.post('/', validateCreateUserMiddleware, async (req, res) => {
  try {
    const { name, email, phone, token } = req.body;
    const adddedContact = await Contact.createContact({
      name,
      email,
      phone,
      token,
    });
    res.status(201).send(adddedContact);
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
  }
});

contactsRouter.delete('/:contactId', authMiddleware, async (req, res) => {
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
  '/:contactId',
  authMiddleware,
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

contactsRouter.post(
  '/uploadAvatar',
  authMiddleware,
  avatarUploader,
  async (req, res) => {
    console.log(req.file);
    res.end();
  },
);

module.exports = { contactsRouter };
