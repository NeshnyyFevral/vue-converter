<template>
  <main-wrapper />
</template>

<script setup>
import { onMounted } from 'vue';
import MainWrapper from './components/MainWrapper.vue';
import { useCurrenciesStore } from './stores/currencies';

const currenciesStore = useCurrenciesStore();
onMounted(() => {
	setTimeout(async () => { // для имитации загрузки
		currenciesStore.fetchCurrencies();
	}, 2000);
});
</script>
