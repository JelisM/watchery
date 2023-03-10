const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const watchSchema = require('./watchSchema');

const lineItemSchema = new Schema({
    qty: { type: Number, default: 1 },
    watch: watchSchema
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

lineItemSchema.virtual('extPrice').get(function () {
    // 'this' keyword is bound to the lineItem document
    return this.qty * this.watch.price;
});

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

orderSchema.virtual('orderTotal').get(function () {
    return this.lineItems.reduce((total, watch) => total + watch.extPrice, 0);
});

orderSchema.virtual('orderQty').get(function () {
    return this.lineItems.reduce((total, watch) => total + watch.qty, 0);
});

orderSchema.virtual('orderId').get(function () {
    return this.id.slice(-6).toUpperCase();
});

orderSchema.statics.getCart = function (userId) {
    return this.findOneAndUpdate(
        // query object
        { user: userId, isPaid: false },
        // update doc - provides values when inserting
        { user: userId },
        // upsert option
        { upsert: true, new: true }
    );
};

// Instance method for adding an makeup to a cart (unpaid order)
orderSchema.methods.addWatchToCart = async function (watchId) {
    // 'this' keyword is bound to the cart (order doc)
    const cart = this;
    // Check if the item already exists in the cart
    const lineItem = cart.lineItems.find(lineItem => lineItem.watch._id.equals(watchId));
    if (lineItem) {
        // It already exists, so increase the qty
        lineItem.qty += 1;
    } else {
        // Note how the mongoose.model method behaves as a getter when passed one arg vs. two
        const Watch = mongoose.model('Watch');
        const watch = await Makeup.findById(watchId);
        // The qty of the new lineItem object being pushed in defaults to 1
        cart.lineItems.push({ watch });
    }
    // return the save() method's promise
    return cart.save();
};

// Instance method to set an makeup's qty in the cart
orderSchema.methods.setWatchQty = function (watchId, newQty) {
    // this keyword is bound to the cart (order doc)
    const cart = this;
    // Find the line item in the cart for the menu item
    const lineItem = cart.lineItems.find(lineItem => lineItem.watch._id.equals(watchId));
    if (lineItem && newQty <= 0) {
        // Calling remove, removes itself from the cart.lineItems array
        lineItem.remove();
    } else if (lineItem) {
        // Set the new qty - positive value is assured thanks to prev if
        lineItem.qty = newQty;
    }
    // return the save() method's promise
    return cart.save();
};



module.exports = mongoose.model('Order', orderSchema);