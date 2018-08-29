/* eslint-disable no-param-reassign, no-mixed-operators, no-shadow, no-underscore-dangle */

// import { vatTaxAmount } from '@filters';


// export const filterObjectByKey = raw => Object.keys(raw)
//   .filter(key => !key.startsWith('_'))
//   .reduce((obj, key) => {
//     obj[key] = raw[key];
//     return obj;
//   }, {}
// );

export const productsAllWithWholeObject = (stateProducts, rootState) => stateProducts.map(({ _id, quantity }) => {
  const product = rootState.products.all.find(product => product._id === _id);
  return {
    ...product,
    quantity,
  };
});

export const productPriceVATAmount = (price, vatRate) => {
  const vRate = parseFloat(vatRate);

  return price * vRate;
};

export const productPricePostTax = (price, vatRate) => {
  const vRate = parseFloat(vatRate);
  const vatAmount = productPriceVATAmount(price, vRate);

  return price + vatAmount;
};

export const productsAllPricePreTax = products => (
  products.reduce((total, product) => total + product.price * product.quantity, 0)
);

export const productsAllPriceVATAmount = (products, getters) => (
  products.reduce((total, product) => total + productPriceVATAmount(product.price, getters.vatRatesAllByCountry('de')[product.vat.de]) * product.quantity, 0)
);

export const productsAllPricePostTax = (products, getters) => (
  productsAllPricePreTax(products) + productsAllPriceVATAmount(products, getters)
);

export const shippingFeesReduction = (shippingMethod, { productsAllPricePreTax, productsAllQuantity }) => (
  shippingMethod &&
    productsAllPricePreTax < shippingMethod.free.money_based &&
    productsAllQuantity < shippingMethod.free.volume_based &&
    productsAllQuantity !== shippingMethod.free.optimal_volume
);

export const shippingFeesAmount = ({ shippingPostalMethodsAll, productsAllPricePreTax, productsAllQuantity }) => {
  const fees = {};

  shippingPostalMethodsAll.forEach((method) => {
    Object.assign(fees, shippingFeesReduction(method, { productsAllPricePreTax, productsAllQuantity }) ?
      {
        [method.type]: {
          type: method.type,
          fees: method.fees,
        },
      }
      :
      {
        [method.type]: {
          type: method.type,
          fees: 0,
        },
      });
  });

  return fees;
};
