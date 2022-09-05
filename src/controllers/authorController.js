const authorModel=require("../models/authorModel")

const authorCreate=async function(req,res){
    try {
        let data=req.body
        if(Object.keys(data).length !=0){
        let savedata=await authorModel.create(data)
          return res.status(201).send({status:true,data:savedata})
        }else{
          return  res.status(400).send({status:false,msg:"body is empty"})
        }
    } catch (error) {
      return  res.status(500).send({status:false,msg:error.message})
    }
}

module.exports.authorCreate=authorCreate