import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../Card/ItemCard/ItemCard';

const Women = () => {
  const [womenItems, setWomenItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/category/women')
      .then((response) => {
        setWomenItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching women products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="women-container">
      <h1>Women's Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="women-items">
          {womenItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Women;
