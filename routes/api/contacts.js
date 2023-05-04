const express = require('express')
const controller = require('../../controller/contacts')
const {validateBodyContacts} = require('../../middlewares')
const contactsSchema = require('../../schema/contacts')

const router = express.Router()

router.get('/', controller.getContactsAll)

router.get('/:contactId', controller.getContactById)

router.post('/',validateBodyContacts(contactsSchema), controller.addContact)

router.delete('/:contactId', controller.removeContact)

router.put('/:contactId',validateBodyContacts(contactsSchema), controller.updateContact)

module.exports = router
