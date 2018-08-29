/* eslint-disable import/no-extraneous-dependencies, no-shadow, no-underscore-dangle, no-mixed-operators, no-plusplus, no-param-reassign */

import { productsAllWithWholeObject, productsAllPricePreTax, productsAllPriceVATAmount, productsAllPricePostTax, shippingFeesAmount } from '@store/utils';

const state = {
  added: [],
  checkoutStatus: null,
};

const getters = {
  cartCheckoutStatus: state => state.checkoutStatus,
  cartProductsAll: (state, getters, rootState) => productsAllWithWholeObject(state.added, rootState),
  cartProductsAllQuantity: (state, getters) => getters.cartProductsAll.reduce((total, product) => total + product.quantity, 0),
  cartProductsAllPricePreTax: (state, getters) => productsAllPricePreTax(getters.cartProductsAll),
  cartProductsAllPriceVATAmount: (state, getters, rootState, rootGetters) => productsAllPriceVATAmount(getters.cartProductsAll, rootGetters),
  cartProductsAllPricePostTax: (state, getters, rootState, rootGetters) => productsAllPricePostTax(getters.cartProductsAll, rootGetters),
  cartShippingFeesAmount: (state, getters) => shippingFeesAmount({
    shippingPostalMethodsAll: getters.shopDeliveryTypesAll.shipping_postal.methods,
    productsAllPricePreTax: getters.cartProductsAllPricePreTax,
    productsAllQuantity: getters.cartProductsAllQuantity,
  }),
};

const actions = {
  addProductToCart({ state, commit }, product) {
    commit('setCartCheckoutStatus', null);
    if (product.inventory === true) {
      const cartItem = state.added.find(item => item._id === product._id);
      if (!cartItem) {
        commit('pushProductToCart', { _id: product._id });
      } else {
        commit('incrementProductQuantity', cartItem);
      }
      // remove 1 product from stock
      // commit('decrementProductInventory', { _id: product._id })
    }
  },

  removeProductFromCart({ state, commit }, cartProduct) {
    // commit('setCartCheckoutStatus', null)
    const cartItemIndex = state.added.findIndex(item => item._id === cartProduct._id);

    if (cartProduct.quantity > 1) {
      commit('decrementProductQuantity', cartProduct);
    } else {
      commit('removeProductFromCart', cartItemIndex);
    }
    // commit('incrementProductInventory', { _id: cartProduct._id })
  },

  checkout({ commit, state, rootState }) {
    commit('setObject', { obj: rootState.order, field: 'products', value: [...state.added] });
    commit('setCartCheckoutStatus', null);
    // empty cart
    // commit('setCartProducts', { products: [] })
    // shop.buyProducts(
    //   products,
    //   () => commit('setCartCheckoutStatus', 'successful'),
    //   () => {
    //     commit('setCartCheckoutStatus', 'failed')
    //     // rollback to the cart saved before sending the request
    //     commit('setCartProducts', { products: savedCartProducts })
    //   }
    // )
  },

};

const mutations = {
  pushProductToCart(state, { _id }) {
    state.added.push({
      _id,
      quantity: 1,
    });
  },

  removeProductFromCart(state, index) {
    state.added.splice(index, 1);
  },

  incrementProductQuantity(state, { _id }) {
    const cartProduct = state.added.find(product => product._id === _id);
    cartProduct.quantity++;
  },

  decrementProductQuantity(state, { _id }) {
    const cartProduct = state.added.find(product => product._id === _id);
    cartProduct.quantity--;
  },

  setCartProducts(state, { products }) {
    state.added = products;
  },

  setCartCheckoutStatus(state, status) {
    state.checkoutStatus = status;
  },

};

export default {
  state,
  getters,
  actions,
  mutations,
};

