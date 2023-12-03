import {
  SET_LOADING,
  GET_PRODUCTS,
  SET_ERROR,
  SEARCH_PRODUCT,
  UPDATE_SORT,
  UPDATE_FILTER,
  SORT_PRODUCTS,
  FILTER_PRODUCTS,
} from "../actions/actions";

const productsReducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_PRODUCTS) {
    return {
      ...state,
      mainProducts: action.payload,
      allProducts: action.payload,
      isLoading: false,
    };
  }
  if (action.type === SET_ERROR) {
    return {
      ...state,
      isError: true,
      isLoading: false,
    };
  }
  if (action.type === SEARCH_PRODUCT) {
    const searchItem = state.allProducts.filter((item) =>
      item.productName.toLowerCase().includes(action.payload.toLowerCase())
    );
    return {
      ...state,
      allProducts: searchItem,
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, mainProducts } = state;

    let tempProducts = [];

    if (sort === "priceLowToHigh") {
      tempProducts = mainProducts.sort(
        (a, b) => a.productPrice - b.productPrice
      );
    }

    if (sort === "priceHighToLow") {
      tempProducts = mainProducts.sort(
        (a, b) => b.productPrice - a.productPrice
      );
    }
    if (sort === "name(a-z)") {
      tempProducts = mainProducts.sort((a, b) => {
        return a.productName.localeCompare(b.productName);
      });
    }
    if (sort === "name(z-a)") {
      tempProducts = mainProducts.sort((a, b) => {
        return b.productName.localeCompare(a.productName);
      });
    }
    return { ...state, allProducts: tempProducts };
  }

  if (action.type === UPDATE_FILTER) {
    const { name, value } = action.payload;
    console.log(value);
    return {
      ...state,
      filters: { ...state.filters, [name]: value },
    };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { mainProducts } = state;
    const { text, productCategory, companyName } = state.filters;
    let tempProducts = [...mainProducts];
    if (text) {
      tempProducts = tempProducts.filter((item) => {
        const lowerText = text.toLowerCase();
        return (
          item.productName.toLowerCase().includes(lowerText) ||
          item.productPrice.toString().includes(lowerText) || // Search by productPrice
          item.productDesc.toLowerCase().includes(lowerText) // Search by productDesc
        );
      });
    }
    if (productCategory !== "all categories") {
      tempProducts = tempProducts.filter(
        (item) => item?.productCategory === productCategory
      );
    }
    if (companyName !== "all companies") {
      tempProducts = tempProducts.filter(
        (item) => item?.companyName === companyName
      );
    }
    return {
      ...state,
      allProducts: tempProducts,
    };
  }
  return state;
};

export default productsReducer;
