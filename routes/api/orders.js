const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders');

// GET /api/orders/cart
router.get('/cart', ordersCtrl.cart);
//GET /api/orders
router.get('/', ordersCtrl.getAllForUser);
// POST /api/orders/cart/makeup/:id
router.post('/cart/watches/:id', ordersCtrl.addWatchToCart);
// POST /api/orders/cart/checkout
router.post('/cart/checkout', ordersCtrl.checkout);
// POST /api/orders/cart/qty
router.put('/cart/qty', ordersCtrl.setWatchQtyInCart);


module.exports = router;