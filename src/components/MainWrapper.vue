<template>
  <div :class="$style.converter">
    <converter-item
      :class="$style.converter__item"
      :computed-value="inputValueFirst"
      :selected-attr="currencies.selectedFirst"
      @input-text="inputFirst"
      @change-value-select="changeFirst"
    />
    <button
      :class="$style.converter__button"
      @click="swap"
    >
      wefew
    </button>
    <converter-item
      :class="$style.converter__item"
      :computed-value="inputValueSecond"
      :selected-attr="currencies.selectedSecond"
      @input-text="inputSecond"
      @change-value-select="changeSecond"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import ConverterItem from './ConverterItem.vue';
import { currenciesStore } from '../stores/currencies';

const currencies = currenciesStore();
const inputValueFirst = ref(1);
const inputValueSecond = ref(1);

// вычисление коэффициента
const ratioFirstFromSecond = computed(
	() => (currencies.valueFirst / currencies.valueSecond).toFixed(5),
);
const ratioSecondFromFirst = computed(
	() => (currencies.valueSecond / currencies.valueFirst).toFixed(5),
);

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
		if (currency.CharCode === name) currencies.valueFirst = currency.Value;
	});
	currencies.selectedFirst = name;
	currencies.watchSelectFirst();
	computeInputValueSecond();
};
const changeSecond = (name) => {
	Object.values(currencies.currencies).forEach((currency) => {
		if (currency.CharCode === name) currencies.valueSecond = currency.Value;
	});
	currencies.selectedSecond = name;
	currencies.watchSelectSecond();
	computeInputValueSecond();
};

const swap = () => {
	const firstTmp = currencies.selectedFirst;
	const secondTmp = currencies.selectedSecond;
	changeFirst(secondTmp);
	changeSecond(firstTmp);
};

</script>

<style module lang="scss">
.converter{
  margin: 250px auto;
  padding: 40px;
  width: 700px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(244, 244, 244);
}
</style>
