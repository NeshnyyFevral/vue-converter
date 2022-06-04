<template>
  <div>
    <input
      :class="$style.input"
      :value="props.computedValue"
      type="number"
      @input="inputText"
    >
    <select
      :class="$style.select"
      :value="props.selectedAttr"
      @change="changeValueSelect"
    >
      <option
        v-if="!props.selectedAttr"
        disabled
        value=""
      >
        Выберете валюту
      </option>
      <option
        v-for="currency in currencies.currencies"
        :key="currency.ID"
        :value="currency.CharCode"
        :class="$style.option"
      >
        {{ currency.CharCode }}
      </option>
    </select>
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

const inputText = (event) => {
	inputValue.value = event.target.value;
	emits('inputText', inputValue.value);
};

const selectValue = ref('');

const changeValueSelect = (event) => {
	selectValue.value = event.target.value;
	emits('changeValueSelect', selectValue.value);
};

onMounted(() => {
	selectValue.value = props.selectedAttr;
	emits('changeValueSelect', selectValue.value);
});

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
