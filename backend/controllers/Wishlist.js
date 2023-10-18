const Wishlist = require("../models/wishlist.js")

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const wishlist = await Wishlist.findOne({ userId });
    
    if (!wishlist) {
      // If the user's wishlist doesn't exist, create a new one
      const newWishlist = new Wishlist({
        userId,
        wishlistItems: [{ productId, quantity }]
      });
      await newWishlist.save();
      res.json({
        status: 'SUCCESS',
        message: 'Product added to wishlist successfully',
        data: newWishlist
      });
    } else {
      // If the user's wishlist exists, update the existing wishlist
      const existingItem = wishlist.wishlistItems.find(item => item.productId === productId);
      if (existingItem) {
        // If the product is already in the wishlist, update its quantity
        existingItem.quantity += quantity;
      } else {
        // If the product is not in the wishlist, add it
        wishlist.wishlistItems.push({ productId, quantity });
      }
      await wishlist.save();
      res.json({
        status: 'SUCCESS',
        message: 'Product added to wishlist successfully',
        data: wishlist
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      status: 'FAILED',
      message: 'Failed to add product to wishlist'
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const wishlist = await Wishlist.findOne({ userId }).populate('wishlistItems.productId');
    if (!wishlist) {
      res.json({
        status: 'SUCCESS',
        message: 'Wishlist is empty',
        data: []
      });
    } else {
      res.json({
        status: 'SUCCESS',
        message: 'Wishlist retrieved successfully',
        data: wishlist.wishlistItems
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      status: 'FAILED',
      message: 'Failed to retrieve wishlist'
    });
  }
};

const updateWishlistItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.json({
        status: 'FAILED',
        message: 'Wishlist not found for the user'
      });
    }

    const wishlistItemId = req.params.wishlistItemId;
    const { quantity } = req.body;

    const wishlistItem = wishlist.wishlistItems.find(item => item._id.toString() === wishlistItemId);
    if (!wishlistItem) {
      return res.json({
        status: 'FAILED',
        message: 'Wishlist item not found'
      });
    }

    wishlistItem.quantity = quantity;
    await wishlist.save();
    res.json({
      status: 'SUCCESS',
      message: 'Wishlist item updated successfully',
      data: wishlistItem
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 'FAILED',
      message: 'Failed to update wishlist item'
    });
  }
};


const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const wishlist = await Wishlist.findOne({ userId });
    const wishlistItemId = req.params.wishlistItemId;

    wishlist.wishlistItems = wishlist.wishlistItems.filter(item => item._id.toString() !== wishlistItemId);
    await wishlist.save();
    res.json({
      status: 'SUCCESS',
      message: 'Wishlist item removed successfully',
      data: wishlist.wishlistItems
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 'FAILED',
      message: 'Failed to remove wishlist item'
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  updateWishlistItem,
  removeFromWishlist
};
