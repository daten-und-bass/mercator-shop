<template>
  <v-layout row>
    <v-radio-group
      row
      :required="orderType === 'shipping_postal'"
      :rules="orderType === 'shipping_postal' ? requiredRules : []"
      :value="shippingPostal['method']"
      :label="$t(`checkout['shipping method']`) | capitalizeFirstLetter"
    >
      <v-radio
        v-for="item in shopDeliveryTypesAll.shipping_postal.methods"
        :key="item.type"
        :label="`${item.type.toUpperCase()} - ${$options.filters.showAsCurrency(orderShippingFeesAmount[item.type].fees)}`"
        :value="item.type"
        @change="setObject(shippingPostal, 'method', $event)"
      ></v-radio>
    </v-radio-group>
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
      shopDeliveryTypesAll: 'shopDeliveryTypesAll',
      order: 'order',
      orderType: 'orderType',
      shippingPostal: 'orderTypeOfShippingPostal',
      orderShippingFeesAmount: 'orderShippingFeesAmount',
    }),
  },
};

</script>


<style scoped>

</style>
