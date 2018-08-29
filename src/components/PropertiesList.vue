<template>
  <div>
    <v-alert :value="!obj" type="error">
      {{ $tc(category, 0) | capitalizeFirstLetter }} {{ $t('general.found') }}.
    </v-alert>
    <div v-show="obj">
      <h3>{{obj[headline][$i18n.locale]}}</h3>
      <div
        v-for="(value, key) in obj"
        :key="key"
      >
        {{ key }}: {{ value }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    obj: Object,
    category: String,
    headline: String,
  },
};

</script>

<style scoped>

</style>
