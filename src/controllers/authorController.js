const authorModel = require("../models/authorModel")
const validator = require("validator")
const jwt = require("jsonwebtoken")

//=======================post api create author==================
const authorCreate = async function (req, res) {
    try {
        let { fname, lname, title, email, password, ...rest} = req.body
        //......handling extra keys and capital letters of keys..............
        if(Object.keys(rest).length>0)
        return res.status(400).send({status:false,msg:`Invalid key => ${Object.keys(rest)}`})

        if (Object.keys(req.body).length != 0) {
            
            const isEmailAlreadyUsed=await authorModel.findOne({email})
            
            if(isEmailAlreadyUsed){
                return res.status(400).send({status:false,msg:"this email is already used"})
            }
            if (!fname) {
                return res.status(400).send({ status: false, msg: " Fname field is requires" })
            }
            if (!lname) {
                return res.status(400).send({ status: false, msg: "lname field is required" })

            }
            if (!title) {
                return res.status(400).send({ status: false, msg: "title field is requried" })
            }
            if (!email) {
                return res.status(400).send({ status: false, msg: " email field is required" })
            }
            if (!password) {
                return res.status(400).send({ status: false, msg: " password field is requires" })
            }

            if (!validator.isEmail(req.body.email)) {
                return res.status(400).send({ status: false, msg: "your email id is not in proper format " })

            } let savedata = await authorModel.create(req.body)
            return res.status(201).send({ status: true, data: savedata })
        } else {
            return res.status(400).send({ status: false, msg: "no data to create" })

        }

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}
//========================post api loginAuthor====================================
const loginAuthor = async function (req, res) {
    try {
        let{ email, password }= req.body
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "please enter data in request body" })
        }
        if (!email) {
            return res.status(400).send({ Status: false, msg: " please enter email" })
        }
        if (!password) {
            return res.status(400).semd({ status: false, msg: "please enter password" })
        }
        let user = await authorModel.findOne({ email: email, password: password });
        if (!user) {
            return res.status(400).send({ status: false, msg: "email or password is incorrect" })
        }
        //..creating Token with the help of jwt................
        let token = jwt.sign({
        //..in payload i am passing authorId...................
            authorId: user._id.toString(),
            batch: "plutonium",
            organisation: "functionUp"
        },
        //..this is my secretKey.................................
            "yousufSanakusumAyaan"
        )
        return res.status(200).send({ status: true, msg: " you are successfully loggedin", data: token })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
//=================making api public=============
module.exports = { authorCreate, loginAuthor } 
