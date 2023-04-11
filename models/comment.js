const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
})

commentSchema.statics.getComment = function (commentId, newText, newRate) {
    console.log("Find one and update method is runnung on backend", commentId, newText, newRate)
    return this.findOneAndUpdate(
        //filter:
        { _id: commentId },
        // update:
        { text: newText, rate: newRate },
        // to return updated document
        { new: true }
    )
}

module.exports = mongoose.model('Comment', commentSchema);