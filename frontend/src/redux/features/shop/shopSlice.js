import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    products: [],
    checked: [],
    radio: [],
    brandCheckBoxes: {},
    checkedBrands: [],
}

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setChecked: (state, action) => {
            state.checked = action.payload
        },
        setRadio: (state, action) => {
            state.radio = action.payload
        },
        setSelectedBrands: (state, action) => {
            state.categories = action.payload
        },
    }
})

export const { setCategories, setProducts, setChecked, setRadio, setSelectedBrands } = shopSlice.actions

export default shopSlice.reducer