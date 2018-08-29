<template>
  <v-layout wrap>
    <v-flex xs24 sm12>
      <h3 v-show="!addressOrdererIsShippingAddress && addressHeading === 'address_orderer'" class="mercator-title-case mercator-text--center">{{ $t(`checkout['billing address']`) }}</h3>
      <h3 v-show="!addressOrdererIsShippingAddress && addressHeading === 'shipping_address'" class="mercator-title-case mercator-text--center">{{ $t(`checkout['shipping address']`) }}</h3>

      <h3 class="primary--text mercator__checkout__address-grid-list-heading mercator-title-case">{{ $tc('checkout.name', 1) }}</h3>
    </v-flex>
    <v-flex xs6 sm3>
      <v-select
        required
        validate-on-blur
        :rules="requiredRules"
        :items="$i18n.locale === 'de' ? ['Frau', 'Herr'] : ['Ms', 'Mrs', 'Mr']"
        :value="addressType.salutation"
        :label="$t('general.salutation') | capitalizeFirstLetter"
        single-line
        @change="setObject2(addressType, 'salutation', $event)"
      ></v-select>
    </v-flex>
    <v-flex xs18 sm9>
    </v-flex>
    <v-flex xs12 sm6>
      <v-textarea
        required
        :rules="requiredRules"
        :value="addressType.first_name"
        :label="$t(`general['first name']`) | capitalizeFirstLetter"
        @change="setObject2(addressType, 'first_name', $event)"
      ></v-textarea>
    </v-flex>
    <v-flex xs12 sm6>
      <v-textarea
        required
        :rules="requiredRules"
        :value="addressType.last_name"
        :label="$t(`general['last name']`) | capitalizeFirstLetter"
        @change="setObject2(addressType, 'last_name', $event)"
      ></v-textarea>
    </v-flex>
    <v-flex xs24 sm12>
      <h3 class="primary--text mercator__checkout__address-grid-list-heading mercator-title-case">{{ $tc('checkout.contact', 1) }}</h3>
    </v-flex>
    <v-flex xs12 sm6>
      <v-textarea
        pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
        :required="orderType === 'shipping_postal'"
        :rules="orderType === 'shipping_postal' ? requiredRules.concat(emailRules) : emailRules"
        :value="addressType.email"
        :label="$t(`general['email']`) | capitalizeFirstLetter"
        @change="setObject2(addressType, 'email', $event)"
      ></v-textarea>
    </v-flex>
    <v-flex xs12 sm6>
      <v-textarea
        :value="addressType.phone"
        :label="$t(`general['phone']`) | capitalizeFirstLetter"
        @change="setObject2(addressType, 'phone', $event)"
      ></v-textarea>
    </v-flex>
    <v-flex xs24 sm12 v-show="orderType === 'shipping_postal'">
      <h3 class="primary--text mercator__checkout__address-grid-list-heading mercator-title-case">{{ $tc('checkout.address', 1) }}</h3>
    </v-flex>
    <v-flex xs12 sm6>
      <v-textarea
        v-show="orderType === 'shipping_postal'"
        :required="orderType === 'shipping_postal'"
        :rules="orderType === 'shipping_postal' ? requiredRules : []"
        :value="addressType.street"
        :label="$t(`general['street']`) | capitalizeFirstLetter"
        @change="setObject2(addressType, 'street', $event)"
      ></v-textarea>
    </v-flex>
    <v-flex xs12 sm6>
      <v-textarea
        v-show="orderType === 'shipping_postal'"
        :required="orderType === 'shipping_postal'"
        :rules="orderType === 'shipping_postal' ? requiredRules : []"
        :value="addressType.number"
        :label="$t(`general['number']`) | capitalizeFirstLetter"
        @change="setObject2(addressType, 'number', $event)"
      ></v-textarea>
    </v-flex>
    <v-flex xs12 sm6>
      <v-textarea
        v-show="orderType === 'shipping_postal'"
        :value="addressType.address_extra_line"
        :label="$t(`general['address extra line']`) | capitalizeFirstLetter"
        @change="setObject2(addressType, 'address_extra_line', $event)"
      ></v-textarea>
    </v-flex>
    <v-flex xs12 sm6>
      <v-textarea
        v-show="orderType === 'shipping_postal'"
        :required="orderType === 'shipping_postal'"
        :rules="orderType === 'shipping_postal' ? requiredRules : []"
        :value="addressType.postcode"
        :label="$t(`general['postcode']`) | capitalizeFirstLetter"
        @change="setObject2(addressType, 'postcode', $event)"
      ></v-textarea>
    </v-flex>
    <v-flex xs12 sm6>
      <v-textarea
        v-show="orderType === 'shipping_postal'"
        :required="orderType === 'shipping_postal'"
        :rules="orderType === 'shipping_postal' ? requiredRules : []"
        :value="addressType.city"
        :label="$t(`general['city']`) | capitalizeFirstLetter"
        @change="setObject2(addressType, 'city', $event)"
      ></v-textarea>
    </v-flex>
    <v-flex xs12 sm6>
      <v-textarea
        v-show="orderType === 'shipping_postal'"
        :required="orderType === 'shipping_postal'"
        :rules="orderType === 'shipping_postal' ? requiredRules : []"
        :value="addressType.country"
        :label="$t(`general['country']`) | capitalizeFirstLetter"
        @change="setObject2(addressType, 'country', $event)"
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
  props: {
    addressOrdererIsShippingAddress: Boolean,
    addressType: Object,
    addressHeading: String,
  },
  methods: {
    setObject(obj, field, value) {
      this.$store.commit('setObject', { obj, field, value });
    },
    setObject2(obj, field, value) {
      this.setObject(obj, field, value);
      if (this.addressOrdererIsShippingAddress) {
        this.setObject(this.shippingPostal, 'shipping_address', this.orderAddressOrderer);
      }
      // this.addressOrdererIsShippingAddress === true ? this.setObject(this.shippingPostal, 'shipping_address', this.orderAddressOrderer) : null;
    },
  },
  computed: {
    ...mapGetters({
      order: 'order',
      orderType: 'orderType',
      shippingPostal: 'orderTypeOfShippingPostal',
      orderAddressOrderer: 'orderAddressOrderer',
    }),
  },
};

</script>


<style scoped>


</style>
