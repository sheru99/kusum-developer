const { count } = require("console")
const BookModel= require("../models/bookModel")


// create the following API’s (write logic in bookController and routes in routes):
// createBook : to create a new entry..use this api to create 11+ entries in your collection


const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}


// bookList : gives all the books- their bookName and authorName only 


const bookList= async function (req, res) {
    
    let bookList= await BookModel.find().select({bookName : 1 , authorName : 1 , _id : 0})
    res.send({msg: bookList})
}

// getBooksInYear: takes year as input in post request and gives list of all books published that year


const getBooksInYear= async function (req, res) {

 
    let savedData= await BookModel.find({year : req.body.year} ).select()
    res.send({msg: savedData})
  
}



// getParticularBooks:- (this is a good one, make sincere effort to solve this) take any input and use it as a condition to fetch books that satisfy that condition
// e.g if body had { name: “hi”} then you would fetch the books with this name
// if body had { year: 2020} then you would fetch the books in this year
// hence the condition will differ based on what you input in the request body





const getParticularBooks= async function (req, res) {

    let savedData= await BookModel.find(req.body).select()
    res.send({msg: savedData})
 }




 // getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR” 


const getXINRBooks= async function (req, res) {

    
 
    let savedData= await BookModel.find({  "price.indianPrice": { $in : ["500", "200", "100"]}   }).select()
    res.send({msg: savedData})
    console.log(savedData)
  

}



// getRandomBooks - returns books that are available in stock or have more than 500 pages 


const getRandomBooks= async function (req, res) {

 
    let savedData= await BookModel.find({ $or : [{ totalPages : {$gt : 500} }, {stockAvailable : true}  ] }).select()
    res.send({msg: savedData})
    console.log(savedData)
  
}


module.exports.createBook= createBook
module.exports.bookList= bookList
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks= getParticularBooks
module.exports.getXINRBooks=getXINRBooks
module.exports.getRandomBooks = getRandomBooks