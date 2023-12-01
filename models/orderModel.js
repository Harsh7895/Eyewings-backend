const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        // Add other address-related fields as needed
    },
    orderStatus: {
        type: String, // You can define different order statuses (e.g., 'completed', 'shipped', 'pending', etc.)
        required: true,
    },
    // You can include additional fields such as timestamps, payment details, etc.
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
