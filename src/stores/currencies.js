import { defineStore } from 'pinia';

export const useCurrenciesStore = defineStore({
	id: 'currencies',
	state: () => ({
		currencies: {},
	}),
	actions: {
		async fetchCurrencies() {
			try {
				const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
				const responseData = await response.json();
				this.currencies = Object.entries(responseData.Valute)
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
