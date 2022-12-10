const express = require("express")
const connect_To_DB = require("./DB Connect/Connect Database")
const dotenv = require("dotenv")


// config the .env file
dotenv.config()



const app = express();

app.use(express.json({ limit: "10mb" }))


// routes

app.use("",require("./Routes/User"))
app.use("",require("./Routes/Posts"))




// connect to database and make a port to listen

app.listen(3000, async () => {

    await connect_To_DB()
    console.log("Server up at 3000");

})