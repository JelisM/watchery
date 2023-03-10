require('dotenv').config();
require('./config/database');

const Category = require('./models/collection');
const Item = require('./models/watch');

(async function() {
    await Collection.deleteMany({});
    const collections = await Collection.create([
      {name: 'Sandwiches', sortOrder: 10},
      {name: 'Seafood', sortOrder: 20},
      {name: 'Mexican', sortOrder: 30},
      {name: 'Italian', sortOrder: 40},
      {name: 'Sides', sortOrder: 50},
      {name: 'Desserts', sortOrder: 60},
      {name: 'Drinks', sortOrder: 70},
    ]);
  
    await Item.deleteMany({});
    const items = await Item.create([
      {name: 'Hamburger', emoji: '🍔', Collection: collections[0], price: 5.95},
      {name: 'Hamburger', emoji: '🍔', Collection: collections[0], price: 5.95},
      {name: 'Hamburger', emoji: '🍔', Collection: collections[0], price: 5.95},
      {name: 'Hamburger', emoji: '🍔', Collection: collections[0], price: 5.95},
      {name: 'Hamburger', emoji: '🍔', Collection: collections[0], price: 5.95},
      {name: 'Hamburger', emoji: '🍔', Collection: collections[0], price: 5.95},
      
    ]);
  
    console.log(items)
  
    process.exit();
  
  })();
  