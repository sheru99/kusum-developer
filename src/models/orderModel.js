const moment = require('moment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema( {
    userId:{
        type:ObjectId,
        ref:"UserCollection"
    },
    productId:{
        type:ObjectId,
        ref:"productCollection"
    },
    amount:{
        type:Number
    },
    isFreeAppUser:{
        type:Boolean
    },
    date:{
        type:String
    }
}, { timestamps: true });

module.exports = mongoose.model('orderCollection', orderSchema)