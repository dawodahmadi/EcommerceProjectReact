import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../Card/ItemCard/ItemCard';

const Men = () => {
  const [menItems, setMenItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/category/men')
      .then((response) => {
        setMenItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching men products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="men-container">
      <h1>Men's Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="men-items">
          {menItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Men;
