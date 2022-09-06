const authorModel=require("../models/authorModel")
const validator = require("validator")

const authorCreate=async function(req,res){
    try {
        let data=req.body
        let email=data.email
        if(Object.keys(data).length !=0){
          if(!validator.isEmail(email)){
            
            return res.send({status:false,msg:"your email id is not in proper format"})
          }
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




