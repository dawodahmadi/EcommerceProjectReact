import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Category/Category.css';
import ItemCard from '../Card/ItemCard/ItemCard';
import { Button } from '@mui/material';

const Category = (props) => {
    const [items, setItems] = useState([]);
    const [show, setShow] = useState('All');
    const [filter, setFilter] = useState('Latest');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/category/${props.category}`);
                setItems(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            // Cleanup function if needed
        };
    }, [props.category]);

    return ( 
        <div className="category__container">
            {/* Your existing code */}
            <div className="category__card__container">
                <div className="category__product__card">
                    {items.map((data) => <ItemCard item={data} category={props.category} />)}
                    {/* <div className="show__more__action">
                        <Button variant='outlined' sx={[{width: '200px', height: '50px', borderRadius: '20px', fontWeight: '700', backgroundColor: '#FFE26E', borderColor: '#FFE26E', color: 'black'}, {'&:hover': {borderColor: '#FFE26E', backgroundColor: "none"}}]}>Show more</Button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Category;
