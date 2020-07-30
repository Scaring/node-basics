const Joi = require('@hapi/joi');

const CreateUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua'] },
    })
    .required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

  phone: Joi.string(),
});

const UpdateUserSchema = Joi.object({
  name: Joi.string().min(2).max(30),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'ua'] },
  }),

  phone: Joi.string(),
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
