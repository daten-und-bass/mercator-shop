/* eslint-disable import/no-extraneous-dependencies */

import i18n from '@locales';

import { productPricePostTax } from '@store/utils';

export const showAsCurrency = (v) => {
  const value = parseFloat(v);
  // eslint-disable-next-line no-restricted-globals
  if (!isFinite(value) || (!value && value !== 0)) return '';

  return value.toLocaleString(`${i18n.locale}`, { style: 'currency', currency: 'EUR', currencyDisplay: 'code' });
};

export const showProductVATRate = (vatPercentage, decimalPlaces) => {
  const vatRate = parseFloat(vatPercentage * 100);
  const decimals = decimalPlaces != null ? decimalPlaces : 0;

  return `${Math.abs(vatRate).toFixed(decimals)}% ${i18n.t('general[\'vat short\']')}`;
};

export const showProductPricePostTax = (price, vatRate) => (
  productPricePostTax(price, vatRate)
);

export const capitalizeFirstLetter = characterString => (
  characterString.charAt(0).toUpperCase() + characterString.slice(1)
);
