<template>
  <div
    id="map"
    class="w-full h-full"
  />
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  data () {
    return {
      map: null,
      unsubscribes: []
    }
  },
  mounted () {
    this.initializeMap()
    this.addBirds()
  },
  beforeDestroy () {
    // Unsubscribe the store watchers before destroying the component
    this.unsubscribes.forEach(unsubscribe => unsubscribe())
  },
  methods: {
    initializeMap () {
      // Set the Mapbox accestoken
      mapboxgl.accessToken = process.env.mapboxToken

      // Initialize the Mapbox map
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        zoom: 10,
        center: [4.893333, 52.373056]
      })
    },
    async addBirds () {
      // Get all birds
      await this.$store.dispatch('birds/get')

      // Add a layer for each species
      this.$store.state.birds.species.forEach((species) => {
        const birds = this.$store.state.birds.data

        // Add a source for only this bird species
        this.map.addSource(species.name, {
          type: 'geojson',
          data: {
            ...birds,
            features: birds.features.filter(({ properties }) => properties.Vogel === species.name)
          }
        })

        // Add the layer
        this.map.addLayer({
          id: species.name,
          type: 'circle',
          source: species.name,
          visible: species.show ? 'visible' : 'none',
          paint: {
            'circle-radius': 5,
            'circle-color': species.color,
            'circle-opacity': 0.7
          }
        })

        // Subscribe to store changes so the visibility can be updated when needed
        this.unsubscribes.push(this.$store.subscribe((mutation, state) => {
          const { name, show } = this.$store.state.birds.species.find(({ name }) => name === species.name)

          if (mutation.type === 'birds/toggleSpecies' && mutation.payload === name) {
            this.map.setLayoutProperty(name, 'visibility', show ? 'visible' : 'none')
          }
        }))
      })
    }
  }
}
</script>
