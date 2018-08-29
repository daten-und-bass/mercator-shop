<template>
  <div class="cart">
    <div v-show="!productsAll.length" class="mercator-text--center">
      <p><i>{{ $t('cart.cart') | capitalizeFirstLetter }} {{ $t('general["is empty"]') }}.</i></p>
      <v-btn :to="`/${$i18n.locale}/products`">{{ $tc('products.product', 2) }}</v-btn>
    </div>
    <v-card v-show="productsAll.length">
      <v-toolbar>
        <v-toolbar-title class="mercator-title-case">{{ $t('cart.cart') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-subheader>{{ $t('cart.total') | capitalizeFirstLetter }}: {{ productsAllPricePostTax | showAsCurrency }}</v-subheader>
        </v-toolbar-items>
      </v-toolbar>
      <v-list two-line>
        <template v-for="product in productsAll">
            <v-list-tile avatar :key="product._id" @click.stop="$router.push(`/${$i18n.locale}/products/${product._id}`)">
              <v-list-tile-avatar>
                <img :src="product.src[0]">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ product.title[$i18n.locale] }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">
                  {{ product.price | showProductPricePostTax(vatRatesAllByCountry('de')[product.vat['de']]) | showAsCurrency }}
                </v-list-tile-sub-title>
                <v-spacer></v-spacer>
                <v-list-tile-sub-title>
                  {{ vatRatesAllByCountry('de')[product.vat['de']] | showProductVATRate }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action class="mercator__cart-list-tile-action text--primary">
                {{ product.quantity }}
              </v-list-tile-action>
              <v-list-tile-action class="mercator__cart-list-tile-action">
                <v-btn @click.stop="addProductToCart(product)">
                  <v-icon>
                    add
                  </v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action class="mercator__cart-list-tile-action">
                <v-btn @click.stop="removeProductFromCart(product)">
                  <v-icon>
                    remove
                  </v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider :key="`divider-${product._id}`"></v-divider>
        </template>
      </v-list>
      <v-card-text>
        <p class="text-xs-right">Price before Tax: {{ productsAllPricePreTax | showAsCurrency }}</p>
        <p class="text-xs-right">VAT Amount: {{ productsAllPriceVATAmount | showAsCurrency }}</p>
        <p class="text-xs-right subheading">{{ $t('cart.total') | capitalizeFirstLetter }} (plus possible shipping fees): {{ productsAllPricePostTax | showAsCurrency }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          @click="productsAllPriceTotalExpanded = !productsAllPriceTotalExpanded"
        >Shipping Fees
          <v-icon>{{ productsAllPriceTotalExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-slide-y-transition>
        <v-card-text v-show="productsAllPriceTotalExpanded">
          <p class="text-xs-right">Fees (if Shipping Standard): {{ shippingFeesAmount.standard.fees | showAsCurrency }}</p>
          <p class="text-xs-right">Fees (if Shipping Express): {{ shippingFeesAmount.express.fees | showAsCurrency }}</p>
          <p class="text-xs-right subheading">Order Price (if Shipping Standard): {{ productsAllPricePreTax + productsAllPriceVATAmount + shippingFeesAmount.standard.fees | showAsCurrency }}</p>
          <p class="text-xs-right subheading">Order Price (if Shipping Express): {{ productsAllPricePreTax + productsAllPriceVATAmount + shippingFeesAmount.express.fees | showAsCurrency }}</p>
        </v-card-text>
      </v-slide-y-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :disabled="!productsAll.length"
          :to="`/${$i18n.locale}/checkout`"
          @click="checkout(productsAll)"
        >{{ $t('checkout.checkout') }}</v-btn>
      </v-card-actions>
    </v-card>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      productsAllPriceTotalExpanded: false,
    };
  },
  computed: {
    ...mapGetters({
      productsAll: 'cartProductsAll',
      checkoutStatus: 'cartCheckoutStatus',
      productsAllPricePreTax: 'cartProductsAllPricePreTax',
      productsAllPriceVATAmount: 'cartProductsAllPriceVATAmount',
      productsAllPricePostTax: 'cartProductsAllPricePostTax',
      shippingFeesAmount: 'cartShippingFeesAmount',
      vatRatesAllByCountry: 'vatRatesAllByCountry',
    }),
  },
  methods: {
    checkout(products) {
      this.$store.dispatch('checkout', products);
    },
    removeProductFromCart(product) {
      this.$store.dispatch('removeProductFromCart', product);
    },
    addProductToCart(product) {
      this.$store.dispatch('addProductToCart', product);
    },
  },
};


</script>

<style scoped>

.mercator__cart-list-tile-action {
  padding-left: 8px !important;
}

</style>
