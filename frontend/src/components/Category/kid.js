import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../ItemCard/ItemCard';

const Kid = () => {
  const [kidItems, setKidItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/category/kid')
      .then((response) => {
        setKidItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching kid products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="kid-container">
      <h1>Kid's Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="kid-items">
          {kidItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Kid;
