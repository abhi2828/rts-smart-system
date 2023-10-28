import { createSlice } from '@reduxjs/toolkit';

export type Product = {
  value: string;
  price: number;
  product_id: string;
  order: number;
  optional_product: boolean;
  change_quantity: boolean;
  default_product: boolean;
  disabled: boolean;
  label: string;
  id: number;
};

export type Products = {
  products: Product[];
};

// initial state
const initialState: Products = {
  products: [],
};

export const productSlice = createSlice({
  name: 'productsFromEditor',
  initialState,
  reducers: {
    // to add new product
    addProduct(state, action) {
      const tempObj = [...state.products];
      tempObj.push(action.payload);
      state.products = tempObj;
    },

    removeProducts(state) {
      state.products = [];
    },
    // to set value
    setProductValue(
      state,
      action: {
        payload: {
          index: number;
          data: {
            label: string;
            price: number;
            product_id: string;
            order: number;
            optional_product: boolean;
            change_quantity: boolean;
            disabled: boolean;
            default_product: boolean;
            id: number;
            value: string;
          };
        };
      }
    ) {
      const index = action.payload.index;
      const productIndex = state.products[index];
      if (productIndex) {
        productIndex.label = action.payload.data.label;
        productIndex.value = action.payload.data.value;
        productIndex.id = action.payload.data.id;
        productIndex.price = action.payload.data.price;
        productIndex.product_id = action.payload.data.product_id;
        productIndex.change_quantity = action.payload.data.change_quantity;
        productIndex.order = action.payload.data.order;
        productIndex.optional_product = action.payload.data.optional_product;
        productIndex.disabled = action.payload.data.disabled;
        productIndex.default_product = action.payload.data.default_product;
      }
    },
    // to delete product
    deleteProducts(state, action) {
      state.products.splice(action.payload.index, 1);
    },
    // to allow change quantity
    changeProductQuantity(
      state,
      action: {
        payload: {
          index: number;
        };
      }
    ) {
      const index = action.payload.index;
      const productIndex = state.products[index];
      if (productIndex) {
        if (productIndex.change_quantity === false) {
          productIndex.change_quantity = true;
        } else {
          productIndex.change_quantity = false;
        }
      }
    },
    // make product default
    makeDefaultProduct(
      state,
      action: { payload: { index: number; default_product: boolean } }
    ) {
      state.products.forEach((item, subIndex) => {
        if (action.payload.default_product) {
          if (action.payload.index === subIndex) {
            item.default_product = true;
            item.optional_product = true;
          } else {
            item.default_product = false;
          }
        }
      });
    },
    // to make product optional
    optionalProduct(
      state,
      action: {
        payload: {
          index: number;
          optional_product: boolean;
          showProductDropdown: boolean;
        };
      }
    ) {
      state.products.forEach((item, subIndex) => {
        if (action.payload.showProductDropdown) {
          if (action.payload.optional_product) {
            if (action.payload.index === subIndex) {
              item.optional_product = true;
            }
          } else {
            if (action.payload.index === subIndex) {
              if (item.default_product) {
                item.optional_product = true;
              } else {
                item.optional_product = false;
              }
            }
          }
        } else {
          item.optional_product = action.payload.optional_product;
        }
      });
    },

    displayDefinedProducts(
      state,
      action: {
        payload: Product[];
      }
    ) {
      state.products = action.payload;
    },

    updateProducts(
      state,
      action: {
        payload: {
          productData: Product[];
        };
      }
    ) {
      state.products = action.payload.productData;
    },
    makeAllProductsOptional(state) {
      state.products.forEach(item => {
        item.optional_product = true;
      });
    },
    makeAllProductsNonOptional(state) {
      state.products.forEach(item => {
        item.optional_product = false;
      });
    },
    makeFirstProductDefault(state) {
      state.products.forEach((item, index) => {
        if (index === 0) {
          item.default_product = true;
        }
      });
    },
    deleteAllProductsTemporary(state) {
      state.products = [];
    },
  },
});

export const {
  addProduct,
  setProductValue,
  deleteProducts,
  changeProductQuantity,
  optionalProduct,
  makeDefaultProduct,
  removeProducts,
  displayDefinedProducts,
  makeAllProductsOptional,
  makeFirstProductDefault,
  deleteAllProductsTemporary,
  makeAllProductsNonOptional,
  updateProducts,
} = productSlice.actions;
export default productSlice.reducer;
