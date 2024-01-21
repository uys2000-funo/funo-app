<template>
  <div class="home-page">
    <q-page-sticky class="home-page-sticky" position="top" expand>
      <div class="home-page-sticky-top">
        <div class="home-page-sticky-top-location">
          <q-icon size="24px">
            <location-icon style="fill: var(--color-primary);" />
          </q-icon>
          <div clsas="home-page-sticky-top-location-content">
            <div class="home-page-sticky-top-location-content-header">
              {{ location }}
            </div>
            <div class="home-page-sticky-top-location-content-location">
              {{ address.location[2] != "" ? address.location[2] : "Konum Seçin" }}
              <q-icon size="16px">
                <arrow-icon />
              </q-icon>
            </div>
          </div>
        </div>
        <div class="home-page-sticky-top-cover">
          <q-btn class="home-page-sticky-cover-button" no-caps square flat dense :to="{ query: { 'eventCreate': 'show' } }">
            Etkinlik Oluştur
          </q-btn>
        </div>
      </div>
      <div class="home-page-sticky-bot">
        <div class="home-page-sticky-bot-search">
          <q-input v-model="searchText" class="home-page-sticky-bot-search-input" dense outlined rounded
            placeholder="Etkinlik ara">
            <template v-slot:prepend>
              <q-icon name="search" style="transform: scale(-1, 1);" />
            </template>
          </q-input>
        </div>
        <q-btn class="home-page-sticky-bot-filter" round flast outline>
          <q-icon name="tune" size="20px" style="color:var(--color-text)" />
        </q-btn>
      </div>
    </q-page-sticky>
    <div class="home-page-contents">
      <div class="home-page-contents-content">
        <div class="home-page-contents-content-header">
          <span class="home-page-contents-content-header-text">
            POPULAR ETKİNLİKLER
          </span>
          <router-link class="home-page-contents-content-header-link" :to="{ name: 'DiscoverView' }">
            Tümünü Göster
          </router-link>
        </div>
        <side-scroll class="home-page-contents-content-slider">
          <template v-for="event, i in [...events].reverse()" :key="i">
            <event-summary small :funo-event="event" />
          </template>
        </side-scroll>
      </div>
    </div>
    <div class="row justify-between" style="margin: 0 16px; margin-top: 24px; margin-bottom: 16px;">
      <span class="text-black sw600 fs14 lh17">
        POPULAR ETKİNLİKLER
      </span>

      <router-link class="cb sw600 fs14 lh17" :to="{ name: 'DiscoverView' }" style="text-decoration: none;">
        Tümünü Göster
      </router-link>
    </div>
    <side-scroll style="height: 279px; width: 100%; overflow-y: visible;">
      <template v-for="event, i in [...events].reverse()" :key="i">
        <event-summary small :funo-event="event" />
      </template>
    </side-scroll>
    <div class="row justify-between" style="margin: 0 16px; margin-top: 24px; margin-bottom: 16px;">
      <span class="text-black sw600 fs14 lh17">
        ÇEVRENDEKİLER
      </span>

      <router-link class="cb sw600 fs14 lh17" :to="{ name: 'DiscoverView' }" style="text-decoration: none;">
        Tümünü Göster
      </router-link>
    </div>
    <side-scroll style="height: 279px; width: 100%;">
      <template v-for="event, i in events" :key="i">
        <event-summary small :funo-event="event" />
      </template>
    </side-scroll>
    <div class="row justify-between" style="margin: 0 16px; margin-top: 24px; margin-bottom: 16px;">
      <span class="text-black sw600 fs14 lh17">
        SANa ÖZEL
      </span>

      <router-link class="cb sw600 fs14 lh17" :to="{ name: 'DiscoverView' }" style="text-decoration: none;">
        Tümünü Göster
      </router-link>
    </div>
    <side-scroll style="height: 279px; width: 100%;">
      <template v-for="event, i in events" :key="i">
        <event-summary small :funo-event="event" />
      </template>
    </side-scroll>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LocationIcon from "@/icons/common/LocationIcon.vue";
import ArrowIcon from "@/icons/common/ArrowIcon.vue"


import SideScroll from "@/components/app/common/SideScroll.vue"
import EventSummary from '@/components/app/common/EventSummary.vue';

import { FunoEvent } from '@/types/event';
import { getLastPositions, getCurrentPosition, getUsableAddress } from '@/services/app/GeolocationService';
import { Address, Coordinates } from '@/types/location';
import { getAdressFromCoordinates } from '@/services/app/GeolocationService';
export default defineComponent({
  name: "HomeView",
  components: { LocationIcon, ArrowIcon, SideScroll, EventSummary, },
  data() {
    return {
      searchText: "",
      events: [] as FunoEvent[],
      lastPosition: new Coordinates,
      position: new Coordinates(),
      address: new Address
    }
  },
  methods: {
    updateLocations() {
      setTimeout(async () => {
        await getLastPositions.pLogger().then(p => {
          if (p.lastPosition?.coords)
            this.lastPosition = new Coordinates(p.lastPosition?.coords.latitude, p.lastPosition?.coords.longitude)
        })
        getCurrentPosition.pLogger().then(p => {
          if (p?.coords) {
            this.position.latitude = p.coords.latitude
            this.position.longitude = p.coords.longitude
          }
          else this.position = this.lastPosition
          getAdressFromCoordinates.pLogger(this.position).then((position) => {
            this.address = getUsableAddress.logger(position)
          })

        })
      });
    }
  },
  mounted() {
    for (let i = 0; i < 15; i++) {
      this.events.push(new FunoEvent(Math.random() < 0.5, true))
    }
  },
  computed: {
    location() {
      this.updateLocations()
      return ""
    }
  }
})
</script>

<style scoped>
.home-page {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
}

.home-page-sticky {
  background-color: white;
  z-index: 50;
  padding: 0 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.home-page-sticky-top {
  width: 100%;
  display: flex;
  padding: 12px 0;
  justify-content: space-between;
  align-items: center;
}

.home-page-sticky-top-location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
}

.home-page-sticky-top-location-content-header {
  color: var(--color-text);
  font-family: Source Sans Pro;
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  line-height: 124%;
}

.home-page-sticky-top-location-content-location {
  display: flex;
  gap: 2px;
}

.home-page-sticky-top-location-content-location {
  display: flex;
  gap: 2px;

  color: var(--color-title);
  font-family: Source Sans Pro;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
}

.home-page-sticky-top-cover {
  background-color: var(--color-primary);
  color: var(--color-button-text);
  border-radius: 100px;
  overflow: hidden;
  height: 35px;
  width: 113px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-page-sticky-top-cover-button {
  width: 100%;
  height: 100%;

  color: var(--color-button-text);
  text-align: center;
  font-family: Source Sans Pro;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.home-page-sticky-bot {
  width: 100%;
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.home-page-sticky-bot-search {
  flex-grow: 1;
}

.home-page-sticky-bot-search-input {
  width: 100%;
}

.home-page-sticky-bot-filter {
  border-radius: 100px;
  color: rgba(0, 0, 0, 0.24);
  background: #FFF;
}

.home-page-contents {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.home-page-contents-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.home-page-contents-content-header {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
}

.home-page-contents-content-header-text {
  color: var(--color-title);

  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
}

.home-page-contents-content-header-link,
.home-page-contents-content-header-link:active,
.home-page-contents-content-header-link:visited {
  color: var(--color-primary);

  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  text-decoration: none;
}

.home-page-contents-content-slider {
  height: 279px;
  width: 100%;
}
</style>