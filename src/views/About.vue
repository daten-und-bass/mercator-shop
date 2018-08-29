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
    <PropertiesList :obj=shop category="about.shop" headline="shop_name"/>
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
    }),
  },
};
</script>
