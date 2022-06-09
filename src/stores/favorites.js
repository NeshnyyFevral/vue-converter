import { defineStore } from 'pinia';

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
			this.watchFavorites();
		},
		deleteFavorite(value) {
			const index = this.favorites.findIndex((favorite) => favorite.id === value.id);
			this.favorites.splice(index, 1);
			this.watchFavorites();
		},
		watchFavorites() {
			localStorage.setItem('localeFavorites', JSON.stringify(this.favorites));
		},
	},
});
