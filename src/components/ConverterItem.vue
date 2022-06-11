<template>
  <div>
    <converter-input
      :computed-value="props.computedValue"
      @input-text="inputText"
    />
    <converter-select
      :currencies="currencies.currencies"
      :selected-attr="selectedAttr"
      :state-another-list="props.stateAnotherList"
      @change-value-select="changeValueSelect"
      @open-select="openSelect"
    />
  </div>
</template>

<script setup>
import { useCurrenciesStore } from '../stores/currencies';
import ConverterInput from './ConverterInput.vue';
import ConverterSelect from './ConverterSelect.vue';

const currencies = useCurrenciesStore();
const emits = defineEmits(['changeValueSelect', 'inputText', 'openSelect']);
const props = defineProps({
	computedValue: {
		type: Number,
		default: 1,
	},
	selectedAttr: {
		type: String,
		required: true,
	},
	stateAnotherList: {
		type: Boolean,
		default: false,
	},
});

const inputText = (value) => { emits('inputText', value); };
const changeValueSelect = (value) => { emits('changeValueSelect', value); };
const openSelect = (value) => { emits('openSelect', value); };

</script>
