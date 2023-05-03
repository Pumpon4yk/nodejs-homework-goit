const fs = require('fs/promises')
const path = require('path')
const {nanoid} = require('nanoid')

const contactsPath = path.join(__dirname, "./contacts.json")


async function listContacts() {
  const contacts = await fs.readFile(contactsPath)
  return JSON.parse(contacts)
}

async function getContactById (contactId) {
  const contacts = await listContacts()
  const result = contacts.find( ({id}) => id === contactId)
  return result || null
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  const index = contacts.findIndex( ({id}) => id === contactId)
  if(index === -1) return null;

  const [result] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

async function addContact(body) {
  const contacts = await listContacts()
  const contact = {
    id: nanoid(),
    ...body
  }
  contacts.push(contact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex( ({id}) => id === contactId)
  if(index === -1) return null;

  contacts[index] = {id: contactId, ...body}
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
