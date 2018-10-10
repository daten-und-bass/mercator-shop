<template>
  <div>
    <div class="mercator-title-case mercator-text--center">
      <h3>{{ $t('about.about') }}</h3>
    </div>
    <p class="text-xs-center">{{ shop.description[$i18n.locale] }}</p>
    <h3>{{ $tc('about.shop', 1) | capitalizeFirstLetter }}</h3>
    <p>{{ shop.shop_name[$i18n.locale] }}<br>
    {{ shop.street}} {{ shop.number}}<br>
    {{ shop.postcode}} {{ shop.city}}</p>
    <p><b>{{ $t('general.phone') | capitalizeFirstLetter }}:</b> {{ shop.phone}}<br>
      <b>{{ $t('general.email') | capitalizeFirstLetter }}:</b> {{ shop.email }}<br>
      <b>{{ $t('general.web') | capitalizeFirstLetter }}:</b> {{ shop.homepage }}
    </p>
    <br>
    <h3 class="mercator-title-case">{{ $tc(`checkout['order type']`, 2) }}</h3>
    <div v-show="shopDeliveryTypesAll.information_request">
      <h4 class="mercator-title-case">{{ $t('config.information_request') }}</h4>
      <p v-show="shopDeliveryTypesAll.information_request.description && shopDeliveryTypesAll.information_request.description[$i18n.locale]">
        {{ shopDeliveryTypesAll.information_request.description[$i18n.locale] }}
      </p>
    </div>
    <div v-show="shopDeliveryTypesAll.pickup">
      <h4 class="mercator-title-case">{{ $t('config.pickup') }}</h4>
      <div
        v-for="(item, addressIndex) in shopDeliveryTypesAll.pickup.addresses"
        :key="addressIndex"
      >
        {{ item.street }} {{ item.number }}, {{ item.postcode }} {{ item.city }}:
        <div
          v-for="(timeItem, timeIndex) in shopDeliveryTypesAll.pickup.addresses[addressIndex].times"
          :key="timeIndex"
        >
          {{ timeItem }}
        </div>
        <br>
      </div>
    </div>
    <br>
    <div v-show="shopDeliveryTypesAll.shipping_postal">
      <h4 class="mercator-title-case">{{ $t('config.shipping_postal') }}</h4>
      <div
        v-for="(shippingMethodItem, shippingMethodIndex) in shopDeliveryTypesAll.shipping_postal.methods"
        :key="shippingMethodIndex"
      >
        {{ shippingMethodItem.name[$i18n.locale] }}: {{ shippingMethodItem.fees | showAsCurrency}}
        <br>
        {{ shippingMethodItem.description[$i18n.locale] }}
        <div v-show="shippingMethodItem.free">
          Frei ab:
          <div v-show="shippingMethodItem.free.money_based">
            {{ shippingMethodItem.free.money_based | showAsCurrency }}
          </div>
          <div v-show="shippingMethodItem.free.volume_based">
            {{ shippingMethodItem.free.volume_based }} bestellten Produkten
          </div>
        </div>
        <br>
      </div>
    </div>
    <br>
    <div v-show="shopPaymentTypesAll">
      <h3 class="mercator-title-case">{{ $tc(`checkout['payment method']`, 2) }}</h3>
      <div
        v-for="(paymentTypeItem, paymentTypeIndex) in shopPaymentTypesAll"
        :key="paymentTypeIndex"
      >
        <h4>{{ paymentTypeItem.name[$i18n.locale] }}</h4>
        Verfügbar bei:
        <div
        v-for="(shopDeliveryType, shopDeliveryTypeKey) in shopDeliveryTypesAll"
        :key="shopDeliveryTypeKey"
        >
          <div
            v-for="(availabilityItem, availabilityIndex) in shopDeliveryType.payment_methods.filter(payment_method => payment_method['payment_method'] === paymentTypeItem.type)"
            :key="availabilityIndex"
          >
            {{ $t(`config.${shopDeliveryType.type}`) | capitalizeFirstLetter}}
            <span
              v-show="availabilityItem.customer_type === 'existing_only'"
            >
              (Nicht für Neukunden)
            </span>
          </div>
        </div>
        <br>
      </div>
    </div>
    <br>

    <!-- <PropertiesList :obj=shop category="about.shop" headline="shop_name"/> -->
  </div>
</template>


<script>
/* eslint-disable import/no-extraneous-dependencies */
import { mapGetters } from 'vuex';

import PropertiesList from '@components/PropertiesList.vue';

export default {
  name: 'about',
  components: {
    PropertiesList,
  },
  computed: {
    ...mapGetters({
      shop: 'shop',
      shopDeliveryTypesAll: 'shopDeliveryTypesAll',
      shopPaymentTypesAll: 'shopPaymentTypesAll',
    }),
  },
};
</script>
