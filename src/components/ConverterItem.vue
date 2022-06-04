<template>
  <div>
    <input
      :class="$style.input"
      :value="props.computedValue"
      type="number"
      @input="inputText"
      @blur="blurInput"
    >
    <select
      :class="$style.select"
      :value="selectValue"
      @change="changeValueSelect"
    >
      <option
        v-for="currency in currencies.currencies"
        :key="currency.ID"
        :class="$style.option"
      >
        {{ currency.CharCode }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { currenciesStore } from '../stores/currencies';

const currencies = currenciesStore();
const emits = defineEmits(['changeValueSelect', 'inputText']);
const props = defineProps({
	computedValue: {
		type: Number,
		default: 1,
	},
});
const inputValue = ref(0);

const inputText = (event) => {
	inputValue.value = event.target.value;
	emits('inputText', inputValue.value);
};

const blurInput = () => {
	if (inputValue.value === '') inputValue.value = '0';
};

const selectValue = ref('');
const changeValueSelect = (event) => {
	selectValue.value = event.target.value;
	emits('changeValueSelect', selectValue.value);
};
</script>

<style module lang="scss">
.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.input[type=number] {
    -moz-appearance:textfield;
}
</style>
