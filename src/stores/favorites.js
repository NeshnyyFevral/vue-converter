import { defineStore } from 'pinia';
import appStotage from '../appStorage/index';

export const useFavoritesStore = defineStore({
	id: 'favorites',
	state: () => ({
		favorites: [],
	}),
	actions: {
		createFavorite(value) {
			const favorite = {
				firstSelect: value.firstSelect,
				secondSelect: value.secondSelect,
				ratio: value.ratio,
			};
			favorite.id = Date.now();
			this.favorites.push(favorite);
			appStotage.set('localeFavorites', this.favorites);
		},
		deleteFavorite(value) {
			const index = this.favorites.findIndex((favorite) => favorite.id === value.id);
			this.favorites.splice(index, 1);
			appStotage.set('localeFavorites', this.favorites);
		},
		clearFavorites() {
			this.favorites = [];
			appStotage.set('localeFavorites', this.favorites);
		},
	},
});
