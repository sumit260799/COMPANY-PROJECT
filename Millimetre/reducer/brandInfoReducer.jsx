import {
  SET_BRAND_ID,
  BRAND_PRODUCTS,
  DELETE_PRODUCT,
} from "../actions/actions";
const brandInfoReducer = (state, action) => {
  if (action.type === SET_BRAND_ID) {
    return {
      ...state,
      brandId: action.payload,
    };
  }
  if (action.type === BRAND_PRODUCTS) {
    return {
      ...state,
      products: action.payload,
    };
  }
  if (action.type === DELETE_PRODUCT) {
    const tempCart = state.products.filter(
      (item) => item.productId !== action.payload
    );

    return { ...state, products: tempCart };
  }
};

export default brandInfoReducer;
