import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = import.meta.env.VITE_USER_API_URL;
const initialState = {
  productsData: [],
  filterData: JSON.parse(sessionStorage.getItem("filteredData")) || [],
  searchFilterData: [],
  singleProduct: JSON.parse(sessionStorage.getItem("singleProduct")) || [],
  searchData: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "fetchData",
  async (secondPart, { rejectWithValue }) => {
    try {
      // Make an API call using secondPart
      const response = await fetch(`${url}products/${secondPart}`);
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.productsData = action.payload;
        state.searchData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
  reducers: {
    filterByCategory(state, action) {
      try {
        const filter = state.productsData.filter(
          (product) => product.productCategory === action.payload
        );
        state.filterData = filter;
        state.searchFilterData = filter;

        sessionStorage.setItem("filteredData", JSON.stringify(filter));
      } catch (err) {
        return err;
      }
    },
    singleProduct(state, action) {
      try {
        const oneProduct = state.productsData?.filter(
          (product) => product.productId === action.payload
        );
        state.singleProduct = oneProduct;

        sessionStorage.setItem("singleProduct", JSON.stringify(oneProduct));
      } catch (err) {
        return err;
      }
    },
    searchProduct(state, action) {
      const findData = state.productsData.filter(
        (item) =>
          item.productName
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          item.productDesc
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          item.productPrice.toString().includes(action.payload.toString())
      );
      const findFilterData = state.searchFilterData.filter(
        (item) =>
          item.productName
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          item.productDesc
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          item.productPrice.toString().includes(action.payload.toString())
      );
      state.filterData = findFilterData;
      state.searchData = findData;
    },
  },
});

export const { filterByCategory, singleProduct, searchProduct } =
  dataSlice.actions;
export default dataSlice.reducer;
