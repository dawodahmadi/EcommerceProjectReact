import React, { useContext, useState } from 'react';
import { CartItemsContext } from '../../../../context/CartItemsContext';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './CartCard.css';

const CartCard = (props) => {
    let cartItems = useContext(CartItemsContext);
    const [size, setSize] = useState(props.item.size[0]);

    const handelQuantityIncrement = (event) => {
        cartItems.quantity(props.item.id, 'INC');
    };

    const handelQuantityDecrement = (event) => {
        if (props.item.itemQuantity > 1) {
            cartItems.quantity(props.item.id, 'DEC');
        }
    };

    const handelRemoveItem = () => {
        cartItems.removeItem(props.item);
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const imageUrl = props.item.image && props.item.image.length > 0 ? 
                     `https://shema-ecommerce.herokuapp.com/${props.item.category}/${props.item.image[0].filename}` : 
                     null; // Check if image exists before constructing URL

    return (
        <div className='cart__item__card'>
            <div className="cart__item__detail">
                <div className="cart__item__image">
                    {imageUrl && <img src={imageUrl} alt="item" className="item__image" />}
                </div>
                <div className="cart__item__name">{props.item.name}</div>
            </div>
            <div className="cart__item__quantity">
                <IconButton onClick={handelQuantityIncrement}>
                    <AddCircleIcon />
                </IconButton>
                <div type="text" name="quantity" className="quantity__input">{props.item.itemQuantity}</div>
                <IconButton onClick={handelQuantityDecrement}>
                    <RemoveCircleIcon fontSize='medium' />
                </IconButton>
            </div>
            <div className="product size">
                <Box sx={{ minWidth: 80 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Size</InputLabel>
                        <Select
                            value={size}
                            label="size"
                            onChange={handleSizeChange}
                        >
                            {props.item.size.map((size) => <MenuItem value={size}>{size}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className="cart__item__price">${props.item.price}</div>
            <div className="remove__item__icon">
                <IconButton>
                    <HighlightOffIcon onClick={handelRemoveItem} />
                </IconButton>
            </div>
        </div>
    );
}

export default CartCard;