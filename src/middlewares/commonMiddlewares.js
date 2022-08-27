//first question validation checking in the middlewarefolder
const validation= function ( req, res, next) {
    let tokenHeader= req.headers.isfreeappuser
    console.log(tokenHeader)
    if(!tokenHeader){
      res.send("please enter isFreeAppUser Boolean field with any value")
    }else{
        next()
    }
}
module.exports.validation = validation