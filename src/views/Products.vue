<template>
  <div>
    <v-alert :value="!productsAllByCategory.length" type="error">
      {{ $tc('products.product', 0) | capitalizeFirstLetter }} {{ $t('general.found') }}.
    </v-alert>
    <v-card v-show="productsAllByCategory.length">
      <v-toolbar>
        <v-toolbar-title class="mercator-title-case">{{ $tc('products.product', 2) }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            @click="categoriesAllExpanded = !categoriesAllExpanded"
            color="primary"
          >{{ $tc('products.category', 2) }}
            <v-icon>{{ categoriesAllExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-slide-y-transition>
        <v-card-text v-show="categoriesAllExpanded">
          <v-btn flat small :to="`/${$i18n.locale}/products`" exact color="secondary">{{ $t('products.all') }}</v-btn>
          <v-btn
            v-for="(value, key) in categoriesAll"
            v-if="value"
            :key="key"
            :to="`/${$i18n.locale}/products?c=${encodeURIComponent(key)}`"
            exact
            flat
            small
            color="primary"
          >{{value[$i18n.locale]}}
          </v-btn>
          <v-divider></v-divider>
        </v-card-text>
      </v-slide-y-transition>
      <v-list>
        <template v-for="(product, index) in productsAllByCategory">
            <v-list-tile avatar :key="product._id" @click.stop="$router.push(`/${$i18n.locale}/products/${product._id}`)">
              <v-list-tile-avatar>
                <img :src="product.src[0]">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ product.title[$i18n.locale] }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary"> {{ product.price | showProductPricePostTax(vatRatesAllByCountry('de')[product.vat['de']]) | showAsCurrency }} </v-list-tile-sub-title>
                <v-list-tile-sub-title> {{ product.description[$i18n.locale] }} </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                  flat
                  fab
                  :disabled="!product.inventory"
                  @click.stop="addProductToCart(product)"
                >
                  <v-icon>
                    add_shopping_cart
                  </v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider
              v-if="index + 1 < productsAllByCategory.length"
              :key="`divider-${product._id}`"
            ></v-divider>
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    queryCategories: [String, Array],
  },
  data() {
    return {
      categoriesAllExpanded: false,
    };
  },
  methods: mapActions([
    'addProductToCart',
  ]),
  computed: {
    ...mapGetters({
      productsAll: 'productsAll',
      categoriesAll: 'categoriesAll',
      vatRatesAllByCountry: 'vatRatesAllByCountry',
    }),
    productsAllByCategory() {
      if (this.queryCategories) {
        return typeof (this.queryCategories) === 'string' ?
          this.productsAll.filter(product => product.categories.includes(this.queryCategories))
          :
          this.productsAll.filter(product => this.queryCategories.some(category => product.categories.includes(category)));
      }
      return this.productsAll;
    },
  },
};

</script>

<!-- <style scoped>

</style> -->
