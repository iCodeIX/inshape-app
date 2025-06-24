import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Components/utils/axios";
import { toast } from "react-toastify";


export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (_, { rejectWithValue }) => {

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("Login first, token  not found");
            }

            const res = await API.get("product/fetch-products");
            console.log(res.data.products);
            return res.data.products;

        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Failed to add payment";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);


const productSlice = createSlice({
    name: "product",
    initialState: {
        items: [],
        status: "idle", // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {
        clearProduct(state) {
            state.items = [];
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Add Payment
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {

                state.items = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            });
    },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
