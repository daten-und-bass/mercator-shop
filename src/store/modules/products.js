/* eslint-disable no-shadow, no-param-reassign, no-underscore-dangle */

const state = {
  all: [],
  categories: {},
};

const getters = {
  productById: state => id => state.all.find(product => product._id === id),
  productsAll: state => state.all,
  categoriesAll: state => state.categories,
};

const actions = {
  loadProductsAll({ commit, state, rootGetters }) {
    if (state.all.length === 0) {
      const loadedProducts = rootGetters.shop.products;
      commit('setProductsAll', loadedProducts);
    }
  },

  loadCategoriesAll({ commit, state, rootGetters }) {
    if (Object.keys(state.categories).length === 0 && state.categories.constructor === Object) {
      const loadedCategories = rootGetters.shop.categories;
      commit('setCategoriesAll', loadedCategories);
    }
  },
};

const mutations = {
  setProductsAll(state, products) {
    state.all = products;
  },

  setCategoriesAll(state, categories) {
    state.categories = categories;
  },

  // incrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory++
  // },

  // decrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory--
  // }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
