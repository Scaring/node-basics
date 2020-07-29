require('dotenv').config();
const cors = require('cors');
const express = require('express');
const contactsRouter = require('./db/contactRouter');
const mongoose = require('mongoose');

const createServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Mongo connected');

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/', contactsRouter);

    app.listen(3000, () => console.log('Server is listening on port: 3000'));
  } catch (e) {
    console.log(e);
  }
};

createServer();
