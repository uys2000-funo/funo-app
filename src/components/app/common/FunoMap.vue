<template>
  <div class="funo-map">
    <ol-map class="funo-open-layer" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true"
      @click="handleClicks">
      <ol-view ref="view" :center="center" :rotation="0" :zoom="16" projection="EPSG:4326" />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>


      <ol-vector-layer @click="openEvent" v-if="eventShow">
        <ol-source-vector>
          <template v-for="event, i in events" :key="i">
            <template v-if="'coordinates' in event.data.general.location">
              <ol-feature>
                <ol-geom-point :coordinates="event.data.general.location.coordinates.getArray()"></ol-geom-point>
                <ol-style @click="openEvent">
                  <ol-style-stroke @click="openEvent" color="red" :width="2"></ol-style-stroke>
                  <ol-style-fill @click="openEvent" color="rgba(255,255,255,0.1)"></ol-style-fill>
                  <ol-style-icon @click="openEvent" :src="chooser.icon" :scale="0.05" :anchor="[0.5, 1]"></ol-style-icon>
                </ol-style>
              </ol-feature>
            </template>
          </template>
        </ol-source-vector>
      </ol-vector-layer>

      <ol-vector-layer v-if="locationChoose">
        <ol-source-vector>
          <ol-feature>
            <ol-geom-point :coordinates="chooser.coordinates"></ol-geom-point>
            <ol-style>
              <ol-style-stroke color="red" :width="2"></ol-style-stroke>
              <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
              <ol-style-icon :src="chooser.icon" :scale="0.05" :anchor="[0.5, 1]"></ol-style-icon>
            </ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>

    </ol-map>
    <q-btn v-if="locationChoose" class="btn-choose-location" @click="setLocationEvent">
      Konum Seç
    </q-btn>
  </div>
</template>

<script lang="ts">
import { GeoJSON } from 'ol/format';
import { MapBrowserEvent } from 'ol';
import { PropType, defineComponent } from 'vue';
import { FunoEvent } from '@/types/event';
export default defineComponent({
  props: {
    eventShow: {
      type: Boolean,
    },
    locationChoose: {
      type: Boolean,
    },
    center: {
      default: [32.866287, 39.925533]
    },
    events: {
      default: [
        new FunoEvent(false, true),
        new FunoEvent(false, true),
        new FunoEvent(false, true),
        new FunoEvent(false, true),
        new FunoEvent(false, true),
        new FunoEvent(false, true),
        new FunoEvent(false, true)
      ] as Array<FunoEvent>
    },
    setLocation: {
      type: Function as PropType<(coordinate: [number, number]) => void>,
      default: (arg: [number, number]) => console.log("position", arg)
    }
  },
  data() {
    return {
      geoJson: new GeoJSON(),
      chooser: {
        icon: require("@/assets/images/logo/funo-pointer.svg"),
        coordinates: [32.866287, 39.925533] as [number, number],
      },
      funoEvent: {

      }
    }
  },
  methods: {
    setFunoIconLocation(coordinate: [number, number]) {
      this.chooser.coordinates = coordinate
    },
    openEvent() {
      console.log(arguments)
    },
    handleClicks(mapBrowserEvent: MapBrowserEvent<UIEvent>) {
      console.log(mapBrowserEvent)
      if (this.locationChoose) this.setFunoIconLocation(mapBrowserEvent.coordinate as [number, number])
    },
    setLocationEvent() {
      if (this.setLocation) this.setLocation(this.chooser.coordinates)
    }
  }
});
</script>
<style scoped>
.funo-map {
  position: relative;
  height: 100%;
  width: 100%;
}

.funo-open-layer {
  height: 100%;
  width: 100%;
}

.btn-choose-location {
  position: absolute;
  bottom: calc(10px + 2vh);
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-primary);
  color: var(--color-button-text);
  font-weight: bold;
}
</style>