import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../Components/utils/axios';
import { toast } from 'react-toastify';

//async thunk to add cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity }) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error('Not authenticated. Please log in.');
            }
            const res = await API.post(
                '/cart/add',
                { productId, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success('Item added to cart');
            console.log(res.data.items);
            return res.data.items;

        } catch (err) {
            toast.error(err.response?.data?.message || 'Error adding to cart');
        }
    }
);


// Async thunk to fetch cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const res = await API.get('/cart/fetch-cart');
    return res.data.items;
});

// Async thunk to update quantity
export const updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async ({ productId, quantity }) => {
        const res = await API.post('/cart/update-quantity', { productId, quantity });
        console.log(res.data.items);
        return res.data.items;
    }
);

export const removeItem = createAsyncThunk(
    'cart/removeItem',
    async ({ productId }, { rejectWithValue }) => {
        try {

            const token = localStorage.getItem("token");
            const res = await API.delete('/cart/remove-item', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // if needed
                },
                data: { productId },
            });
            return res.data.items; // or whatever structure your backend returns
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Server error');
        }
    }
);


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearCart(state) {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            }).addCase(removeItem.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';

            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';

            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
