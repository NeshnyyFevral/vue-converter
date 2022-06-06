import axios from 'axios';
import { defineStore } from 'pinia';

export const currenciesStore = defineStore({
	id: 'currencies',
	state: () => ({
		currencies: [],
		selectedFirst: 'AUD',
		selectedSecond: 'AZN',
		valueFirst: 1,
		valueSecond: 1,
	}),
	actions: {
		async fetchCurrencies() {
			try {
				const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
				this.currencies = response.data.Valute;
			} catch (err) {
				console.log(err);
			}
		},
		watchSelectFirst() {
			localStorage.setItem('localeSelectFirst', JSON.stringify(this.selectedFirst));
			localStorage.setItem('localeSelectFirstValue', JSON.stringify(this.valueFirst));
		},
		watchSelectSecond() {
			localStorage.setItem('localeSelectSecond', JSON.stringify(this.selectedSecond));
			localStorage.setItem('localeSelectSecondValue', JSON.stringify(this.valueSecond));
		},
	},
});
