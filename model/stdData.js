const mongoose=require('mongoose')
const Schema=mongoose.Schema

const stdData = new Schema({
  name: String,
  email: String,
  contact:Number,
  eng: Number,
  guj: Number,
  maths: Number,
});

const student=mongoose.model('result',stdData)

module.exports=student