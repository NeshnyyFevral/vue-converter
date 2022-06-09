import axios from 'axios';
import { defineStore } from 'pinia';

export const useCurrenciesStore = defineStore({
	id: 'currencies',
	state: () => ({
		currencies: {},
	}),
	actions: {
		async fetchCurrencies() {
			try {
				const response = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
				this.currencies = Object.entries(response.data.Valute)
					.reduce((currencies, [key, value]) => {
						currencies[key] = value;
						return currencies;
					}, {});
			} catch (err) {
				console.log(err);
			}
		},
	},
});
