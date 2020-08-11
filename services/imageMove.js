const Contact = require('../contacts/contact.model');
const fs = require('fs').promises;

const imageMove = async (nativePath, destinationPath) => {
  await fs.copyFile(nativePath, destinationPath);
  await fs.unlink(nativePath);
};

module.exports = imageMove;
