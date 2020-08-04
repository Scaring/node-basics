const Joi = require('@hapi/joi');
const { Error } = require('mongoose');
const {
  allowedEmails,
  passwordPattern,
} = require('../validationPatterns/validationPatterns');

const LoginUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: allowedEmails },
    })
    .required(),

  password: Joi.string().pattern(passwordPattern).required(),
});

const validate = async (schema, data) => {
  const { error } = await schema.validate(data);
  if (error) {
    const message = error.details.reduce((message, item) => {
      if (message) return `${message}, ${item.message}`;
      return `${item.message}`;
    }, '');
    throw new Error(message);
  }
};

const validateLoginUserMiddleware = async (req, res, next) => {
  try {
    await validate(LoginUserSchema, req.body);
    next();
  } catch (e) {
    res.status(400).send(e.message);
    return res.end();
  }
};

module.exports = {
  validateLoginUserMiddleware,
};
