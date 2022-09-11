const express=require("express")
 const router=express.Router()

const{ authorCreate,loginAuthor}=require("../controllers/authorController")
const {createBlogs, getBlogs,updateBlog, deleteBlog,deleteByQuery}=require("../controllers/blogsController")
const {auth}=require("../middlewares/auth")
//.......................my all Apis....
//============post api create author========
router.post("/authors",authorCreate)
//============post api clogin author========
router.post("/login",loginAuthor)
//============post api create blogs=========
router.post("/blogs",auth,createBlogs)
//============get api get blogs=============
router.get("/blogs",auth,getBlogs)
//============put-api=======================
router.put("/blogs/:blogId",auth,updateBlog)
//===========delete api by path params======
router.delete("/blogs/:blogId",auth,deleteBlog)
//===========delete api by query params======
router.delete("/blogs",auth,deleteByQuery)

//=============in the put api and delete api if the blogid is not present============
//=============in the params so this api return the erorr in the response============
router.all("/*", function(req,res){
    res.status(404).send({status:false,msg:"blogId is not present in the path params"})
})



module.exports=router










