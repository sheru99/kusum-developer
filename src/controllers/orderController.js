
const OrderModel = require("../models/orderModel")

const createOrder= async function (req, res) {
    let data= req.body
  //  let savedData= await OrderModel.create(data)
   // return res.send({msg: savedData})
    let allBooks = await OrderModel.findOneAndUpdate(
                { isFreeAppUser: "true" }, //condition
                { $set: { amount: 100 } }, //update in data
                { new: true, upsert: true } ,T
            )
            res.send({msg: allBooks})
}


module.exports.createOrder=createOrder

