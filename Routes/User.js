const router = require("express").Router()
const { body, validationResult } = require("express-validator")
const User = require("../Models/Users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


// register Route
router.post("/register",
    body("email").isEmail().withMessage("Not a valid email"),
    body("password").isLength({ min: 6, max: 16 }).withMessage("Password should be between 6 to 16 charcters.")
    , async (req, res) => {

        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()[0].msg })
            }

            const { email, name, password } = req.body

            const if_User_Exists = await User.find({ email: email })

            console.log(if_User_Exists);

            if (if_User_Exists.length) {
                return res.status(400).json({ error: "no two users can have the same email id" })
            }

            const hashedPassword = await bcrypt.hash(password, 8)

            const newUser = await User.create({
                name: name,
                email: email,
                password: hashedPassword
            })

            res.status(201).json({
                status: "success",
                data: [newUser]
            })


        } catch (error) {

            res.status(400).json({ status: "Failed", errors: error.message })
        }

    })


// login Route
router.post("/login",
    body("email").isEmail().withMessage("Not a valid email"),
    body("password").isLength({ min: 6, max: 16 }).withMessage("Password should be between 6 to 16 charcters.")
    , async (req, res) => {

        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()[0].msg })
            }

            const { email, password } = req.body

            const getUser = await User.find({ email: email })


            if (getUser.length === 0) {
                return res.status(400).json({ error: "No user with this email exists" })
            }

            const matchPassword = await bcrypt.compare(password, getUser[0].password)


            if (!matchPassword) {
                return res.status(400).json({ error: "Invalid Credentaials" })
            }

            const payload = getUser[0]._id

            const token = jwt.sign({ payload: payload }, process.env.MY_JWT_SECRET)


            res.status(200).json({ status: "success", token: token })


        } catch (error) {

            res.status(400).json({ status: "Failed", errors: error.message })
        }

    })



module.exports = router