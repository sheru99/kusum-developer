const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController")
const bookController = require("../controllers/bookController")
const publisherController = require("../controllers/publisherController")

/////////////////////////////////////////////////////////////////////////////////////////////////////// 

router.post("/registerAuthor", authorController.registerAuthor)

///////////////////////////////////////////////////////////////////////////////////////
router.post("/registerPublisher", publisherController.registerPublisher)
/********************************register****************************** */ 
router.post("/registerBook", bookController.registerBook)

router.get("/getBooks", bookController.getBooks)


module.exports = router;