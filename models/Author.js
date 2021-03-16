const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name:{
        type: String,
        required :true
    },
    age:{
        type: Number,
        required: true
    },
    book:[{
        type : Schema.Types.ObjectId,
        ref : "book"
    }]
})

module.exports  = mongoose.model('author',AuthorSchema)