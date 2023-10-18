const express = require('express');
const router = express.Router();
const wishlistController = require('../../controllers/Wishlist');

router.post('/wishlist', wishlistController.addToWishlist);
router.get('/wishlist/:userId', wishlistController.getWishlist);
router.put('/wishlist/:userId/:wishlistItemId', wishlistController.updateWishlistItem);
router.delete('/wishlist/:wishlistItemId', wishlistController.removeFromWishlist);

module.exports = router;
