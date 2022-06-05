<template>
  <div :class="$style.converter">
    <h1 :class="$style.converter__title">
      Vue Converter
    </h1>
    <div :class="$style.converter__wrapper">
      <div :class="$style.converter__item">
        <converter-item
          :class="$style.converter__form"
          :computed-value="inputValueFirst"
          :selected-attr="currencies.selectedFirst"
          @input-text="inputFirst"
          @change-value-select="changeFirst"
        />
        <div :class="$style.converter__ratio">
          1 {{ currencies.selectedFirst }} =
          {{ ratioFirstFromSecond }}
          {{ currencies.selectedSecond }}
        </div>
      </div>
      <button
        :class="$style.converter__button"
        @click="swap"
      >
        <svg
          role="img"
          focusable="false"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 14"
        >
          <path
            d="m 1,4.9375637 0,-0.375 c 0,-0.31066 0.2518359,-0.5625 0.5625,
          -0.5625 l 8.4375,0 0,-1.125 c 0,-0.50079 0.607008,-0.75098 0.960258,
          -0.39776 l 1.875,1.875 c 0.219656,0.21968 0.219656,0.57584 0,0.79549 l -1.875,
          1.875 C 10.608344,7.3746437 10,7.1279437 10,6.6250637 l 0,-1.125 -8.4375,
          0 C 1.2518359,5.5000637 1,5.2482237 1,4.9375637 Z m 11.4375,3.5625 -8.4375,
          0 0,-1.125 c 0,-0.49955 -0.6061406,-0.75187 -0.9602578,-0.39776 l -1.875,
          1.875 c -0.21965626,0.21968 -0.21965626,0.57584 0,0.79549 l 1.875,
          1.8750003 C 3.3919609,11.874994 4,11.627494 4,11.125064 l 0,-1.125 8.4375,
          0 C 12.748164,10.000064 13,9.7482237 13,9.4375637 l 0,-0.375 c 0,
          -0.31066 -0.251836,-0.5625 -0.5625,-0.5625 z"
          />
        </svg>
      </button>
      <div :class="$style.converter__item">
        <converter-item
          :class="$style.converter__form"
          :computed-value="inputValueSecond"
          :selected-attr="currencies.selectedSecond"
          @input-text="inputSecond"
          @change-value-select="changeSecond"
        />
        <div :class="$style.converter__ratio">
          1 {{ currencies.selectedSecond }} =
          {{ ratioSecondFromFirst }}
          {{ currencies.selectedFirst }}
        </div>
      </div>
    </div>
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
  font-family: sans-serif;
  margin: 200px auto;
  width: 1200px;
  &__wrapper{
    padding: 60px;
    display: flex;
    justify-content: space-between;
    background-color: rgb(244, 244, 244);
  }
  &__title{
    text-align: center;
    font-size: 50px;
  }
  &__button{
    border: none;
    // background-image: url(../icons/swapGoriz.svg);
    background-repeat: no-repeat;
    width: 60px;
    height: 60px;
    cursor: pointer;
    background-color: transparent;
    fill: rgb(109, 109, 109);
    transition: fill 0.2s linear;
  }
  &__button:hover{
    fill: rgb(0, 0, 0);
  }
  &__form{
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }
  &__ratio{
    margin-top: 20px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
