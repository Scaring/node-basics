const { Router } = require('express');
const bcrypt = require('bcrypt');
const Contact = require('../db/contact.model');
const { validateCreateUserMiddleware } = require('../db/contact.validator');

const authRouter = Router();

authRouter.post('/register', validateCreateUserMiddleware, async (req, res) => {
  try {
    const { password } = req.body;
    const hashPass = await bcrypt.hash(password, Number(process.env.HASH_SALT));
    await Contact.createContact({ ...req.body, token: '', password: hashPass });
    res.status(201);
  } catch (e) {
    res.status(500).send(e);
  } finally {
    res.end();
  }
});

module.exports = { authRouter };
