import { createContext, useState } from "react";

export const WishItemsContext = createContext({
    items: [],
    addItem: () => {},
});

export const WishItemsProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        setItems([...items, item]);
    };

    return (
        <WishItemsContext.Provider value={{ items, addItem }}>
            {children}
        </WishItemsContext.Provider>
    );
};
