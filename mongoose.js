const mongoose = require("mongoose");


require('./model')
module.exports = async function mongo(){
    mongoose.connect('mongodb+srv://xumoyun2001:NewParol1@cluster0.eacqn.mongodb.net/fullfillbot');
}