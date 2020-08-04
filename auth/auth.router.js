const { Router } = require('express');
const bcrypt = require('bcrypt');
const Contact = require('../contacts/contact.model');
const jwt = require('jsonwebtoken');
const {
  validateCreateUserMiddleware,
} = require('../contacts/contact.validator');
const { validateLoginUserMiddleware } = require('./auth.validation');
const authMiddleware = require('../middlewares/auth.middleware');

const authRouter = Router();

authRouter.post('/register', validateCreateUserMiddleware, async (req, res) => {
  try {
    const { password } = req.body;
    const hashPass = await bcrypt.hash(password, Number(process.env.HASH_SALT));
    const createdContact = await Contact.createContact({
      ...req.body,
      token: '',
      password: hashPass,
    });
    const { email, subscription } = createdContact;
    res.status(201).send({ email, subscription });
  } catch (e) {
    switch (e.code) {
      case 11000:
        res.status(409).send({
          message: 'Email in use',
        });
        break;

      default:
        res.status(500).send(e);
    }
  } finally {
    res.end();
  }
});

authRouter.post('/login', validateLoginUserMiddleware, async (req, res) => {
  try {
    const { password, email } = req.body;
    const currentContact = await Contact.getContactWithQuery({ email });

    if (!currentContact.length) {
      res.status(400).send(`User with email: ${email} not found`);
      return;
    }

    const isEqualPassword = await bcrypt.compare(
      password,
      currentContact[0].password,
    );

    if (!isEqualPassword) {
      res.status(401).send('Email or password is wrong');
      return;
    }

    const accessToken = await jwt.sign(
      { id: currentContact[0]._id },
      process.env.PRIVATE_JWT_KEY,
      { expiresIn: '1d' },
    );

    await Contact.updateContactById(currentContact[0]._id, {
      token: accessToken,
    });

    res.json({
      token: `Bearer ${accessToken}`,
      user: {
        email: currentContact[0].email,
        subscription: currentContact[0].subscription,
      },
    });
  } catch (e) {
    res.status(500).send(e);
  } finally {
    res.end();
  }
});

authRouter.post('/logout', authMiddleware, async (req, res) => {
  try {
    const searchedContact = await req.current;
    if (!searchedContact) {
      res.status(401).send({
        message: 'Not authorized',
      });
      return;
    }

    await Contact.updateContactById(searchedContact._id, {
      token: '',
    });

    res.status(204);
  } catch (e) {
    console.log(e);
  } finally {
    res.end();
  }
});

module.exports = { authRouter };
