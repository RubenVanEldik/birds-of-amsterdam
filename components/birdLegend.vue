<template>
  <div class="absolute bottom-3 sm:bottom-6 inset-x-4 sm:inset-x-6 sm:left-auto z-10">
    <div class="sm:w-64 bg-gray-50 px-4 py-3 rounded-md">
      <div
        v-for="species in $store.state.birds.species"
        :key="species.name"
        :class="`text-gray-${species.show ? 900 : 500}`"
        class="flex items-center"
      >
        <input
          :checked="species.show"
          :id="`checkbox-${species.name}`"
          class="w-4 h-4 mr-2.5"
          type="checkbox"
          @change="$store.commit('birds/toggleSpecies', species.name)"
        />
        <label
          :for="`checkbox-${species.name}`"
          v-text="species.name"
        />
        <div
          class="flex-grow text-right"
          v-text="$store.getters[`birds/countOfSpecies`](species.name)"
        />
      </div>
      <div class="flex items-center font-bold">
        <div>Currently visible</div>
        <div
          class="flex-grow text-right"
          v-text="$store.getters[`birds/countOfSpecies`]()"
        />
      </div>
    </div>
  </div>
</template>
