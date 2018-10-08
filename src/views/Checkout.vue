<template>
  <v-stepper v-model="currentStep">
    <v-stepper-header>
      <v-stepper-step :complete="currentStep > 1" step="1" class="mercator-title-case">{{ $tc('checkout.options', 2) }}</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="currentStep > 2" step="2" class="mercator-title-case" >{{ $tc('checkout.address', 1) }}</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" class="mercator-title-case">{{ $t('checkout.checkout') }}</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card color="grey lighten-1" class="mb-5" height="auto">
          <v-card-text>
            <v-form ref="formStep1" lazy-validation>
              <v-radio-group
                required
                :rules="requiredRules"
                row
                :value="orderType"
                :label="$tc(`checkout['order type']`, 1) | capitalizeFirstLetter"
              >
                <v-radio
                  v-for="(value, key) in shopDeliveryTypesAll"
                  :key="key"
                  :label="$t(`config.${key}`)| capitalizeFirstLetter"
                  :value="key"
                  @change="setObject(order, '_type', $event)"
                ></v-radio>
              </v-radio-group>
              <CheckoutInformationRequest v-show="orderType === 'information_request'"></CheckoutInformationRequest>
              <CheckoutPickup v-show="orderType === 'pickup'"></CheckoutPickup>
              <CheckoutShippingPostal v-show="orderType === 'shipping_postal'"></CheckoutShippingPostal>
            </v-form>
          </v-card-text>
        </v-card>
        <div class="mercator-text--center">
          <v-btn color="primary" @click.native="continueToNextStep($refs.formStep1, 2)">{{ $t('general.continue') }}</v-btn>
          <v-btn flat :to="`/${$i18n.locale}/cart`">{{ $t('general.cancel') }}</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-5" height="auto">
          <v-card-text>
            <v-form ref="formStep2" lazy-validation>
              <v-checkbox
                v-show="orderType === 'shipping_postal'"
                v-model="addressOrdererIsShippingAddress"
                :label="$t(`checkout['shipping address is billing address']`) | capitalizeFirstLetter"
                @change="addressOrdererIsShippingAddress === true ? setObject(shippingPostal, 'shipping_address', orderAddressOrderer) : setObject(shippingPostal, 'shipping_address', {})"
              ></v-checkbox>
              <v-container grid-list-xl fluid>
              <CheckoutAddress :addressType="orderAddressOrderer" :addressOrdererIsShippingAddress="addressOrdererIsShippingAddress" addressHeading="address_orderer"></CheckoutAddress>
              <CheckoutAddress v-show="!addressOrdererIsShippingAddress" :addressType="shippingPostal['shipping_address']" :addressOrdererIsShippingAddress="addressOrdererIsShippingAddress" addressHeading="shipping_address"></CheckoutAddress>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
        <div class="mercator-text--center">
          <v-btn flat @click.native="addressOrdererIsShippingAddress = true, currentStep = 1">{{ $t('general.back') }}</v-btn>
          <v-btn color="primary" @click.native="continueToNextStep($refs.formStep2, 3)">{{ $t('general.continue') }}</v-btn>
          <v-btn flat :to="`/${$i18n.locale}/cart`">{{ $t('general.cancel') }}</v-btn>
        </div>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-5" height="auto">
          <v-card-text>
            <!-- v-show="orderType === 'information_request'" -->
            <v-layout
              wrap
            >
              <v-flex xs24 sm12>
                <h3 class="primary--text mercator-title-case">{{ $tc(`checkout['order type']`, 1) }}: {{ $tc('config.information_request', 1) }}</h3>
              </v-flex>
              <v-flex xs24 sm12>
                <h4 class="mercator-title-case">{{ $tc(`checkout['your request']`, orderProductsAll.length === 1 ? 1 : 2) }}</h4>
              </v-flex>
              <v-layout row
              >
                <v-flex xs8 v-for="product in orderProductsAll" :key="product._id">
                  <v-textarea
                    readonly
                    :value="informatioRequest['messages'][product._id]"
                    :label="`${product.title[$i18n.locale]} - ${$options.filters.showAsCurrency(product.price)}`"
                    multi-line
                  ></v-textarea>
                </v-flex>
              </v-layout>
              <v-flex xs24 sm12>
                <h3 class="primary--text mercator-title-case">{{ $tc('checkout.name', 1) }}</h3>
                <p>
                  {{ orderAddressOrderer.salutation }} {{ orderAddressOrderer.first_name }} {{ orderAddressOrderer.last_name }}
                </p>
              </v-flex>
              <v-flex xs24 sm12>
                <h3 class="primary--text mercator-title-case">{{ $tc('checkout.contact', 1) }}</h3>
                <p>
                  E-Mail: {{ orderAddressOrderer.email ? orderAddressOrderer.email : 'k.A.' }}
                </p>
                <p>
                  Telefon: {{orderAddressOrderer.phone ? orderAddressOrderer.phone : 'k.A.' }}
                </p>
                <a :href="mailLink">Mail</a>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <div class="mercator-text--center">
          <v-btn flat @click.native="currentStep = 2">{{ $t('general.back') }}</v-btn>
          <v-btn color="primary" @click.native="currentStep = 1">{{ $t('general.continue') }}</v-btn>
          <v-btn flat :to="`/${$i18n.locale}/cart`">{{ $t('general.cancel') }}</v-btn>
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapGetters } from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import { validationRules } from '@components/utils';
// import CheckoutInformationRequest from '@components/CheckoutInformationRequest'
const CheckoutInformationRequest = () => import('@components/CheckoutInformationRequest');
const CheckoutPickup = () => import('@components/CheckoutPickup');
const CheckoutShippingPostal = () => import('@components/CheckoutShippingPostal');
const CheckoutAddress = () => import('@components/CheckoutAddress');

export default {
  components: {
    CheckoutInformationRequest,
    CheckoutPickup,
    CheckoutShippingPostal,
    CheckoutAddress,
  },
  data() {
    return {
      currentStep: 0,
      addressOrdererIsShippingAddress: true,
      ...validationRules,
    };
  },
  methods: {
    setObject(obj, field, value) {
      this.$store.commit('setObject', { obj, field, value });
    },
    continueToNextStep(ref, step) {
      if (ref.validate() && ref.$el.checkValidity()) {
        this.currentStep = step;
      }
    },
  },
  computed: {
    ...mapGetters({
      shop: 'shop',
      shopDeliveryTypesAll: 'shopDeliveryTypesAll',
      order: 'order',
      orderType: 'orderType',
      orderProductsAll: 'orderProductsAll',
      orderAddressOrderer: 'orderAddressOrderer',
      informatioRequest: 'orderTypeOfInformatioRequest',
      pickup: 'orderTypeOfPickup',
      shippingPostal: 'orderTypeOfShippingPostal',
      orderProductsAllPricePostTax: 'orderProductsAllPricePostTax',
    }),
    mailLink() {
      const recipient = `${this.shop['E-Mail']}`;
      const subject = encodeURIComponent(`Mercator Shop Anfrage von ${this.order.address_orderer.first_name} ${this.order.address_orderer.last_name}`);
      let body = '';

      switch (this.orderType) {
        case 'information_request':
          body = encodeURIComponent(this.orderType);
          break;
        case 'pickup':
          body = encodeURIComponent(this.orderType);
          break;
        case 'shipping_postal':
          body = encodeURIComponent(this.orderType);
          break;
        default:
          body = encodeURIComponent('Missing order type.');
      }

      return `mailto:${recipient}?subject=${subject}&body=${body}`;
    },
  },
};

</script>

<!-- <style scoped>

</style> -->
