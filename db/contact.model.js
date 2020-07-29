const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free',
  },
  token: String,
});

class Contact {
  constructor() {
    this.contact = mongoose.model('Contacts', contactSchema);
  }

  getContacts = async () => {
    return this.contact.find();
  };

  getContactById = async id => {
    return await this.contact.findById(id);
  };

  createContact = async data => {
    return this.contact.create(data);
  };

  deleteContactById = async id => {
    return await this.contact.findByIdAndDelete(id);
  };

  updateContactById = async (id, data) => {
    return await this.contact.findByIdAndUpdate(id, data, { new: true });
  };
}

module.exports = new Contact();
