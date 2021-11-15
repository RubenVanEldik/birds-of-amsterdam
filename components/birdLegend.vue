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
          :id="`checkbox-${species.name}`"
          :checked="species.show"
          class="w-4 h-4 mr-2.5"
          type="checkbox"
          @change="$store.commit('birds/toggleSpecies', species.name)"
        >
        <label
          :for="`checkbox-${species.name}`"
          v-text="species.name"
        />
        <div
          class="flex-grow text-right"
          v-text="$store.getters[`birds/speciesCount`](species.name)"
        />
      </div>
      <div class="flex items-center font-bold">
        <div>Currently visible</div>
        <div
          class="flex-grow text-right"
          v-text="$store.getters[`birds/activeCount`]"
        />
      </div>
    </div>
  </div>
</template>
