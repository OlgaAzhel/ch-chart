
const { redirect } = require('react-router-dom')
const Comment = require('../../models/comment')

module.exports = {
    show,
    create,
    delete: deleteComment,
    edit
}

function show(req, res) {
    console.log("SHOW IS RUNNING ON SERVER...")
    Comment.find({}, function (err, comments) {
        res.json(comments)
        console.log("Comments:", typeof(comments), comments)
    })
}

function create(req, res) {

    console.log("Comment create running...", req.body.text)
    // Add the Note to the database
    const note = new Comment(req.body)
    note.save(function (err, comment) {
        res.json(comment)
        console.log("New Comment:", comment)
    })

}

function deleteComment(req,res){
    Comment.deleteOne({ _id: req.body._id }, function (err, comment) {
        res.json(comment)
    })
}


async function edit(req,res) {
    console.log("UPDATE COMMENT IS RUNNING", req.body.id, req.body.text)
    const comment = await Comment.getComment(req.body.id, req.body.text, req.body.rate)
    res.json(comment)
}