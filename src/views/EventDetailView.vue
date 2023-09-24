<template>
  <div class="column" style="gap:16px">
    <div class="event-images">
      <div style="position: relative;">
        <div class="event-images-inner">
          <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated swipeable arrows
            navigation infinite control-color="primary" class="rounded-borders" style="height: 240px;">
            <template v-for="photoUrl, index in eventData.general.photoUrls" :key="index">
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
                <user-avatar :photo-url="eventData.owners[0].photoUrl" />
              </div>
              <div class="event-owner-name">
                <span class="cbtext fw600 fs16 lh20">{{ eventData.owners[0].name }}</span>
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
              {{ eventData.general.name }}
            </span>
          </div>
          <div class="event-sub-header">
            <span class="cstitle fs13 fw400 lh16">
              <template v-if="'place' in eventData.general.location">
                {{ eventData.general.location.place }}
              </template>
              <template v-else>
                {{ eventData.general.location.app }}
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
                {{ new Date(eventData.general.date.start).toLocaleDateString("tr", { day: "2-digit", month: "long" }) }}
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
                  new Date(eventData.general.date.start).toLocaleTimeString("tr", { hour: "2-digit", minute: "2-digit" })
                }}
                -
                {{
                  new Date(eventData.general.date.end).toLocaleTimeString("tr", { hour: "2-digit", minute: "2-digit" })
                }}
              </span>
            </div>
          </div>
          <div class="event-users">
            <event-users :event-users="eventData.users" />
          </div>
        </div>
        <div class="seperator">
          <div style="border-top: 1px solid #E0E0E0; height: 1px; width: 100%;"></div>
        </div>
        <div class="event-description">
          <span class="ctext fw400 fs14">
            {{ eventData.general.description }}
          </span>
        </div>
      </div>
    </div>
    <div class="event-rules" style="padding: 0 16px;">
      <div class="cntext fw600 fs14 column"
        style="border: 1px solid #00000010; border-radius: 8px; gap: 8px; padding: 12px;">
        <span v-if="eventData.conditions.ageLimit && eventData.conditions.ageLimit[0] != 0">
          -{{ eventData.conditions.ageLimit[0] }} yaşından küçükler giremez. Uygun görülmeyen kişiler içeriye
          alınmayacaktır.
        </span>
        <span v-if="eventData.conditions.ageLimit && eventData.conditions.ageLimit[1] != 0">
          -{{ eventData.conditions.ageLimit[1] }} yaşından büyükler giremez. Uygun görülmeyen kişiler içeriye
          alınmayacaktır.
        </span>
      </div>
    </div>
    <div class="event-location">
      <div class="column" style="gap:8px; padding: 0 16px;">
        <template v-if="'place' in eventData.general.location">
          <div class="event-location-header">
            <div class="event-location-title">
              <span class="fw600 fs14 ctitle">
                Konum
              </span>
            </div>
            <div class="event-location-sub-title">
              <span class="fw400 fs12 cstitle">
                {{ eventData.general.location.text }}
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
              <a class="fw400 fs12 cstitle" :href="eventData.general.location.url" target="_blank">
                {{ eventData.general.location.app }}
              </a>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { EventData } from '@/types/event';
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
      eventData_: new EventData(false, false),
    }
  },
  computed: {
    mainTag() {
      const tag = this.eventData.general.tags.main;
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
      return `background-color: var(--color-category-${this.eventData.general.tags.main})`;
    },
    eventData: {
      set(value: EventData) {
        this.eventData_ = value
      },
      get() {
        const hasTargetEvent = this.$route.params.eID as string | undefined
        this.setEventData(hasTargetEvent)
        return this.eventData_
      }
    },
  },
  methods: {
    callback() {
      console.log("")
    },
    setEventData(eID: string | undefined) {
      if (!eID) this.eventData_ = new EventData(false, true)
    },
  },
  mounted() {
    if ("place" in this.eventData.general.location) {
      this.map = new Map({ target: "map" })
      const cordinates = [
        this.eventData.general.location.coordinate.longitude,
        this.eventData.general.location.coordinate.latitude,
      ]
      this.map.addLayer(new Tile({ source: new OSM() }))
      this.map.setView(new View({ center: fromLonLat(cordinates), zoom: 15 }));
    }
  }
})
</script>