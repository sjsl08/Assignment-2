const mongoose = require("mongoose")

const DB_Name = "Assignment-2"

const connect_To_DB = () => {
    mongoose.set('strictQuery', true);
    return mongoose.connect(`mongodb://127.0.0.1:27017/${DB_Name}`).then(() => {
        console.log("Connected To Database!!!!");
    }).catch((err) => {
        console.log(err.message);
    })
}

module.exports = connect_To_DB;