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
import { computed, ref, onMounted } from 'vue';
import ConverterItem from './ConverterItem.vue';
import { currenciesStore } from '../stores/currencies';

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
	const firstTmp = selectedFirst.value;
	const secondTmp = selectedSecond.value;
	changeFirst(secondTmp);
	changeSecond(firstTmp);
};

onMounted(() => {
	selectedFirst.value = JSON.parse(localStorage.getItem('localeSelectFirst')) || 'AUD';
	selectedSecond.value = JSON.parse(localStorage.getItem('localeSelectSecond')) || 'AZN';
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
