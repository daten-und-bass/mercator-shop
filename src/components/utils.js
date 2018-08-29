import Vue from 'vue';
import i18n from '@locales';

// eslint-disable-next-line import/prefer-default-export
export const validationRules = {
  requiredRules: [
    // v => { console.log(v); return true },
    v => !!v || Vue.options.filters.capitalizeFirstLetter(i18n.t('general[\'required field\']')),
  ],
  emailRules: [
    v => (v === '' ? true : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || Vue.options.filters.capitalizeFirstLetter(i18n.t('general[\'email address e.g. address@domain.com\']'))),
  ],
  idFieldRules: [
    v =>
      // ID fields can have the value of "0" which seems not to be covered by "!!v"
      (v === null ? Vue.options.filters.capitalizeFirstLetter(i18n.t('general[\'required field\']')) : true),

  ],
};
