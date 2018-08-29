<template>
  <div>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
<!--           <v-card-media
            :src="product.src[0]"
            height="200px"
          ></v-card-media> -->
          <v-carousel :hide-controls="product.src.length < 2" >
            <v-carousel-item
              v-for="(item,i) in product.src"
              :key="i"
              :src="item"
            ></v-carousel-item>
          </v-carousel>
          <v-card-actions>
            <v-btn
              @click="$router.go(-1)"
              small
              color="primary"
            >
            <v-icon>keyboard_arrow_left</v-icon>
            {{ $t('general.back') }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              flat
              small
              :disabled="!product.inventory"
              @click="addProductToCart(product)"
            >
              <v-icon>
                add_shopping_cart
              </v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ product.title[$i18n.locale] }}</h3>
              <span class="grey--text">{{ product.price | showProductPricePostTax(vatRatesAllByCountry('de')[product.vat['de']]) | showAsCurrency }}</span>
              <br>
              <br>
              <p>{{ product.description[$i18n.locale] }}</p>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn
              @click="categoriesAllExpanded = !categoriesAllExpanded"
              small
              color="primary"
            >Categories
              <v-icon>{{ categoriesAllExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="categoriesAllExpanded">
              <v-btn
                v-for="(item, index) in product.categories"
                v-if="item"
                :key="index"
                :to="`/${$i18n.locale}/products?c=${encodeURIComponent(item)}`"
                exact
                flat
                small
                color="primary"
              >{{categoriesAll[item][$i18n.locale]}}
              </v-btn>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    id: String,
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
      categoriesAll: 'categoriesAll',
      vatRatesAllByCountry: 'vatRatesAllByCountry',
    }),
    product() {
      return this.$store.getters.productById(parseInt(this.id, 10));
    },
  },
};

</script>


<!-- <style scoped>

</style> -->
