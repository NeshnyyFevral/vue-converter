import { createApp as _createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '../App.vue';

export default function createApp() {
	const pinia = createPinia();
	const app = _createApp(App);

	const localeSelectFirst = JSON.parse(localStorage.getItem('localeSelectFirst'));
	const localeSelectSecond = JSON.parse(localStorage.getItem('localeSelectSecond'));
	const localeSelectFirstValue = JSON.parse(localStorage.getItem('localeSelectFirstValue'));
	const localeSelectSecondValue = JSON.parse(localStorage.getItem('localeSelectSecondValue'));

	pinia.state.value = {
		currencies: {
			currencies: [],
			selectedFirst: localeSelectFirst || '',
			selectedSecond: localeSelectSecond || '',
			valueFirst: localeSelectFirstValue || 0,
			valueSecond: localeSelectSecondValue || 0,
		},
	};

	return {
		pinia, app,
	};
}
