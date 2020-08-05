require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { contactsRouter } = require('./contacts/contact.router');
const { authRouter } = require('./auth/auth.router');
const mongoose = require('mongoose');
const emmiter = require('./services/events');

const app = express();

const createServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    emmiter.emit('dataBastConnection');

    app.use(cors());

    app.use(express.json());

    app.use('/contacts', contactsRouter);
    app.use('/auth', authRouter);

    app.listen(3000, () => emmiter.emit('serverStart'));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

createServer();
