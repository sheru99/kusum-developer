const express = require('express');
const router = express.Router();
const booksController= require("../controller/bookController")



router.post("/createBook", booksController.createBook  )

router.get("/getBook", booksController.getBooks)

module.exports = router;