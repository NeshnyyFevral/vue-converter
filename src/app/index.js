import { createApp as _createApp } from 'vue';
import { createPinia } from 'pinia';
import appStorage from '../appStorage';
import App from '../App.vue';

export default function createApp() {
	const pinia = createPinia();
	const app = _createApp(App);

	const localeFavorites = appStorage.get('localeFavorites');

	pinia.state.value = {
		currencies: {
			currencies: {},
		},
		favorites: {
			favorites: localeFavorites || [],
		},
	};

	return {
		pinia,
		app,
	};
}
