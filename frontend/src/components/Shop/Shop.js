import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Shop.css'; 

const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the API
        axios.get('http://localhost:5000/api/products')
            .then(response => {
                setProducts(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <div className="shop__container">
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.imageURL} alt={product.name} className="product-image" />
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
