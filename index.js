const express = require('express');
const cors = require('cors');
const contacts = require('./contacts');

const app = express();

// app.use(cors);
// app.use(express.urlencoded());
// app.use(express.json());

app.use('api/', async (req, res) => {
  try {
    const list = await contacts.listContacts();
    res.status(200);
    res.send(list);
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000, () => console.log('Server is listening on port: 3000'));

// const argv = require('yargs').argv;

// async function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case 'list':
//       const list = await contacts.listContacts();
//       console.log('Contacts list:');
//       console.table(list);
//       break;

//     case 'get':
//       const searchedContact = await contacts.getContactById(id);
//       console.log('Searched contact:');
//       console.log(searchedContact);
//       break;

//     case 'add':
//       const addedContact = await contacts.addContact(name, email, phone);
//       const listWithAddedContact = await contacts.listContacts();

//       console.log('Added contact:');
//       console.log(addedContact);
//       console.log('Contacts list:');
//       console.table(listWithAddedContact);
//       break;

//     case 'remove':
//       const removedContact = await contacts.removeContact(id);
//       const listWithoutRemovedContact = await contacts.listContacts();

//       console.log('Deleted contact:');
//       console.log(removedContact);
//       console.log('Contacts list:');
//       console.table(listWithoutRemovedContact);
//       break;

//     default:
//       console.warn('\x1B[31m Unknown action type!');
//   }
// }

// invokeAction(argv);
