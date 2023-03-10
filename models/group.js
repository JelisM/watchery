const mongoose = require('mongoose')
const Schema= mongoose.Schema

const groupSchema= new Schema({
    name:{type:String,
        require:true
    },
    sortOrder:Number
},{
    timestamps:true
}
)

module.exports=mongoose.model('Group',groupSchema)