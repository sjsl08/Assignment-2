const router = require("express").Router()
const JWT_AUTH = require("../Middleware/Auth")
const Post = require("../Models/Posts")



// get all posts
router.get("/posts", JWT_AUTH, async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({ status: "Failure", error: error.message })
    }
})


// create a new post
router.post("/posts", JWT_AUTH, async (req, res) => {
    try {

        const { title, body, image } = req.body
        const post = await Post.create({
            title: title,
            body, body,
            image: image,
            user: res.user
        })
        res.status(200).json({ status: "Post Created", data: [post] })
    } catch (error) {
        res.status(400).json({ status: "Failure", error: error.message })
    }
})



// edit / update a post 
router.put("/posts/:postId", JWT_AUTH, async (req, res) => {
    try {

        const { postId } = req.params
        const { title, body, image } = req.body

        const posts = await Post.findOneAndUpdate({ $and: [{ user: res.user }, { _id: postId }] }, req.body)

        if (posts === null) {
            return res.status(400).json({ ststus: "Cannot modify others posts" })
        }

        res.status(200).json({ status: "Success" })
    } catch (error) {
        res.status(400).json({ status: "Failure", error: error.message })
    }
})



// delete a post
router.delete("/posts/:postId", JWT_AUTH, async (req, res) => {
    try {
        const { postId } = req.params
        const deleted = await Post.findOneAndDelete({ $and: [{ user: res.user }, { _id: postId }] })

        if (deleted === null) {
            return res.status(400).json({ status: "you don't have any post with this id" })
        }
        res.status(200).json({ status: "Successfully Deleted" })
    } catch (error) {
        res.status(400).json({ status: "Failure", error: error.message })
    }
})




module.exports = router