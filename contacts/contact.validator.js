const Joi = require('@hapi/joi');
const {
  allowedEmails,
  passwordPattern,
} = require('../validationPatterns/validationPatterns');

const CreateUserSchema = Joi.object({
  name: Joi.string(),

  phone: Joi.string(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: allowedEmails },
    })
    .required(),

  password: Joi.string().pattern(passwordPattern).required(),
});

const UpdateUserSchema = Joi.object({
  name: Joi.string(),

  phone: Joi.string(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: allowedEmails },
  }),
});

const validateCreateUserMiddleware = async (req, res, next) => {
  const { error } = await CreateUserSchema.validate(req.body);
  if (error) {
    const message = error.details.reduce((message, item) => {
      if (message) return `${message}, ${item.message}`;
      return `${item.message}`;
    }, '');
    res.status(400).send(message);
    res.end();
    return;
  }

  next();
};

const validateUpdateUserMiddleware = async (req, res, next) => {
  const { error } = await UpdateUserSchema.validate(req.body);
  if (error) {
    const message = error.details.reduce((message, item) => {
      if (message) return `${message}, ${item.message}`;
      return `${item.message}`;
    }, '');
    res.status(400).send(message);
    res.end();
    return;
  }

  next();
};

module.exports = {
  validateCreateUserMiddleware,
  validateUpdateUserMiddleware,
};
