<template>
  <v-layout row>
    <v-radio-group
      row
      :required="orderType === 'pickup'"
      :rules="orderType === 'pickup' ? idFieldRules : []"
      :value="pickup['pickup_address']"
      :label="$t(`checkout['pickup address']`) | capitalizeFirstLetter"
    >
      <v-radio
        v-for="item in shopDeliveryTypesAll.pickup.addresses"
        :key="item._id"
        :label="`${item.street} ${item.number}, ${item.postcode} ${item.city}`"
        :value="item._id"
        @change="setObject(pickup, 'pickup_time', ''), setObject(pickup, 'pickup_address', $event)"
      ></v-radio>
    </v-radio-group>
    <v-radio-group
      v-show="orderType === 'pickup' && pickup.pickup_address === addressIndex"
      v-for="(item, addressIndex) in shopDeliveryTypesAll.pickup.addresses"
      :key="addressIndex"
      :required="orderType === 'pickup' && pickup.pickup_address === addressIndex"
      :rules="orderType === 'pickup' && pickup.pickup_address === addressIndex ? requiredRules : []"
      :label="$t(`checkout['pickup time']`) | capitalizeFirstLetter"
      :value="orderType === 'pickup' && pickup.pickup_address === addressIndex ? pickup['pickup_time'] : null"
    >
      <v-radio
        v-for="(item, index) in shopDeliveryTypesAll.pickup.addresses[addressIndex].times"
        :key="index"
        :label="`${item}`"
        :value="item"
        @change="orderType === 'pickup' && pickup.pickup_address === addressIndex ? setObject(pickup, 'pickup_time', $event) : null"
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
      pickup: 'orderTypeOfPickup',
    }),
  },
};

</script>


<style scoped>

</style>
