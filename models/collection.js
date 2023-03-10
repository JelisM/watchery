const mongoose = require('mongoose')
const Schema= mongoose.Schema

const collectionSchema= new Schema({
    name:{type:String,
        require:true
    },
    sortOrder:Number
},{
    timestamps:true
}
)

module.exports=mongoose.model('Collection',collectionSchema)