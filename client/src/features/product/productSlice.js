import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Components/utils/axios";
import { toast } from "react-toastify";

// --- Thunks ---
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("Login first, token not found");
      const res = await API.get("product/fetch-products");
      return res.data.products;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getTopProducts = createAsyncThunk(
  "product/getTopProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("Login first, token not found");
      const res = await API.get("product/get-top-products");
      return res.data.topRatedProducts;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// --- Slice ---
const productSlice = createSlice({
  name: "product",
  initialState: {
    all: [],
    top: [],
    status: {
      all: "idle",
      top: "idle"
    },
    error: null,
  },
  reducers: {
    clearProduct(state) {
      state.all = [];
      state.top = [];
      state.status.all = "idle";
      state.status.top = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // All Products
      .addCase(fetchProducts.pending, (state) => {
        state.status.all = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.all = action.payload;
        state.status.all = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status.all = "failed";
        state.error = action.payload || action.error.message;
      })

      // Top Products
      .addCase(getTopProducts.pending, (state) => {
        state.status.top = "loading";
        state.error = null;
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.top = action.payload;
        state.status.top = "succeeded";
      })
      .addCase(getTopProducts.rejected, (state, action) => {
        state.status.top = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
