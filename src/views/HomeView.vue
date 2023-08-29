<template>
  <q-page style="padding-top: 50px;">
    <q-page-sticky expand position="top" class="bg-white" style="z-index:50">
      <q-toolbar class="text-center ct fw600 fs16 lh20 row justify-between" style="padding: 0 16px;">
        <div class="row no-wrap items-end" style="gap:4px">
          <q-icon size="24px">
            <location-icon class="fp" />
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
          <q-btn no-caps square flat class="fit" dense>
            <div class="row flex-center" style="gap:6px">
              <span class="fs12 fw600 lh15">
                Etkinlik Oluştur
              </span>
            </div>
          </q-btn>
        </div>
      </q-toolbar>
    </q-page-sticky>

    <side-scroll style="height: 235px; width: 100%;">
      <event-mini :event-data="exampleEvent" />
    </side-scroll>
    <p v-for="n in 15" :key="n">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae
      odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis
      voluptate?
    </p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LocationIcon from "@/icons/common/LocationIcon.vue";
import ArrowIcon from "@/icons/common/ArrowIcon.vue"


import SideScroll from "@/components/app/common/SideScroll.vue"
import EventMini from '@/components/app/common/EventMini.vue';
import { EventData } from '@/types/event';
export default defineComponent({
  components: { LocationIcon, ArrowIcon, SideScroll, EventMini },
  data() {
    return {
      exampleEvent: new EventData()
    }
  }
})
</script>