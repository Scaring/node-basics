const express = require('express');
const cors = require('cors');
const contactsRouter = require('./db/contactRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', contactsRouter);

app.listen(3000, () => console.log('Server is listening on port: 3000'));
