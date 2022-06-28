<template>
  <div :class="$style.converter">
    <div
      v-if="Object.keys(currenciesStore.currencies).length == 0"
      :class="$style.preloader"
    >
      <div :class="$style.row">
        <div :class="$style.rowItem" />
        <div :class="$style.rowItem" />
      </div>
    </div>
    <div
      v-else
      :class="$style.content"
    >
      <h1 :class="$style.title">
        Vue Converter
      </h1>
      <div :class="$style.wrapper">
        <div :class="$style.main">
          <div :class="$style.item">
            <converter-item
              :class="$style.form"
              :computed-value="inputValueFirst"
              :selected-attr="selectedFirst"
              :state-another-list="stateSecondList"
              @input-text="inputFirst"
              @change-value-select="changeFirst"
              @open-select="openSelectFirst"
            />
            <div :class="$style.ratio">
              1 {{ selectedFirst }} =
              {{ ratioFirstFromSecond }}
              {{ selectedSecond }}
            </div>
          </div>
          <button
            :class="$style.buttonSwap"
            @click="swap"
          >
            <arrows-swap-svg />
          </button>
          <div :class="$style.item">
            <converter-item
              :class="$style.form"
              :computed-value="inputValueSecond"
              :selected-attr="selectedSecond"
              :state-another-list="stateFirstList"
              @input-text="inputSecond"
              @change-value-select="changeSecond"
              @open-select="openSelectSecond"
            />
            <div :class="$style.ratio">
              1 {{ selectedSecond }} =
              {{ ratioSecondFromFirst }}
              {{ selectedFirst }}
            </div>
          </div>
          <div :class="$style.buttons">
            <button
              :class="$style.favoritesBtn"
              @click="createFavorite"
            >
              Add to favorites
            </button>
            <button
              :class="$style.favoritesBtn"
              @click="favoritesStore.clearFavorites"
            >
              Clear all favorites
            </button>
          </div>
        </div>
        <favorites-valutes @select-favorite="selectFavorite" />
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
import FavoritesValutes from './FavoritesValutes.vue';
import { useCurrenciesStore } from '../stores/currencies';
import { useFavoritesStore } from '../stores/favorites';
import arrowsSwapSvg from '../icons/arrows-swap.svg';
import appStorage from '../appStorage/index';

const currenciesStore = useCurrenciesStore();
const favoritesStore = useFavoritesStore();
const inputValueFirst = ref(1);
const inputValueSecond = ref(1);

const selectedFirst = ref('');
const selectedSecond = ref('');
const valueFirst = ref(1);
const valueSecond = ref(1);

const stateFirstList = ref(false);
const stateSecondList = ref(false);

const openSelectFirst = (value) => { stateFirstList.value = value; };
const openSelectSecond = (value) => { stateSecondList.value = value; };

// вычисление коэффициента
const ratioFirstFromSecond = computed(
	() => (valueFirst.value / valueSecond.value).toFixed(5),
);
const ratioSecondFromFirst = computed(
	() => (valueSecond.value / valueFirst.value).toFixed(5),
);

const computeInputValueSecond = () => {
	inputValueSecond.value = +(inputValueFirst.value * ratioFirstFromSecond.value).toFixed(5);
};

onMounted(() => {
	selectedFirst.value = appStorage.get('localeSelectFirst') || 'AUD';
	selectedSecond.value = appStorage.get('localeSelectSecond') || 'AUD';
	valueFirst.value = appStorage.get('localeSelectFirstValue') || 1;
	valueSecond.value = appStorage.get('localeSelectSecondValue') || 1;
	computeInputValueSecond();
});

const watchSelectFirst = () => {
	appStorage.set('localeSelectFirst', selectedFirst.value);
	appStorage.set('localeSelectFirstValue', valueFirst.value);
};

const watchSelectSecond = () => {
	appStorage.set('localeSelectSecond', selectedSecond.value);
	appStorage.set('localeSelectSecondValue', valueSecond.value);
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
	if (currenciesStore.currencies[name]) {
		selectedFirst.value = currenciesStore.currencies[name].CharCode;
		valueFirst.value = currenciesStore.currencies[name].Value;
		watchSelectFirst();
	}
	computeInputValueSecond();
};
const changeSecond = (name) => {
	if (currenciesStore.currencies[name]) {
		selectedSecond.value = currenciesStore.currencies[name].CharCode;
		valueSecond.value = currenciesStore.currencies[name].Value;
		watchSelectSecond();
	}
	computeInputValueSecond();
};

const swap = () => {
	const selectTmp = selectedFirst.value;
	changeFirst(selectedSecond.value);
	changeSecond(selectTmp);
};

const createFavorite = () => {
	const value = {
		firstSelect: selectedFirst.value,
		secondSelect: selectedSecond.value,
		ratio: ratioSecondFromFirst.value,
	};
	favoritesStore.createFavorite(value);
};

const selectFavorite = (favorite) => {
	changeFirst(favorite.firstSelect);
	changeSecond(favorite.secondSelect);
};

</script>

<style module lang="scss">

*,
*::after,
*::before{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

:root{
  --color-accent: #333;
  --color-text: #333;
  --color-default-swap: #666666;
  --color-active-fav: #cecece;
  --color-active: #d6d6d6;
  --color-select: #fff;
  --color-default: #fff;
  @media screen and (prefers-color-scheme: dark){
    --color-active: #171717;
    --color-default-wrap: #333;
    --color-default: #494949;
    --color-accent: #5a5a5a;
    --color-select: #5b5b5b;
    --color-default-swap: #747474;
    --color-active-fav: #959595;
    --color-text: #fff;
  }
}

body{
  background-color: var(--color-default);
  color: var(--color-text);
}

.converter{
  font-family: sans-serif;
  margin: 130px auto;
  max-width: 1100px;
}

.wrapper {
  padding: 60px;
  background-color: var(--color-default-wrap);
  position: relative;
}

.main{
  display: flex;
  justify-content: space-between;
  position: relative;
}

.title {
  text-align: center;
  font-size: 50px;
  margin-bottom: 20px;
}

.buttonSwap {
  border: none;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: transparent;
  fill: var(--color-default-swap);
  transition: fill 0.2s linear;
}

.buttonSwap:hover {
  fill: var(--color-text);
}

.form {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.ratio {
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
}

.buttons{
  position: absolute;
  right: 0px;
  top: -50px
}

.favoritesBtn{
  color: var(--color-text);
  border: 2px solid currentColor;
  background-color: transparent;
  border-radius: 10px;
  padding: 7px;
  cursor: pointer;
  transition: background-color 0.2s linear;
  font-weight: 600;
  font-size: 14px;
}
.favoritesBtn:hover{
  background-color: var(--color-active);
}

.favoritesBtn + .favoritesBtn{
  margin-left: 10px;
}

.preloader {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: var(--color-default);
  z-index: 1001;
}

.row {
  position: relative;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 70px;
  margin-top: -50px;
  margin-left: -35px;
  animation: preloader-rotate 2s infinite linear;
}

.rowItem {
  position: absolute;
  display: inline-block;
  top: 0;
  background-color: #3c8fd8;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  animation: preloader-bounce 2s infinite ease-in-out;
}

.rowItem:last-child {
  top: auto;
  bottom: 0;
  animation-delay: -1s;
}

@keyframes preloader-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes preloader-bounce {
  0%,
  100% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }
}

@media screen and (max-width: 1000px){
  .converter{
    padding: 30px;
    margin: 100px auto;
  }
  .main {
    flex-direction: column;
    justify-content: center;
  }
  .buttonSwap {
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
    padding: 60px 20px 20px;
  }
  .favoritesBtn + .favoritesBtn {
    margin-left: 5px;
  }
}
</style>
