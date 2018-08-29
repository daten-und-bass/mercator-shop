/* eslint-disable import/no-extraneous-dependencies */

import Vue from 'vue';
import '@plugins/vuetify';

import i18n from '@locales';
import router from '@router';
import store from '@store';

import { showAsCurrency, showProductVATRate, showProductPricePostTax, capitalizeFirstLetter } from '@filters';

import App from './App.vue';

Vue.filter('showAsCurrency', showAsCurrency);
Vue.filter('showProductVATRate', showProductVATRate);
Vue.filter('showProductPricePostTax', showProductPricePostTax);
Vue.filter('capitalizeFirstLetter', capitalizeFirstLetter);

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router,
  store,
  i18n,
  created() {
    this.$store.dispatch('loadShopsAll');
    this.$store.dispatch('loadProductsAll');
    this.$store.dispatch('loadCategoriesAll');
  },
  render: h => h(App),
}).$mount('#app');
