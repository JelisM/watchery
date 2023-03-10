const Item = require('../../models/item');

module.exports = {
  index,
  show
};

async function index(req, res) {
  const items = await Item.find({}).sort('name').populate('collection').exec();
  // re-sort based upon the sortOrder of the populated categories
  items.sort((a, b) => a.collection.sortOrder - b.collection.sortOrder);
  res.json(items);
}

async function show(req, res) {
  const item = await Item.findById(req.params.id);
  res.json(item);
}
