const mongoose = require("mongoose")



const PostSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user:{
        type : mongoose.Types.ObjectId,
        ref: "User"
    }
})

const Post = mongoose.model("Posts", PostSchema)

module.exports = Post;