<template>
    <v-layout>
    <v-radio-group
      required
      :rules="orderType === 'pickup' || orderType === 'shipping_postal' ? requiredRules : []"
      :value="orderPayment"
      :label="$tc(`checkout['payment method']`, 1) | capitalizeFirstLetter"
    >
      <v-radio
        v-for="paymentTypeItem in orderType ? shopDeliveryTypesAll[orderType].payment_methods : []"
        :key="paymentTypeItem.payment_method"
        :label="shopPaymentTypesAll[paymentTypeItem.payment_method].name[$i18n.locale] | capitalizeFirstLetter"
        :value="paymentTypeItem.payment_method"
        @change="setObject(order, '_payment', $event)"
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
      shopPaymentTypesAll: 'shopPaymentTypesAll',
      order: 'order',
      orderType: 'orderType',
      orderPayment: 'orderPayment',
    }),
  },
};
</script>
