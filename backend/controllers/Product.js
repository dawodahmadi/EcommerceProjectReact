const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { name, description, price, imageURL, category } = req.body;

        // Check if the category is valid
        if (!['men', 'women', 'kid'].includes(category)) {
            return res.json({
                status: 'FAILED',
                message: 'Invalid category provided'
            });
        }

        const product = new Product({
            name,
            description,
            price,
            imageURL,
            category
            // Add other fields if necessary
        });

        await product.save();
        res.json({
            status: 'SUCCESS',
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: 'FAILED',
            message: 'Failed to create product'
        });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (!products || products.length === 0) {
            return res.json({
                status: 'SUCCESS',
                message: 'No products found',
                data: []
            });
        }

        res.json({
            status: 'SUCCESS',
            message: 'Products retrieved successfully',
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'FAILED',
            message: 'Failed to retrieve products'
        });
    }
};


const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        // Validate if the provided ID is a valid MongoDB ObjectID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: 'FAILED',
                message: 'Invalid product ID'
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.json({
                status: 'FAILED',
                message: 'Product not found'
            });
        }

        res.json({
            status: 'SUCCESS',
            message: 'Product retrieved successfully',
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'FAILED',
            message: 'Failed to retrieve product'
        });
    }
};



const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProductData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, {
            new: true, // Return the updated product
            runValidators: true // Run validators to ensure updated data is valid
        });

        if (!updatedProduct) {
            return res.json({
                status: 'FAILED',
                message: 'Product not found'
            });
        }

        res.json({
            status: 'SUCCESS',
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: 'FAILED',
            message: 'Failed to update product'
        });
    }
};



const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.json({
                status: 'FAILED',
                message: 'Product not found'
            });
        }

        res.json({
            status: 'SUCCESS',
            message: 'Product deleted successfully',
            data: deletedProduct
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: 'FAILED',
            message: 'Failed to delete product'
        });
    }
};


const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category: category });

        res.json({
            status: 'SUCCESS',
            message: 'Products retrieved successfully',
            data: products
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: 'FAILED',
            message: 'Failed to retrieve products by category'
        });
    }
};

module.exports = {
    createProduct,getAllProducts,getProductById,updateProduct,deleteProduct,getProductsByCategory
};
