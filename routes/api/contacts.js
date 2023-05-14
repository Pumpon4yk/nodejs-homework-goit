const express = require('express')
const controller = require('../../controller/contacts')
const {validateBodyContacts, isValidId} = require('../../middlewares')
const {schemas} = require('../../models/contact')

const router = express.Router()

router.get('/', controller.getContactsAll)

router.get('/:contactId', isValidId, controller.getContactById)

router.post('/',validateBodyContacts(schemas.contactsAddSchema), controller.addContact)

router.delete('/:contactId', isValidId, controller.removeContact)

router.put('/:contactId', isValidId, validateBodyContacts(schemas.contactsAddSchema), controller.updateContact)

router.patch('/:contactId/favorite', isValidId, validateBodyContacts(schemas.updateFavoriteSchema), controller.updateFavorite)

module.exports = router
