//Add a product to a local storage
export const addFavoriteToLocalStorage = (Product) => {
    const favorits = getFavoriteFromLocalStorage()
    if(!favorits.some((p) => p._id === Product._id)){
        favorits.push(Product)
            localStorage.setItem("favorits", JSON.stringify(favorits))
    }
}
//Remove a product from a local storage
export const removeFavoritesFromLocalStorage = (productId) => {
    const favorites = getFavoriteFromLocalStorage()
    const updatedFavorites = favorites.filter((product) => product._id !== productId)
    localStorage.setItem("favorits", JSON.stringify(updatedFavorites))
}

//Get all products from local storage
export const getFavoriteFromLocalStorage = () => {
    const favoriteJson = localStorage.getItem("favorits")
    return favoriteJson ? JSON.parse(favoriteJson) : []
}
