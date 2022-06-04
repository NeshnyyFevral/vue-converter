<template>
  <main-wrapper />
</template>

<script setup>
import { onMounted } from 'vue';
import MainWrapper from './components/MainWrapper.vue';
import { currenciesStore } from './stores/currencies';

const currencies = currenciesStore();
onMounted(() => {
	currencies.fetchCurrencies();
});
</script>
