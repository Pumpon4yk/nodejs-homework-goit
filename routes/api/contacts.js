const express = require("express");
const controller = require("../../controller/contacts");
const { validateBody, isValidId, authValidToken } = require("../../middlewares");
const { schemasContact } = require("../../schemas");

const router = express.Router();

router.get("/",authValidToken, controller.getContactsAll);

router.get("/:contactId",authValidToken, isValidId, controller.getContactById);

router.post(
  "/",
  authValidToken,
  validateBody(schemasContact.contactsAddSchema),
  controller.addContact
);

router.delete("/:contactId", authValidToken, isValidId, controller.removeContact);

router.put(
  "/:contactId",
  authValidToken,
  isValidId,
  validateBody(schemasContact.contactsAddSchema),
  controller.updateContact
);

router.patch(
  "/:contactId/favorite",
  authValidToken,
  isValidId,
  validateBody(schemasContact.updateFavoriteSchema),
  controller.updateFavorite
);

module.exports = router;
