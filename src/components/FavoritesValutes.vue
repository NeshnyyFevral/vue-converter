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
      :enter-active-class="$style.listEnterActive"
      :leave-active-class="$style.listLeaveActive"
      :move-class="$style.listMove"
      :enter-from-class="$style.listEnterFrom"
      :leave-to-class="$style.listLeaveTo"
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
  &EnterActive,
  &LeaveActive,
  &Move{
    transition: all 0.8s ease;
  }

  &EnterFrom,
  &LeaveTo{
    opacity: 0;
    transform: translateY(30px);
  }
  &LeaveActive{
    position: absolute;
  }
}
.listItem{
  padding: 10px;
  border: 2px solid rgb(14, 14, 14);
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.2s linear;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-default);
}

.listItem:hover{
  background-color: var(--color-active-fav);
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
  fill: var(--color-text);
}

.buttonSvg{
  fill: var(--color-text);
}

@media screen and (max-width: 1000px){
  .button{
    opacity: 1;
  }
}
</style>
