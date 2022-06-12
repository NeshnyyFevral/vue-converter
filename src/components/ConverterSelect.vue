<template>
  <div>
    <div
      :class="$style.selectContainer"
    >
      <div
        :class="[$style.select, selectOpen && $style.selectActive]"
        @click.stop="selectOpen = !selectOpen"
      >
        <div :class="$style.selectedText">
          {{ props.selectedAttr }}
          <div :class="[$style.selectedIcon, selectOpen && $style.selectClosed]">
            <arrow-svg />
          </div>
        </div>
      </div>
      <ul
        v-if="selectOpen"
        :class="$style.selectList"
      >
        <li
          v-for="currency in props.currencies"
          :key="currency.ID"
          :class="$style.option"
          @click="changeValueSelect(currency)"
        >
          <div :class="$style.text">
            <span :class="$style.textName">{{ currency.Name }}</span>
            <span :class="$style.textCharCode">{{ currency.CharCode }}</span>
          </div>
        </li>
      </ul>
    </div>
    <select
      :class="$style.selectMobile"
      :value="props.selectedAttr"
      @change="changeValueSelectMobile"
    >
      <option
        v-for="currency in props.currencies"
        :key="currency.ID"
        :class="$style.optionMobile"
      >
        <div :class="$style.textMobile">
          <span>{{ currency.CharCode }}</span>
        </div>
      </option>
    </select>
  </div>
</template>

<script setup>
import {
	ref,
	watch,
	onMounted,
	onUnmounted,
	toRefs,
} from 'vue';
import arrowSvg from '../icons/arrow.svg';

const selectOpen = ref(false);
const selectValue = ref('');
const app = document.querySelector('html');

const emits = defineEmits(['changeValueSelect', 'openSelect']);
const props = defineProps({
	currencies: {
		type: Object,
		default: () => ({}),
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

const refOpen = toRefs(props).stateAnotherList;

const listСlosure = () => { selectOpen.value = false; };

watch(selectOpen, () => {
	if (selectOpen.value) {
		app.addEventListener('click', listСlosure);
	} else {
		app.removeEventListener('click', listСlosure);
	}
	emits('openSelect', selectOpen.value);
});

watch(refOpen, () => {
	if (props.stateAnotherList) {
		selectOpen.value = false;
	}
});

onMounted(() => {
	selectValue.value = props.selectedAttr;
	emits('changeValueSelect', selectValue.value);
});

onUnmounted(() => { app.removeEventListener('click', listСlosure); });

const changeValueSelect = (currency) => {
	selectValue.value = currency.CharCode;
	selectOpen.value = false;
	emits('changeValueSelect', selectValue.value);
};

const changeValueSelectMobile = (event) => {
	selectValue.value = event.target.value;
	emits('changeValueSelect', selectValue.value);
};
</script>

<style module lang="scss">
$activeColor: #e7e7e7;
$defaultColor: #fff;
$accentColor: #333;
$accentColorDark: #5a5a5a;

.select {
  padding: 34.5px 45px;
  border: solid $accentColor 2px;
  border-left: solid $accentColor 1px;
  cursor: pointer;
  background-color: $defaultColor;
  transition: background-color 0.2s linear;
  position: relative;
}

.select:hover {
  background-color: $activeColor;
}

.selectActive{
  background-color: $activeColor;
}

.selectActive:hover{
  background-color: $defaultColor;
}

.selectedText {
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate3d(-50%, -50%, 0);
}

.selectedIcon {
  right: -25px;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  transition: transform 0.5s ease-in-out;
}

.selectClosed {
  transform: rotate(180deg) translateY(50%);
  transition: transform 0.5s ease-in-out;
}

.selectList {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  background-color: $defaultColor;
  padding: 10px;
  border: solid 2px $accentColor;
  border-radius: 15px;
  position: absolute;
  z-index: 1000;
  top: 90%;
  right: 0;
  list-style: none;
}

.option {
  width: 300px;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.1s linear;
}

.option:hover {
  background-color: $activeColor;
}

.text {
  display: flex;
  justify-content: space-between;
}

.textCharCode{
  font-weight: 600;
}

.selectMobile{
  padding: 22.5px 10px;
  display: none;
  width: 90px;
  border: 2px $accentColor solid;
  border-radius: none;
  font-size: 20px;
  background-color: $defaultColor;
}

.optionMobile{
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 1000px) {
  .select {
    padding: 34.45px 45px;
  }
  .selectContainer{
    display: none;
  }
  .selectMobile{
    display: block;
  }
}
@media screen and (prefers-color-scheme: dark){
  .select{
    background-color: $defaultColor;
    color: $accentColor
  }
  .selectList{
    background-color: $accentColor;
  }
  .option:hover:hover{
    background-color: $accentColorDark;
  }
}
</style>
