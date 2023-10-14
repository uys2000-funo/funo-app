<template>
  <div class="column" style="gap:16px">
    <div class="event-images">
      <div style="position: relative;">
        <div class="event-images-inner">
          <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated swipeable arrows
            navigation infinite control-color="primary" class="rounded-borders" style="height: 240px;">
            <template v-for="photoUrl, index in data.general.photoUrls" :key="index">
              <q-carousel-slide :name="index" class="q-pa-none column no-wrap flex-center"
                :img-src="photoUrl"></q-carousel-slide>
            </template>
          </q-carousel>
        </div>
        <div class="event-image-overlays">
          <div class="event-main-tag">
            <div class="cbtext fw600 fs14 lh17"
              style="position: absolute; top: 16px; left: 16px; padding: 6px 16px; border-radius: 600px;"
              :style="mainTagColor">
              {{ mainTag }}
            </div>
          </div>
          <div class="event-like-button">
            <div round dense class="bg-white flex flex-center"
              style="position: absolute; top: 16px; right: 16px; padding: 8px; width: 40px; height: 40px; border-radius: 50%;"
              v-ripple>
              <q-icon size="24px"><hearth-icon /></q-icon>
            </div>
          </div>
          <div class="event-owner-info">
            <div class="flex flex-center" style="position: absolute; bottom: 16px; left: 16px; gap: 8px;">
              <div class="event-owner-avatar">
                <user-avatar :photo-url="data.owners[0].photoUrl" />
              </div>
              <div class="event-owner-name">
                <span class="cbtext fw600 fs16 lh20">{{ data.owners[0].name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="event-details ">
      <div class="column" style="gap:12px; padding: 0 16px;">
        <div class="event-header">
          <div class="event-header">
            <span class="ctitle fs18 fw600 lh22">
              {{ data.general.name }}
            </span>
          </div>
          <div class="event-sub-header">
            <span class="cstitle fs13 fw400 lh16">
              <template v-if="'place' in data.general.location">
                {{ data.general.location.place }}
              </template>
              <template v-else>
                {{ data.general.location.app }}
              </template>
            </span>
          </div>
        </div>
        <div class="event-details-with-icons">
          <div class="event-start-date">
            <div class="flex flex-center" style="gap:4px">
              <q-icon size="24px">
                <calendar-icon />
              </q-icon>
              <span class="fw600 fs14 lh17">
                {{ new Date(data.general.date.start).toLocaleDateString("tr", { day: "2-digit", month: "long" }) }}
              </span>
            </div>
          </div>
          <div class="event-hours">
            <div class="flex flex-center" style="gap:4px">
              <q-icon size="24px">
                <clock-icon />
              </q-icon>
              <span class="fw600 fs14 lh17">
                {{
                  new Date(data.general.date.start).toLocaleTimeString("tr", { hour: "2-digit", minute: "2-digit" })
                }}
                -
                {{
                  new Date(data.general.date.end).toLocaleTimeString("tr", { hour: "2-digit", minute: "2-digit" })
                }}
              </span>
            </div>
          </div>
          <div class="event-users">
            <event-users :event-users="data.users" />
          </div>
        </div>
        <div class="seperator">
          <div style="border-top: 1px solid #E0E0E0; height: 1px; width: 100%;"></div>
        </div>
        <div class="event-description">
          <span class="ctext fw400 fs14">
            {{ data.general.description }}
          </span>
        </div>
      </div>
    </div>
    <div class="event-rules" style="padding: 0 16px;">
      <div class="cntext fw600 fs14 column"
        style="border: 1px solid #00000010; border-radius: 8px; gap: 8px; padding: 12px;">
        <span v-if="data.conditions.ageLimit && data.conditions.ageLimit[0] != 0">
          -{{ data.conditions.ageLimit[0] }} yaşından küçükler giremez. Uygun görülmeyen kişiler içeriye
          alınmayacaktır.
        </span>
        <span v-if="data.conditions.ageLimit && data.conditions.ageLimit[1] != 0">
          -{{ data.conditions.ageLimit[1] }} yaşından büyükler giremez. Uygun görülmeyen kişiler içeriye
          alınmayacaktır.
        </span>
      </div>
    </div>
    <div class="event-location">
      <div class="column" style="gap:8px; padding: 0 16px;">
        <template v-if="'place' in data.general.location">
          <div class="event-location-header">
            <div class="event-location-title">
              <span class="fw600 fs14 ctitle">
                Konum
              </span>
            </div>
            <div class="event-location-sub-title">
              <span class="fw400 fs12 cstitle">
                {{ data.general.location.text }}
              </span>
            </div>
          </div>
          <div class="event-location-map">
            <div id="map" style="height: 200px;"></div>
          </div>
        </template>
        <template v-else>
          <div class="event-location-header">
            <div class="event-location-title">
              <span class="fw600 fs14 ctitle">
                Uygulama
              </span>
            </div>
            <div class="event-location-sub-title">
              <a class="fw400 fs12 cstitle" :href="data.general.location.url" target="_blank">
                {{ data.general.location.app }}
              </a>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { FunoEvent } from '@/types/event';
import { defineComponent } from 'vue';

import "ol/ol.css";
import { Map, View } from 'ol';
import { OSM } from "ol/source";
import { Tile } from 'ol/layer';
import { fromLonLat } from "ol/proj"
import UserAvatar from "@/components/app/common/UserAvatar.vue"
import EventUsers from '@/components/app/common/EventUsers.vue';

import HearthIcon from "@/icons/common/HearthIcon.vue"
import CalendarIcon from '@/icons/common/CalendarIcon.vue';
import ClockIcon from '@/icons/common/ClockIcon.vue';

export default defineComponent({
  name: "EventDetailView",
  components: { EventUsers, UserAvatar, HearthIcon, CalendarIcon, ClockIcon },
  props: {
    directAccess: {
      type: Object
    }
  },
  data() {
    return {
      slide: 0,
      map: undefined as Map | undefined,
      FunoEvent_: new FunoEvent(false, false),
    }
  },
  computed: {
    mainTag() {
      const tag = this.data.general.tags.main;
      switch (tag) {
        case "art": return "Sanat";
        case "education": return "Eğitim";
        case "meet": return "Buluşma";
        case "sport": return "Spor";
        case "music": return "Müzik";
        case "tech": return "Teknoloji";
        default: return "NotFound";
      }
    },
    mainTagColor() {
      return `background-color: var(--color-category-${this.data.general.tags.main})`;
    },
    funoEvent: {
      set(value: FunoEvent) {
        this.FunoEvent_ = value
      },
      get() {
        const hasTargetEvent = this.$route.params.eID as string | undefined
        this.setFunoEvent(hasTargetEvent)
        return this.FunoEvent_
      }
    },
    data() {
      return this.funoEvent.data
    },
  },
  methods: {
    callback() {
      console.log("")
    },
    setFunoEvent(eID: string | undefined) {
      if (!eID) this.FunoEvent_ = new FunoEvent(false, true)
    },
  },
  mounted() {
    if ("place" in this.data.general.location) {
      this.map = new Map({ target: "map" })
      const cordinates = [
        this.data.general.location.coordinate.longitude,
        this.data.general.location.coordinate.latitude,
      ]
      this.map.addLayer(new Tile({ source: new OSM() }))
      this.map.setView(new View({ center: fromLonLat(cordinates), zoom: 15 }));
    }
  }
})
</script>