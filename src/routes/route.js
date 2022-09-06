const express=require("express")
 const router=express.Router()

const authorController=require("../controllers/authorController")
const blogsController=require("../controllers/blogsController")

//===================post api create author======================
router.post("/authors",authorController.authorCreate)
//===================post api create blogs======================
router.post("/blogs",blogsController.createBlogs)
//===================get api get blogs======================
router.get("/blogs",blogsController.getBlogs)
//==================put-api===================================
router.put("/blogs/:blogId",blogsController.updateBlog)
//===================delete api===============================
router.delete("/blogs/:blogId",blogsController.deleteBlog)
//=====================
router.delete("/blogs",blogsController.deleteByQuery)






module.exports=router