require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { contactsRouter } = require('./contacts/contact.router');
const { authRouter } = require('./auth/auth.router');
const mongoose = require('mongoose');

const app = express();

const createServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log('Database connection successful');

    app.use(cors());

    app.use(express.json());

    app.use('/', contactsRouter);
    app.use('/auth', authRouter);

    app.listen(3000, () => console.log('Server is listening on port: 3000'));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

createServer();
