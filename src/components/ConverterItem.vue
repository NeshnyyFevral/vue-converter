<template>
  <div>
    <converter-input-vue
      :computed-value="props.computedValue"
      @input-text="inputText"
    />
    <converter-select-vue
      :currencies="currencies.currencies"
      :selected-attr="selectedAttr"
      @change-value-select="changeValueSelect"
    />
  </div>
</template>

<script setup>
import { currenciesStore } from '../stores/currencies';
import ConverterInputVue from './ConverterInput.vue';
import ConverterSelectVue from './ConverterSelect.vue';

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

const inputText = (value) => { emits('inputText', value); };
const changeValueSelect = (value) => { emits('changeValueSelect', value); };

</script>
