<template>
  <div :class="$style.converter">
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
	selectedFirst.value = JSON.parse(localStorage.getItem('localeSelectFirst')) || 'AUD';
	selectedSecond.value = JSON.parse(localStorage.getItem('localeSelectSecond')) || 'AUD';
	valueFirst.value = JSON.parse(localStorage.getItem('localeSelectFirstValue')) || 1;
	valueSecond.value = JSON.parse(localStorage.getItem('localeSelectSecondValue')) || 1;
	computeInputValueSecond();
});

const watchSelectFirst = () => {
	localStorage.setItem('localeSelectFirst', JSON.stringify(selectedFirst.value));
	localStorage.setItem('localeSelectFirstValue', JSON.stringify(valueFirst.value));
};

const watchSelectSecond = () => {
	localStorage.setItem('localeSelectSecond', JSON.stringify(selectedSecond.value));
	localStorage.setItem('localeSelectSecondValue', JSON.stringify(valueSecond.value));
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
$activeColor: #e7e7e7;
$defaultColor: #fff;
$accentColor: #333;
$accentColorDark: #5a5a5a;

@mixin darkTheme{
  color: $defaultColor;
  background-color: $accentColor;
}

@mixin lightTheme{
  color: $accentColor;
  background-color: $defaultColor;
}

*,
*::after,
*::before{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.converter{
  font-family: sans-serif;
  margin: 130px auto;
  max-width: 1100px;
}

.wrapper {
  padding: 60px;
  background-color: rgb(244, 244, 244);
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
  fill: $accentColorDark;
  transition: fill 0.2s linear;
}

.buttonSwap:hover {
  fill: $accentColor;
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
  background-color: transparent;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.2s linear;
  font-weight: 600;
  font-size: 14px;
}
.favoritesBtn:hover{
  background-color: rgb(219, 219, 219);
}

.favoritesBtn + .favoritesBtn{
  margin-left: 10px;
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

@media screen and (prefers-color-scheme: dark){
  body{
    background-color: rgb(24, 24, 24);
  }
  .converter{
    color: $defaultColor;
    background-color: rgb(24, 24, 24);
  }
  .wrapper{
    @include darkTheme;
  }
  .favoritesBtn{
    color: $defaultColor;
    border: 2px solid $defaultColor;
  }
  .favoritesBtn:hover{
    background-color: $accentColorDark;
  }
  .buttonSwap:hover{
    fill: $defaultColor;
  }
}

@media screen and (prefers-color-scheme: light){
  .converter{
    @include lightTheme;
  }
}
</style>
