<template>
  <v-jumbotron color="grey lighten-2">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3 mercator-title-case">{{ shop.shop_name[$i18n.locale] }}</h3>
          <span class="subheading">{{ shop.description[$i18n.locale] }}</span>
          <v-divider class="my-3"></v-divider>
          <div class="title mb-3">{{ $t(`home['check out our newest products']`) | capitalizeFirstLetter }}!</div>
          <v-btn large color="primary" class="mx-0" :to="`/${$i18n.locale}/products`">{{ $tc('products.product', 2) }}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      shop: 'shop',
    }),
  },
};

</script>


<!-- <style scoped>

</style> -->
