const blogsModel=require("../models/blogsModel")
const authorModel=require("../models/authorModel")


const createBlogs=async function(req,res){
    try {
        let data =req.body
        if(Object.keys(data).length !=0){
        let authorId=await authorModel.findOne({_id:data.authorId})
        if(!authorId) return res.status(403).send({status:false,msg:"please provide invalid auhtor id "})
        let savedData=await blogsModel.create(data)
          return  res.status(200).send({status:true,data:savedData})
    }else{
        return  res.status(400).send({status:false,msg:"body is empty"})
    }
    } catch (error) {
      return  res.status(500).send({status:false,msg:error.message})
    }
}

module.exports.createBlogs=createBlogs