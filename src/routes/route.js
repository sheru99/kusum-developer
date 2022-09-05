const express=require("express")
 const router=express.Router()

const authorController=require("../controllers/authorController")
const blogsController=require("../controllers/blogsController")


router.post("/authors",authorController.authorCreate)
router.post("/blogs",blogsController.createBlogs)





module.exports=router