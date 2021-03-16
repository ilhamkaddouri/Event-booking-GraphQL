const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name:{
        type: String,
        required :true
    },
    genre:{
        type: String,
        required: true
    },
    author:{
        type : Schema.Types.ObjectId,
        ref : "author"
    }
})

module.exports  = mongoose.model('book',BookSchema)