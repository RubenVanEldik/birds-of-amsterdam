<template>
  <div
    id="map"
    class="w-full h-full"
  />
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  mounted () {
    // Set the Mapbox accestoken
    mapboxgl.accessToken = process.env.mapboxToken

    // Initialize the Mapbox map
    new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      zoom: 10,
      center: [4.893333, 52.373056]
    })
  }
}
</script>
