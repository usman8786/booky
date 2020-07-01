const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const bookController = require("../controllers/books.controllers");

router.post("/add", checkAuth, bookController.addBook);
// router.get("/:_id",bookController.getSingleBook);
router.put("/:_id", checkAuth, bookController.updateBook);
router.delete("/:_id", checkAuth, bookController.deleteBook);
router.get("/", checkAuth, bookController.getAll);
router.post("/deletebooks", checkAuth, bookController.deleteManyBooks);
router.get("/:id", checkAuth, bookController.getBooksByUserId);

module.exports = router;
