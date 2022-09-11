const blogsModel = require("../models/blogsModel")
const authorModel = require("../models/authorModel")
const moment=require("moment")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId



//====================post api=========================================
const createBlogs = async function (req, res) {
  try {
    let { title, body, category, subcategory, authorId } = req.body
    if (Object.keys(req.body).length != 0) {
      if (!title) {
        return res.status(400).send({ status: false, msg: "Title field is required" })
      }
      if (!body) {
        return res.status(400).send({ status: false, msg: "Body field is required" })
      }
      if (!category) {
        return res.status(400).send({ status: false, msg: "Categoryfield is required" })
      }
      if (!subcategory) {
        return res.status(400).send({ status: false, msg: "Subcategory field is required" })
      }

      if (!authorId) return res.status(400).send({ status: false, msg: "please provide authorId" })

      if (req.validToken.authorId != req.body.authorId) return res.status(403).send({ status: false, msg: "You are not Authorised to this task" })

      let authorid = await authorModel.findOne({ _id: req.body.authorId })
      if (!authorid) return res.status(400).send({ status: false, msg: "please provide valid author id " })
      let savedData = await blogsModel.create(req.body)
      return res.status(201).send({ status: true, data: savedData })
    } else {
      return res.status(400).send({ status: false, msg: "no data to create blog" })
    }
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message })
  }
}
//=======================get api==========================================
const getBlogs = async function (req, res) {
  try {

    let authorId = req.query.authorId;
//.............checking author id length.................................
    if (authorId && !ObjectId.isValid(authorId)) {
      return res
        .status(400)
        .send({ status: false, msg: `this authorId ${authorId} is not valid` });
    }
    // Spreading query to pass all the filters in condition
    const check = await blogsModel.find({ ...req.query, isDeleted: false, isPublished: false })
    if (check.length == 0) return res.status(404).send({ status: false, msg: "No blogs found" })

    if (req.validToken.authorId != req.query.authorId) return res.status(403).send({ status: false, msg: " Yo are not authorised to this task" })
    return res.status(200).send({ status: true, data: check });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
}
//..............................update................................
const updateBlog = async function (req, res) {
  try {

    let data = req.body
    let blogId = req.params.blogId
    //..............checking if the body is empty or not....................
    if (Object.keys(data).length == 0)
      return res.status(404).send({ msg: "No data for Update " })
    //.............checking author id length.................................
    if (!mongoose.isValidObjectId(blogId))
      return res.status(400).send({ Status: false, message: `Please enter valid blogId ${blogId} ` })
    //.................matching blogId in blogs collection........................
    let findblog = await blogsModel.findById(blogId)
    if (!findblog)
      return res.status(404).send({ msg: "blogId  is invalid " })
    //..................checking if the isDeleted key is true or not......................   
    if (findblog.isDeleted == true)
      return res.status(404).send({ msg: "Blog is already deleted and cannot update " })
    //.................middleware passes the control to handler....................
    if (req.validToken.authorId != findblog.authorId) return res.status(403).send({ status: false, msg: "You are not Authorised to this task" })

    if (findblog.isDeleted == false) {
      let updatedBlog = await blogsModel.findOneAndUpdate({ _id: blogId }, {
        $set: {
          title: data.title,
          body: data.body,
          publishedAt: moment(). format('YYYY-MM-DD'),
          isPublished: true
        },
    //......i used push method because tags key and subcategory keys is inside in array
        $push: {
          tags: data.tags,
          subcategory: data.subcategory
        }
      }, { new: true, upsert: true })
      return res.status(200).send({ status: true, data: updatedBlog })
    }

  }
  catch (error) {
    res.status(500).send({ status: false, error: error.message })
  }
}
//=======================delete-api by path params==========================================
const deleteBlog = async function (req, res) {
  try {

    let data = req.params.blogId
    if (!mongoose.isValidObjectId(data))
      return res.status(400).send({ Status: false, message: `Please enter valid blogId ${data} ` })

    if (!data) {
      return res.status(403).send({ status: false, msg: "blog id is not present in params" })
    }
    let find = await blogsModel.findOne({ _id: data })
    if (!find) {
      return res.status(404).send({ status: false, msg: "blog does not exits" })
    }
    if (find.isDeleted == true) {
      return res.status(400).send({ status: false, msg: "this document is already deleted" })
    }
    //.................middleware passes the control to handler....................
    if (req.validToken.authorId !== find.authorId.toString()) return res.status(403).send({ status: false, msg: "Not Authorised" })

    //.................updating the isDeleted key and deletedAt key.................
    let deletes = await blogsModel.findOneAndUpdate({ _id: data }, { $set: { isDeleted: true, deletedAt: "07/09/2022" } }, { new: true })

    return res.status(200).send({ status: false, data: "User has been deleted successfully!" })
  //..if there is any error inside in the try block then catch block throws the error
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}
//===============================delete api by query param==============================
const deleteByQuery = async function (req, res) {
  try {

    let data = req.query
    let authorId = req.query.authorId;
       //..............checking if the body is empty or not....................
       if (Object.keys(data).length == 0)
       return res.status(404).send({ msg: "query param is empty" })
       //............verifying the legnth of authorId..........................
    if (authorId && !ObjectId.isValid(authorId)) {
      return res
        .status(400)
        .send({ status: false, msg: `this authorId ${authorId} is not valid` });
    }
    let find = await blogsModel.findOne(data)

    if (!find) {
      return res.status(404).send({ status: false, msg: "Blog is not exits" })
    }
    if (find.isDeleted == true) {
      return res.status(400).send({ status: false, msg: "this document is already deleted" })
    }

    if (req.validToken.authorId !== find.authorId.toString()) return res.status(403).send({ status: false, msg: "you are Not Authorised to task" })

    let saved = await blogsModel.findOneAndUpdate(data, { $set: { isDeleted: true }, deletedAt:moment(). format('YYYY-MM-DD') }, { new: true })

    return res.status(200).send({ status: true, msg: "user is successfully deleted",data:saved })

  } catch (error) {

     return res.status(500).send({ status: false, msg: error.message })
  }

}

//.........................Making apis Public..................................
module.exports = {createBlogs,getBlogs, updateBlog, deleteBlog, deleteByQuery }


















