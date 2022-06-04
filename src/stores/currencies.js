import axios from 'axios';
import { defineStore } from 'pinia';

export const currenciesStore = defineStore({
	id: 'currencies',
	state: () => ({
		currencies: [],
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
	},
});
