<template>
  <div id="app">
    <v-app id="mercator__v-app">
      <v-toolbar app>
        <v-toolbar-title>{{shop.shop_name[$i18n.locale]}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat :to="`/${$i18n.locale}/products`">{{ $tc('products.product', 2) }}</v-btn>
          <v-btn flat :to="`/${$i18n.locale}/cart`">
            <v-badge right v-show="cartProductsAllQuantity > 0">
              <span slot="badge"> {{cartProductsAllQuantity}} </span>
              <v-icon>shopping_cart</v-icon>
            </v-badge>
            <v-icon v-show="cartProductsAllQuantity === 0">shopping_cart</v-icon>
          </v-btn>
          <v-menu absolute bottom left>
            <v-btn flat slot="activator">
              <v-icon>language</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile
                v-for="(item, i) in shop.locales"
                :key="i"
                :value="item == $i18n.locale"
                @click="localeChange(item)"
              >
                <v-list-tile-title>{{ item }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer app height="auto">
        <v-layout row wrap>
          <v-btn flat small color="grey" :to="`/${$i18n.locale}`" exact>
            <v-icon>home</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat small color="grey" :to="`/${$i18n.locale}/about`">{{ $t('about.about') }}</v-btn>
          <v-btn flat small color="grey" :to="`/${$i18n.locale}/imprint`">{{ $t('imprint.imprint') }}</v-btn>
          <v-btn flat small color="grey" :to="`/${$i18n.locale}/privacy`">{{ $t('privacy.privacy') }}</v-btn>
          <v-flex xs12 py-3 text-xs-center grey--text>
            &copy;2018 — <strong>Mercator Shop</strong>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-app>
  </div>
</template>

<!-- new vue-cli came WITHOUT script here in App.vue -->
<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    localeChange(value) {
      this.$i18n.locale = value;
      this.$router.push(`${this.$route.fullPath.replace(this.$route.params.locale, value)}`);
    },
  },
  computed: {
    ...mapGetters({
      shop: 'shop',
      cartProductsAllQuantity: 'cartProductsAllQuantity',
    }),
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.mercator-title-case {
  text-transform: capitalize;
}

.mercator-text--center {
  text-align: center;
}

</style>
