<template>
  <div>
    <converter-item
      :computed-value="inputValueFirst"
      @input-text="inputFirst"
      @change-value-select="changeFirst"
    />
    <converter-item
      :computed-value="inputValueSecond"
      @input-text="inputSecond"
      @change-value-select="changeSecond"
    />
    <div>{{ ratioFirstFromSecond }}</div>
    <div>{{ ratioSecondFromFirst }}</div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import ConverterItem from './ConverterItem.vue';
import { currenciesStore } from '../stores/currencies';

const currencies = currenciesStore();

const valueFirst = ref(1);
const valueSecond = ref(1);

const inputValueFirst = ref(1);
const inputValueSecond = ref(1);

// вычисление коэффициента
const ratioFirstFromSecond = computed(() => (valueFirst.value / valueSecond.value).toFixed(5));
const ratioSecondFromFirst = computed(() => (valueSecond.value / valueFirst.value).toFixed(5));

const computeInputValueSecond = () => {
	inputValueSecond.value = +(inputValueFirst.value * ratioFirstFromSecond.value).toFixed(5);
};

// получение данных из input
const inputFirst = (value) => {
	inputValueFirst.value = +value;
	computeInputValueSecond();
};
const inputSecond = (value) => {
	inputValueSecond.value = +value;
	inputValueFirst.value = +(inputValueSecond.value * ratioSecondFromFirst.value).toFixed(5);
};

// получение стоимости валюты
const changeFirst = (name) => {
	Object.values(currencies.currencies).forEach((currency) => {
		if (currency.CharCode === name) valueFirst.value = currency.Value;
	});
	computeInputValueSecond();
};
const changeSecond = (name) => {
	Object.values(currencies.currencies).forEach((currency) => {
		if (currency.CharCode === name) valueSecond.value = currency.Value;
	});
	computeInputValueSecond();
};
</script>

<style module lang="scss">

</style>
