import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Components/utils/axios";
import { toast } from "react-toastify";

export const addPaymentMethod = createAsyncThunk(
  "payment/addPaymentMethod",
  async (paymentData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Login first, token not found");
      }

      const res = await API.post("payment/add-payment-method", paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Payment Added");
      return res.data.payment;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to add payment";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchPaymentMethods = createAsyncThunk(
  "payment/fetchPaymentMethods",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Login first, token not found");
      }

      const res = await API.get("payment/fetch-payment-methods", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.payments;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch payments";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deletePaymentMethod = createAsyncThunk(
  "payment/deletePaymentMethod",
  async (paymentId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      await API.delete(`payment/delete-payment-method/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Payment deleted");
      return paymentId; // return id to remove from state
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updatePaymentMethod = createAsyncThunk(
  "payment/updatePaymentMethod",
  async ({ id, data }) => {
    const token = localStorage.getItem("token");
    const res = await API.put(`payment/update-payment-method/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Payment Updated");
    return res.data.updatedPayment;
  }
);



const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearPayment(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Payment
      .addCase(addPaymentMethod.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addPaymentMethod.fulfilled, (state, action) => {
        if (action.payload) {
          state.items.push(action.payload);
        }
        state.status = "succeeded";
      })
      .addCase(addPaymentMethod.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Fetch Payments
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.status = "succeeded";
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      }).addCase(deletePaymentMethod.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      }).addCase(updatePaymentMethod.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.status = "succeeded";
      });
  },
});

export const { clearPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
