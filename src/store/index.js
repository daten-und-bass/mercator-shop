/* eslint-disable import/no-extraneous-dependencies */

import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';

import shops from '@store/modules/shops';
import products from '@store/modules/products';
import cart from '@store/modules/cart';
import order from '@store/modules/order';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    cart,
    products,
    shops,
    order,
  },
  mutations: {
    setObject(state, { obj, field, value }) {
      Object.assign(obj, {
        [field]: value,
      });
    },
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});
