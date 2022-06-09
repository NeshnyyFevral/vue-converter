<template>
  <div :class="$style.container">
    <h3 :class="$style.title">
      Favorites
    </h3>
    <ul :class="$style.list">
      <li
        v-for="favorite in favoritesStore.favorites"
        :key="favorite.id"
        :class="$style.listItem"
      >
        <span>{{ favorite.firstSelect }}</span>
        <span>-></span>
        <span>{{ favorite.secondSelect }}</span>
        <span> ( {{ favorite.ratio }} )</span>
        <button @click="selectFavorite(favorite)">
          выбор
        </button>
        <button @click="favoritesStore.deleteFavorite(favorite)">
          удаление
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useFavoritesStore } from '../stores/favorites';

const favoritesStore = useFavoritesStore();
const emits = defineEmits(['selectFavorite']);

const selectFavorite = (favorite) => {
	emits('selectFavorite', favorite);
};
</script>

<style module lang="scss">
.container{
  margin-top: 10px;
}
.title{

}
.list{
  list-style: none;
}
.listItem{

}
</style>
