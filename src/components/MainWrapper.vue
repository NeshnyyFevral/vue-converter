<template>
  <div :class="$style.converter">
    <h1 :class="$style.title">
      Vue Converter
    </h1>
    <div :class="$style.wrapper">
      <div :class="$style.item">
        <converter-item
          :class="$style.form"
          :computed-value="inputValueFirst"
          :selected-attr="selectedFirst"
          @input-text="inputFirst"
          @change-value-select="changeFirst"
        />
        <div :class="$style.ratio">
          1 {{ selectedFirst }} =
          {{ ratioFirstFromSecond }}
          {{ selectedSecond }}
        </div>
      </div>
      <button
        :class="$style.button"
        @click="swap"
      >
        <arrows-swap-svg />
      </button>
      <div :class="$style.item">
        <converter-item
          :class="$style.form"
          :computed-value="inputValueSecond"
          :selected-attr="selectedSecond"
          @input-text="inputSecond"
          @change-value-select="changeSecond"
        />
        <div :class="$style.ratio">
          1 {{ selectedSecond }} =
          {{ ratioSecondFromFirst }}
          {{ selectedFirst }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
	computed,
	ref,
	onMounted,
} from 'vue';
import ConverterItem from './ConverterItem.vue';
import { currenciesStore } from '../stores/currencies';
import arrowsSwapSvg from '../icons/arrows-swap.svg';

const currencies = currenciesStore();
const inputValueFirst = ref(1);
const inputValueSecond = ref(1);

const selectedFirst = ref('');
const selectedSecond = ref('');
const valueFirst = ref(1);
const valueSecond = ref(1);

// вычисление коэффициента
const ratioFirstFromSecond = computed(
	() => (valueFirst.value / valueSecond.value).toFixed(5),
);
const ratioSecondFromFirst = computed(
	() => (valueSecond.value / valueFirst.value).toFixed(5),
);

const watchSelectFirst = () => {
	localStorage.setItem('localeSelectFirst', JSON.stringify(selectedFirst.value));
	localStorage.setItem('localeSelectFirstValue', JSON.stringify(valueFirst.value));
};

const watchSelectSecond = () => {
	localStorage.setItem('localeSelectSecond', JSON.stringify(selectedSecond.value));
	localStorage.setItem('localeSelectSecondValue', JSON.stringify(valueSecond.value));
};

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
	if (currencies.currencies[name]) {
		selectedFirst.value = currencies.currencies[name].CharCode;
		valueFirst.value = currencies.currencies[name].Value;
		watchSelectFirst();
	}
	computeInputValueSecond();
};
const changeSecond = (name) => {
	if (currencies.currencies[name]) {
		selectedSecond.value = currencies.currencies[name].CharCode;
		valueSecond.value = currencies.currencies[name].Value;
		watchSelectSecond();
	}
	computeInputValueSecond();
};

const swap = () => {
	const selectTmp = selectedFirst.value;
	changeFirst(selectedSecond.value);
	changeSecond(selectTmp);
};

onMounted(() => {
	selectedFirst.value = JSON.parse(localStorage.getItem('localeSelectFirst')) || 'AUD';
	selectedSecond.value = JSON.parse(localStorage.getItem('localeSelectSecond')) || 'AUD';
	valueFirst.value = JSON.parse(localStorage.getItem('localeSelectFirstValue')) || 1;
	valueSecond.value = JSON.parse(localStorage.getItem('localeSelectSecondValue')) || 1;
	computeInputValueSecond();
});

</script>

<style module lang="scss">
*,
*::after,
*::before{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.converter{
  font-family: sans-serif;
  margin: 200px auto;
  max-width: 1100px;
}

.wrapper {
  padding: 60px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(244, 244, 244);
}

.title {
  text-align: center;
  font-size: 50px;
}

.button {
  border: none;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: transparent;
  fill: rgb(109, 109, 109);
  transition: fill 0.2s linear;
}

.button:hover {
  fill: rgb(0, 0, 0);
}

.form {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}

.ratio {
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
}

@media screen and (max-width: 1000px){
  .converter{
    padding: 30px;
    margin: 110px auto;
  }
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }

  .button {
    display: block;
    margin: 20px auto;
    transform: rotate(90deg);
  }

  .form {
    justify-content: center;
  }
}

@media screen and (max-width: 500px) {
  .converter{
    padding: 10px;
  }
  .title {
    font-size: 40px;
  }

  .wrapper {
    padding: 20px;
  }
}
</style>
