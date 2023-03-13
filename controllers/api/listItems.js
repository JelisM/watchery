const PlannerListItem = require('../../models/plannerListItem');

module.exports = {
    create,
    index,
    remove,
    edit
}

async function create(req, res) {
    req.body.user = req.user._id;
    const listItem = await PlannerListItem.create(req.body);
    res.json(listItem);
}

async function index(req, res) {
    const listItems = await PlannerListItem.find({user: req.user._id}).sort('-updatedAt');
    res.json(listItems);
}

async function remove(req, res) {
    await PlannerListItem.findOneAndDelete({_id: req.params.id, user: req.user._id});
    const listItems = await PlannerListItem.find({user: req.user._id});
    res.json(listItems);
}

async function edit(req, res) {
    const updatedItem = await PlannerListItem.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true}
    );
    res.json(updatedItem);
}