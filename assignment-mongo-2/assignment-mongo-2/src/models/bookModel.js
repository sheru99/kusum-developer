const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName:{ 
        type : String,
        required : true,
    }, 
    authorName: 
    {
    type : String,
    required : true,
    },
    tags: [String],
    price: {
       indianPrice: String,
        europePrice: String
    },
   year: {type: Number, default: 2021},
   totalPages : Number,
   stockAvailable : Boolean
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users