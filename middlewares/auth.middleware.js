const jwt = require('jsonwebtoken');
const Contact = require('../contacts/contact.model');

const authMiddlevare = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send({
        message: 'Not authorized',
      });
      return;
    }
    const parsedToken = token.replace('Bearer ', '');
    const data = await jwt.verify(parsedToken, process.env.PRIVATE_JWT_KEY);
    const contact = await Contact.getContactById(data.id);
    req.current = contact;

    next();
  } catch (e) {
    res.status(401).send('Invalid token');
  }
};

module.exports = authMiddlevare;
