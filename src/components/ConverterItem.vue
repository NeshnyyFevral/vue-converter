<template>
  <div>
    <input
      :class="$style.input"
      :value="props.computedValue"
      type="number"
      @input="inputText"
    >
    <div
      :class="$style.select"
      @click.stop="selectOpen = !selectOpen"
    >
      <div :class="$style.selectedText">
        {{ props.selectedAttr }}
        <div :class="[$style.selectedIcon, {[$style.selectClosed]: selectOpen}]" />
      </div>
    </div>

    <ul
      v-if="selectOpen"
      :class="$style.selectList"
    >
      <li
        v-for="currency in currencies.currencies"
        :key="currency.ID"
        :class="$style.option"
        @click="changeValueSelect(currency)"
      >
        {{ currency.CharCode }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { currenciesStore } from '../stores/currencies';

const currencies = currenciesStore();
const emits = defineEmits(['changeValueSelect', 'inputText']);
const props = defineProps({
	computedValue: {
		type: Number,
		default: 1,
	},
	selectedAttr: {
		type: String,
		required: true,
	},
});
const inputValue = ref(0);
const selectOpen = ref(false);
const selectValue = ref('');

onMounted(() => {
	selectValue.value = props.selectedAttr || 'AUD';
	emits('changeValueSelect', selectValue.value);
});

const inputText = (event) => {
	inputValue.value = event.target.value;
	emits('inputText', inputValue.value);
};

const changeValueSelect = (currency) => {
	selectValue.value = currency.CharCode;
	selectOpen.value = false;
	emits('changeValueSelect', selectValue.value);
};

const app = document.querySelector('#app');
app.addEventListener('click', () => {
	selectOpen.value = false;
});

</script>

<style module lang="scss">
.input{
  max-width: 300px;
  padding: 20px;
  font-size: 25px;
  border: solid #333 2px;
  border-right: solid #333 1px;
}
.select{
  padding: 34.327px 45px;
  border: solid #333 2px;
  border-left: solid #333 1px;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.2s linear;
  position: relative;
}
.selectedText{
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate3d(-50%,-50%, 0);
}
.selectedIcon{
  right: -25px;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  background-image: url(../icons/arrowDown.svg);
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  transition: background-image 0.2s linear;
}

.selectClosed {
  background-image: url(../icons/arrowUp.svg);
  transition: background-image 0.2s linear;
}
.select:hover{
  background-color: rgb(231, 231, 231);
}
.selectList{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: #fff;
  padding: 10px;
  border: solid 2px #333;
  border-radius: 15px;
  position: absolute;
  z-index: 1000;
  top: 90%;
  right: 0;
  list-style: none;
}
.option{
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s linear;
}
.option:hover{
  background-color:rgb(237, 237, 237);
}
.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.input[type=number] {
    -moz-appearance:textfield;
}

@media screen and (max-width: 1000px){
  .select{
    padding: 34.45px 45px;
  }
}

@media screen and (max-width: 500px) {
  .input{
    max-width: 200px;
  }
}
@media screen and (max-width: 320px) {
  .input {
    max-width: 120px;
  }
}
</style>
