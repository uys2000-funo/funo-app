<template>
  <div id="map"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile';

import View from 'ol/View.js';

export default defineComponent({
  mounted() {
    const map = new Map({ target: 'map' });

    map.setView(new View({
      center: [0, 0],
      zoom: 2,
    }));

    const source = new OSM();

    const layer = new TileLayer({ source: source });
    map.addLayer(layer);

  }
})
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>