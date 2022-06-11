<template>
  <div :class="$style.container">
    <h3 :class="$style.title">
      Favorites
    </h3>
    <div
      v-if="favoritesStore.favorites.length === 0"
      :class="$style.emptyList"
    >
      Favorites is empty!
    </div>
    <transition-group
      tag="ul"
      :class="$style.list"
      :name="$style.list"
    >
      <li
        v-for="favorite in favoritesStore.favorites"
        :key="favorite.id"
        :class="$style.listItem"
        @click="selectFavorite(favorite)"
      >
        <div :class="$style.text">
          <span>{{ favorite.firstSelect }}</span>
          <span>
            <arrow-down :class="$style.arrowDown" />
          </span>
          <span>{{ favorite.secondSelect }}</span>
          <span :class="$style.textRatio">({{ favorite.ratio }})</span>
        </div>
        <button
          :class="$style.button"
          @click.stop="favoritesStore.deleteFavorite(favorite)"
        >
          <delete-btn :class="$style.buttonSvg" />
        </button>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
import { useFavoritesStore } from '../stores/favorites';
import deleteBtn from '../icons/delete-btn.svg';
import arrowDown from '../icons/arrow-down.svg';

const favoritesStore = useFavoritesStore();
const emits = defineEmits(['selectFavorite']);

const selectFavorite = (favorite) => {
	emits('selectFavorite', favorite);
};
</script>

<style module lang="scss">
.container{
  margin-top: 10px;
  padding: 10px;
}
.title{
  margin-bottom: 10px;
  font-size: 25px;
}

.emptyList{
  color: rgb(219, 0, 0);
  font-size: 22px;
}
.container .list{
  list-style: none;
  &:global(-enter-active),
  &:global(-leave-active){
    transition: all 0.8s ease;
  }
  &:global(-move){
    transition: all 0.8s ease;
  }
  &:global(-enter-from),
  &:global(-leave-to){
    opacity: 0;
    transform: translateY(30px);
  }
  &:global(-leave-active){
    position: absolute;
  }
}
.listItem{
  padding: 10px;
  border: 1px solid #333;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.2s linear;
  display: flex;
  justify-content: space-between;
  align-items: center
}

.listItem:hover{
  background-color: rgb(216, 216, 216);
}

.listItem + .listItem{
  margin-top: 5px;
}

.listItem:hover .button{
  opacity: 1;
}

.button{
  opacity: 0;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  padding: 5px;
  cursor: pointer;
  transition: opacity 0.2s linear, background-color 0.2s linear;
}
.button:hover{
  background-color: rgb(169, 169, 169);
}

.buttonSvg {
  width: 20px;
  height: 20px;
}

.text{
  width: 180px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.textRatio{
   margin-left: 10px;
}

.arrowDown{
  width: 20px;
  height: 20px;
  transform: rotate(-90deg) translateX(-1px);
}

@media screen and (max-width: 1000px){
  .button{
    opacity: 1;
  }
}
</style>
