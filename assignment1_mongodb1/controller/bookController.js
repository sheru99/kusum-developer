const booksModel= require("../model/bookModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedData= await booksModel.create(data)
    res.send({msg: savedData})
}

const getBooks= async function (req, res) {
    let allBooks= await booksModel.find()
    res.send({msg: allBooks})
}

module.exports.createBook= createBook
module.exports.getBooks  = getBooks
 

