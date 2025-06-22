import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Components/utils/axios";
import { toast } from "react-toastify";

export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("Login first, token not found");
            }

            const res = await API.post("order/place-order", orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Order placed successfully!");
            return res.data; // includes { message, orderId }
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Failed to place order";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders", // ✅ clearer
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("Login first, token not found");
            }

            const res = await API.get("order/fetch-orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Fetched Orders:", res.data);
            return res.data.orders; // ✅ make sure the backend is returning `orders`
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Failed to fetch orders";
            return rejectWithValue(message);
        }
    }
);

export const cancelOrder = createAsyncThunk(
    "order/cancelOrder", // 🔁 use lowercase action names for consistency
    async (orderId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token not found");

            const res = await API.post(`order/cancel-order/${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Order cancelled");
            return res.data.order; // 👈 This returns a single order (object)
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);



const orderSlice = createSlice({
    name: "order",
    initialState: {
        items: [],
        status: "idle", // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {
        clearOrders(state) {
            state.items = [];
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Add Payment
            .addCase(placeOrder.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                if (action.payload) {
                    state.items.push(action.payload);
                }
                state.status = "succeeded";
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })

            // Fetch Payments
            .addCase(fetchOrders.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.items = action.payload || [];
                state.status = "succeeded";
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            }).addCase(cancelOrder.fulfilled, (state, action) => {
            });
    },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
