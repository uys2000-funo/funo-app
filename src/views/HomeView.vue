<template>
  <q-page style="padding-top: 50px;">
    <!-- #region Home View Sticky Header-->
    <q-page-sticky expand position="top" class="bg-white" style="z-index:50">
      <q-toolbar class="text-center ctitle fw600 fs16 lh20 row justify-between" style="padding: 0 16px;">
        <div class="row no-wrap items-end" style="gap:4px">
          <q-icon size="24px">
            <location-icon style="fill: var(--color-primary);" />
          </q-icon>
          <div>
            <div class="text-left"
              style="height: 15px; font-size: 12px; font-weight: 400; color: #5A5A5A; font-style: italic;">
              Konum
            </div>
            <div class="row no-wrap items-center justify-between" style="gap:10px; height: 20px;">
              <span style="font-size: 16px; font-weight: 600;">
                {{ "Konum Seçin" }}
              </span>
              <arrow-icon />
            </div>
          </div>
        </div>
        <div class="bg-primary text-white" style="border-radius:100px; overflow: hidden; height: 35px; width: 113px;">
          <q-btn no-caps square flat class="fit" dense to="#event-create">
            <div class="row flex-center" style="gap:6px">
              <span class="fs12 fw600 lh15">
                Etkinlik Oluştur
              </span>
            </div>
          </q-btn>
        </div>
      </q-toolbar>
    </q-page-sticky>
    <!-- #rendregion -->

    <!-- #region Popular Events -->
    <!-- #region Popular Events Header -->
    <div class="row justify-between" style="margin: 0 16px; margin-top: 24px; margin-bottom: 16px;">
      <span class="text-black sw600 fs14 lh17">
        POPULAR ETKİNLİKLER
      </span>

      <router-link class="cb sw600 fs14 lh17" :to="{ name: 'DiscoverView' }" style="text-decoration: none;">
        Tümünü Gsöter
      </router-link>
    </div>
    <!-- #rendregion -->
    <side-scroll style="height: 279px; width: 100%; overflow-y: visible;">
      <template v-for="event, i in [...events].reverse()" :key="i">
        <event-summary small :funo-event="event" />
      </template>
    </side-scroll>
    <!-- #rendregion -->
    <!-- #region Popular Events -->
    <!-- #region Popular Events Header -->
    <div class="row justify-between" style="margin: 0 16px; margin-top: 24px; margin-bottom: 16px;">
      <span class="text-black sw600 fs14 lh17">
        ÇEVRENDEKİLER
      </span>

      <router-link class="cb sw600 fs14 lh17" :to="{ name: 'DiscoverView' }" style="text-decoration: none;">
        Tümünü Gsöter
      </router-link>
    </div>
    <!-- #rendregion -->
    <side-scroll style="height: 279px; width: 100%;">
      <template v-for="event, i in events" :key="i">
        <event-summary small :funo-event="event" />
      </template>
    </side-scroll>
    <!-- #rendregion -->
    <!-- #region Popular Events -->
    <!-- #region Popular Events Header -->
    <div class="row justify-between" style="margin: 0 16px; margin-top: 24px; margin-bottom: 16px;">
      <span class="text-black sw600 fs14 lh17">
        SANa ÖZEL
      </span>

      <router-link class="cb sw600 fs14 lh17" :to="{ name: 'DiscoverView' }" style="text-decoration: none;">
        Tümünü Gsöter
      </router-link>
    </div>
    <!-- #rendregion -->
    <side-scroll style="height: 279px; width: 100%;">
      <template v-for="event, i in events" :key="i">
        <event-summary small :funo-event="event" />
      </template>
    </side-scroll>
    <!-- #rendregion -->

  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LocationIcon from "@/icons/common/LocationIcon.vue";
import ArrowIcon from "@/icons/common/ArrowIcon.vue"


import SideScroll from "@/components/app/common/SideScroll.vue"
import EventSummary from '@/components/app/common/EventSummary.vue';

import { FunoEvent } from '@/types/event';
export default defineComponent({
  components: { LocationIcon, ArrowIcon, SideScroll, EventSummary, },
  data() {
    return {
      events: [] as FunoEvent[]
    }
  },
  mounted() {
    for (let i = 0; i < 15; i++) {
      this.events.push(new FunoEvent(Math.random() < 0.5, true))
    }
  }
})
</script>