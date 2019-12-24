import mongoose from "mongoose";

const conn = mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

module.exports = conn;
