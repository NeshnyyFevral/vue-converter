<template>
  <div>
    <input
      :class="$style.input"
      :value="props.computedValue"
      type="number"
      @input="inputText"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emits = defineEmits(['inputText']);
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
</script>

<style module lang="scss">
.input {
	max-width: 300px;
	padding: 20px;
	font-size: 25px;
	border: solid #333 2px;
	border-right: solid #333 1px;
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

.input[type=number] {
	-moz-appearance: textfield;
}

@media screen and (max-width: 500px) {
	.input {
		max-width: 200px;
	}
}

@media screen and (max-width: 320px) {
	.input {
		max-width: 120px;
	}
}
</style>
