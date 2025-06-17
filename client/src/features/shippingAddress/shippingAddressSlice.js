import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Components/utils/axios";
import { toast } from "react-toastify";

export const addShippingAddress = createAsyncThunk(
  "shippingAddress/addShippingAddress",
  async (shippingAddressIdData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Login first, token not found");
      }

      const res = await API.post("address/add-shipping-address", shippingAddressIdData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(shippingAddressIdData)
      toast.success("ShippingAddress Added");
      return res.data.shippingAddress;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to add shippingAddress";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchShippingAddress = createAsyncThunk(
  "shippingAddress/fetchShippingAddress",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Login first, token not found");
      }

      const res = await API.get("address/fetch-shipping-Address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.shippingAddress;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch shippingAddresss";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateShippingAddress = createAsyncThunk(
  "shippingAddress/updateShippingAddress",
  async ({ id, data }) => {
    const token = localStorage.getItem("token");
    const res = await API.put(`address/update-shipping-address/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Shipping AddressUpdated");
    return res.data.updatedShippingAddress;


  }
);

export const deleteShippingAddress = createAsyncThunk(
  "shippingAddress/deleteShippingAddress",
  async (shippingAddressId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      await API.delete(`address/delete-shipping-address/${shippingAddressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("shippingAddress deleted");
      return shippingAddressId; // return id to remove from state
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


const shippingAddressSlice = createSlice({
  name: "shippingAddress",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearShippingAddress(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Payment
      .addCase(addShippingAddress.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addShippingAddress.fulfilled, (state, action) => {
        if (action.payload) {
          state.items.push(action.payload);
        }
        state.status = "succeeded";
      })
      .addCase(addShippingAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Fetch Payments
      .addCase(fetchShippingAddress.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchShippingAddress.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.status = "succeeded";
      })
      .addCase(fetchShippingAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      }).addCase(updateShippingAddress.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.status = "succeeded";
      }).addCase(deleteShippingAddress.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export const { clearShippingAddress } = shippingAddressSlice.actions;
export default shippingAddressSlice.reducer;
