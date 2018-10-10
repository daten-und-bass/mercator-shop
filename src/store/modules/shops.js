/* eslint-disable no-shadow, no-underscore-dangle, no-param-reassign */

const state = {
  all: [],
};

// eslint-disable-next-line
const getters = {
  shopsAll: state => state.all,
  shop: state => state.all[0],
  shopDeliveryTypesAll: (state, getters) => getters.shop.delivery,
  shopPaymentTypesAll: (state, getters) => getters.shop.payment,
  vatRatesAllByCountry: () => locale => window.__mercator_data__.vat[locale],
};

const actions = {
  loadShopsAll({ commit, state }) {
    if (state.all.length === 0) {
      const loadedShops = window.__mercator_data__.shops;
      commit('setShopsAll', loadedShops);
    }
  },
};

const mutations = {
  setShopsAll(state, shops) {
    state.all = shops;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
