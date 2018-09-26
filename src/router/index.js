/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import i18n from '@locales';
import store from '@store';

import Home from '@views/Home.vue';
import Products from '@views/Products.vue';
import Product from '@views/Product.vue';
import Cart from '@views/Cart.vue';
import Checkout from '@views/Checkout.vue';
import About from '@views/About.vue';
import Imprint from '@views/Imprint.vue';
import Privacy from '@views/Privacy.vue';
import NotFound from '@views/NotFound.vue';

Vue.use(Router);
Vue.use(Meta);

// here or (better) elsewhere?
store.dispatch('loadShopsAll');

export default new Router({
  mode: 'history',
  // base: __dirname,
  base: process.env.BASE_URL,
  routes: [
    /* eslint-disable object-curly-newline */
    { path: '/', redirect: store.getters.shop.locales[0] },
    { path: '/:locale', name: 'Home', component: Home },
    { path: '/:locale/products', name: 'Products', component: Products, props: route => ({ queryCategories: route.query.c }) },
    { path: '/:locale/products/:id', name: 'Product', component: Product, props: true },
    { path: '/:locale/cart', name: 'Cart', component: Cart },
    { path: '/:locale/checkout', name: 'Checkout', component: Checkout },
    { path: '/:locale/about', name: 'About', component: About },
    { path: '/:locale/imprint', name: 'Imprint', component: Imprint },
    { path: '/:locale/privacy', name: 'Privacy', component: Privacy },
    { path: '*', component: NotFound },
    /* eslint-enable object-curly-newline */
  ],
  beforeEach(to, from, next) {
    i18n.locale = to.params.locale;
    return next();
  },
});
