const blogsModel = require("../models/blogsModel")
const authorModel = require("../models/authorModel")
const moment= require("moment")



//====================post api=========================================
const createBlogs = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data).length != 0) {
      let authorId = req.body.authorId
      if (!authorId) return res.status(400).send({ status: false, msg: "please provide authorId" })

      let authorid = await authorModel.findOne({ _id: data.authorId })
      if (!authorid) return res.status(400).send({ status: false, msg: "please provide valid author id " })
      let savedData = await blogsModel.create(data)
      return res.status(201).send({ status: true, data: savedData })
    } else {
      return res.status(400).send({ status: false, msg: "body is empty" })
    }



  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message })
  }
}
//=======================get api==========================================
const getBlogs = async function (req, res) {
  try {
    // Spreading query to pass all the filters in condition

    const check = await blogsModel.find({ ...req.query, isDeleted: false, isPublished: false });
    if (check.length == 0) return res.status(404).send({ status: false, msg: "No blogs found" })

    return res.status(200).send({ status: true, data: check });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
}
//=========================put api =============================
const updateBlog = async function (req, res) {
  try {
    let getId = req.params.blogId
    let data = req.body
    let checkId = await blogsModel.findOne({ _id: getId })
    console.log(checkId)
    if (checkId) {
      if (checkId.isDeleted === false) {
      
        let check = await blogsModel.findByIdAndUpdate(getId, { $push: { tags: data.tags, subcategory: data.subcategory }, title: data.title, body: data.body, category: data.category }, { new: true })
        res.status(200).send({ status: true, msg: check })
      }
      else {
        res.send("CANT UPDATE , IT IS DELETED")
      }
    }
    else {
      res.status(401).send({ status: false, msg: "Please enter valid Blog id" })
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
}
//=======================delete-api= ==============================
const deleteBlog = async function (req, res) {
  try {

    let data = req.params.blogId
    if (!data) {
      return res.status(403).send({ status: false, msg: "blogId is invalid" })
    }
    let deletes = await blogsModel.findOneAndUpdate({ _id: data }, { $set: { isDeleted: true } }, { new: true })
    return res.status(200).send({ status: true, msg: "User is Deleted", data: deletes })
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}
//===============================delete api by query param==============================
const deleteByQuery = async function (req, res) {
  try {
   let data = req.query
  
  console.log(data)
  let find = await blogsModel.findOne(data)
  console.log(find)
  if (!find) { 
    return res.status(404).send({ status: false, msg: "Blog is not created" })
   }
  if(find.isDeleted==true){
    return res.status(400).send({status:false,msg:"THIS DOCUMENT Is deleted"})
  }
  let saved = await blogsModel.findOneAndUpdate( data ,{ $set: { isDeleted: true}}, { new: true })
  res.status(200).send({ status: true, msg: saved })
} catch (error) {
    res.status(500).send({status:false,msg:error.message})
}
}




module.exports.createBlogs = createBlogs
module.exports.getBlogs = getBlogs
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteByQuery = deleteByQuery














// const updatedBlogs = async function (req, res) {
//   try {
//     let blog = req.body
//     if (!(blog.title || blog.body || blog.tags || blog.subcategory || blog.isPublished)) {
//       return res.status(400).send({ status: false, msg: "Invalid Filters" })
//     }
//     let blogId = req.params.blogId
//     if (!mongoose.Types.ObjectId.isValid(blogId)) {
//       return res.status(400).send({ status: false, msg: "Invalid Blog-Id" })
//     }
//     let blogData = await blogsModel.findById(blogId)
//     if (blogData.isDeleted == true) {
//       return res.status(404).send({ status: false, msg: "Data not found" })
//     }
//     console.log(blog.subcategory)
//     blogData.publishedAt = moment().format("DD-MM-YYYY, hh:mm a")

//     let updatedBlog = await blogsModel.findByIdAndUpdate(
//       { _id: blogId },
//       { $addToSet: { tags: blog.tags, subcategory: blog.subcategory }, $set: { title: blog.title, body: blog.body } },
//       { new: true }

//     )
//     return res.status(200).send({ status: true, updatedData: updatedBlog })

//   }
//   catch (error) {
//     return res.status(500).send({ status: false, msg: error.message });
//   }
// }

// module.exports.updatedBlogs = updatedBlogs


