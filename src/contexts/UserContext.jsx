import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartUpdated, setCartUpdated] = useState(false);

    const loginUser = () => {
        setIsLoggedIn(true);
    };

    const logoutUser = () => {
        setIsLoggedIn(false);
    };

    const updateCart = () => {
        setCartUpdated(prev => !prev);
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, loginUser, logoutUser, cartUpdated, updateCart }}>
            {children}
        </UserContext.Provider>
    );
};
