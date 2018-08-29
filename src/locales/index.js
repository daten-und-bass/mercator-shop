/* eslint-disable import/no-extraneous-dependencies */

import Vue from 'vue';
import VueI18n from 'vue-i18n';

import store from '@store';
import messages from '@locales/messages';

Vue.use(VueI18n);

// here or (better) elsewhere?
store.dispatch('loadShopsAll');

const i18n = new VueI18n({
  locale: store.getters.shop.locales[0],
  fallbackLocale: store.getters.shop.locales[1],
  messages,
});

export default i18n;
