const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plannerListItemSchema = new Schema({
    listItemTitle: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    completed: {type: Boolean, default: false},
    listItemDate: {type: String, default: 'No date added yet'},
    listItemNote: {type: String, default: 'No notes added yet'},
   
}, {
    timestamps: true
})

module.exports = mongoose.model('PlannerListItem', plannerListItemSchema);