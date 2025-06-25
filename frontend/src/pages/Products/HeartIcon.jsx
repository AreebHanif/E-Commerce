import React, { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/favorite/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  removeFavoritesFromLocalStorage,
  getFavoriteFromLocalStorage,
} from "../../Utils/localStorage";

const HeartIcon = ({product}) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorites = favorites.some((item) => item._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoriteFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  },[]);

  const toggleFavorites = () => {
    if (isFavorites) {
      dispatch(removeFromFavorites(product));
    //   Also remove from local storage
      removeFavoritesFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
    //   Add Favorites to local Storage as well 
      addFavoriteToLocalStorage(product);
    }
  }

  return (
    <div onClick={toggleFavorites} className="absolute top-2 right-5 cursor-pointer">
      {isFavorites ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
};

export default HeartIcon;
