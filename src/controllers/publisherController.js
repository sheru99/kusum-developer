const publisherModel= require("../models/publisherModel")

const registerPublisher= async function (req, res) {
    let publisher = req.body
    let publisherCreated = await publisherModel.create(publisher)
    res.send({data: publisherCreated})
}

module.exports.registerPublisher= registerPublisher