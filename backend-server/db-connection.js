require("dotenv/config");

const mongoose = require('mongoose');
const uri = process?.env?.DB_CONNECTION;

mongoose.connect(uri, (err) => {
    if (!err)
        console.log('MongoDB connection succeeded !');
    else
        console.log('Error in DB connection : ' + err);
});

module.exports = mongoose;