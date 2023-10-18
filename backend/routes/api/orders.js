const express = require('express');
const router = express.Router();
const Order = require('../../models/Orders');

router.post('/checkout', async (req, res) => {
    try {
        const { userId, products, totalAmount } = req.body;

        // Validate user data, product data, and totalAmount here if needed
        
        const order = new Order({
            userId,
            products,
            totalAmount
        });

        await order.save();

        res.json({
            status: 'SUCCESS',
            message: 'Order placed successfully',
            data: order
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: 'FAILED',
            message: 'Failed to place order'
        });
    }
});

module.exports = router;
