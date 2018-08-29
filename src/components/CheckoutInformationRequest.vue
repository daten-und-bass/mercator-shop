<template>
  <v-layout row>
    <v-flex xs4>
      <v-subheader class="mercator-title-case">{{ $tc('products.product', 2) }}:</v-subheader>
    </v-flex>
    <v-flex xs8 v-for="product in orderProductsAll" :key="product._id">
      <v-textarea
        :required="orderType === 'information_request'"
        :rules="orderType === 'information_request' ? requiredRules : []"
        :value="informatioRequest['messages'][product._id]"
        :label="`${product.title[$i18n.locale]} - ${$options.filters.showAsCurrency(product.price)}`"
        :placeholder="$tc(`checkout['your request']`, 1) | capitalizeFirstLetter"
        multi-line
        @change="setObject(informatioRequest['messages'], product._id, $event)"
      ></v-textarea>
    </v-flex>
  </v-layout>
</template>


<script>
import { mapGetters } from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import { validationRules } from '@components/utils';

export default {
  data() {
    return {
      ...validationRules,
    };
  },
  methods: {
    setObject(obj, field, value) {
      this.$store.commit('setObject', { obj, field, value });
    },
  },
  computed: {
    ...mapGetters({
      order: 'order',
      orderType: 'orderType',
      informatioRequest: 'orderTypeOfInformatioRequest',
      orderProductsAll: 'orderProductsAll',
    }),
  },
};

</script>


<style scoped>

</style>
