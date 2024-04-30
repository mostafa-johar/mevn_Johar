const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema(
    {
        
        title :{
            type : String,
            required : true
        },
        slug :{
            type : String,
            // required : true
        },
        thumbnail :{
            type : String,
            // required : true
        },
        description :{
            type : String,
            // required : true
        },
        stars :{
            type : Number,
            // required : true
        },
        category :{
            type : Array,
            // required : true
        }

    },{
        timestamps : true
    }   

)

module.exports = mongoose.model('Book',BookSchema)