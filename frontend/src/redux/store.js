import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './Api/apiSlice';
import authReducer from './features/auth/authSlice';
import favoriteReducer from "../redux/favorite/favoriteSlice";
import { getFavoriteFromLocalStorage } from "../Utils/localStorage"
import cartSliceReducer from "../redux/features/cart/cartSlice"
import shopReducer from "../redux/features/shop/shopSlice"

const initialFavorites = getFavoriteFromLocalStorage() || []

const store = configureStore({

    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoriteReducer,
        cart: cartSliceReducer,
        shop: shopReducer,
    },
    preloadedState: { favorites: initialFavorites },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;