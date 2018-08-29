/* eslint-disable import/no-extraneous-dependencies, no-shadow, no-underscore-dangle, no-mixed-operators, no-plusplus, no-param-reassign */

import { productsAllWithWholeObject, shippingFeesAmount, productsAllPricePreTax, productsAllPricePostTax } from '@store/utils';

const address = () => ({
  salutation: '',
  first_name: '',
  last_name: '',
  street: '',
  number: '',
  address_extra_line: '',
  postcode: '',
  city: '',
  country: '',
  email: '',
  phone: '',
});

const state = {
  _type: null,
  details: {
    information_request: {
      _type: 'information_request',
      messages: {},
    },
    pickup: {
      _type: 'pickup',
      pickup_address: null,
      pickup_time: null,
    },
    shipping_postal: {
      _type: 'shipping_postal',
      method: null,
      shipping_address: {},
    },
  },
  products: [],
  address_orderer: address(), // required only for shipping_postal
  taxes: null,
  total: null,
};

const getters = {
  order: state => state,
  orderType: state => state._type,
  orderTypeOfInformatioRequest: state => state.details.information_request,
  orderTypeOfPickup: state => state.details.pickup,
  orderTypeOfShippingPostal: state => state.details.shipping_postal,
  orderAddressOrderer: state => state.address_orderer,
  orderProductsAll: (state, getters, rootState) => productsAllWithWholeObject(state.products, rootState),
  orderProductsAllPricePreTax: (state, getters) => productsAllPricePreTax(getters.orderProductsAll),
  orderProductsAllQuantity: (state, getters) => getters.orderProductsAll.reduce((total, product) => total + product.quantity, 0),
  orderProductsAllPricePostTax: (state, getters, rootState, rootGetters) => productsAllPricePostTax(getters.orderProductsAll, rootGetters),
  orderShippingFeesAmount: (state, getters) => shippingFeesAmount({
    shippingPostalMethodsAll: getters.shopDeliveryTypesAll.shipping_postal.methods,
    productsAllPricePreTax: getters.orderProductsAllPricePreTax,
    productsAllQuantity: getters.orderProductsAllQuantity,
  }),

};

const actions = {

};

const mutations = {

};

export default {
  state,
  getters,
  actions,
  mutations,
};

