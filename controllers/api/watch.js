const Item = require('../../models/watch');

module.exports = {
  index,
  show
};

async function index(req, res) {
  const watches = await Watch.find({}).sort('name').populate('collection').exec();
  // re-sort based upon the sortOrder of the populated categories
  watches.sort((a, b) => a.collection.sortOrder - b.collection.sortOrder);
  res.json(watches);
}

async function show(req, res) {
  const watch = await Watch.findById(req.params.id);
  res.json(watch);
}
