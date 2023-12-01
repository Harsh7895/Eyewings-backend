const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
    },
    amount: {
        type: Number, // Payment amount
        required: true,
    },
    razorpay_order_id: {
        type: String, // Payment gateway ID
        required: true,
    },
    razorpay_payment_id: {
        type: String, // Payment gateway ID
        required: true,
    },
    // Add other payment-related fields as needed
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
