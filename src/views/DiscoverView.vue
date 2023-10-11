<template>
  <div class="discover-page">
    <side-scroll>
      <!-- Buraya Story gelcek ilerde -->
    </side-scroll>
    <sticky-flow>
      <q-tabs v-model="page" no-caps class="discover-page-tabs" active-class="discover-page-tabs-active"
        indicator-color="primary">
        <q-tab class="discover-page-tabs-tab" name="#followedUsers" label="Takip Ettiğin Kullanıcılar" />
        <q-tab class="discover-page-tabs-tab" name="#forYou" label="Sana Özel Etkinlikler" />
      </q-tabs>
    </sticky-flow>
    <q-carousel class="discover-page-content" v-model="page" transition-prev="slide-right" transition-next="slide-left"
      swipeable animated control-color="white" height="max-content">
      <q-carousel-slide class="discover-page-content-followed-users" name="#followedUsers">
        <event-summary :event-data="exampleEvent" />
        <event-summary :event-data="exampleEvent2" />
        <event-summary :event-data="exampleEvent" />
        <event-summary :event-data="exampleEvent2" />
        <event-summary :event-data="exampleEvent" />
      </q-carousel-slide>
      <q-carousel-slide class="discover-page-content-for-you" name="#forYou">
        <event-summary :event-data="exampleEvent2" />
        <event-summary :event-data="exampleEvent" />
        <event-summary :event-data="exampleEvent2" />
        <event-summary :event-data="exampleEvent" />
        <event-summary :event-data="exampleEvent2" />
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getLayoutQueries } from "@/services/app/router"

import { EventData } from '@/types/event';

import EventSummary from '@/components/app/common/EventSummary.vue';
import StickyFlow from '@/components/app/common/StickyFlow.vue';
import SideScroll from '@/components/app/common/SideScroll.vue';

import { IndividualUser, EnterpriseUser } from '@/types/user';

export default defineComponent({
  components: { EventSummary, StickyFlow, SideScroll },
  data() {
    return {
      tab: "#followedUsers" as "#followedUsers" | "#forYou",
      exampleEvent: new EventData(true, true),
      exampleEvent2: new EventData(false, true),
      exampleUser: new IndividualUser(),
      exampleUser2: new EnterpriseUser(),
    }
  },
  computed: {
    page: {
      get() {
        if (this.$route.hash == "#forYou") return "#forYou"
        else return "#followedUsers"
      },
      set(value: string) {
        this.$router.push({ hash: value, query: { ...getLayoutQueries(this.$route) } })
      }
    }
  }
})
</script>
<style scoped>
.discover-page {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.discover-page-tabs {
  width: 100vw;
  background-color: white;
  color: var(--color-text);
  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  /* 17.36px */
  text-transform: capitalize;
}

.discover-page-tabs-tab {
  width: 50%;
}

.discover-page-tabs::after {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  z-index: -1;
  background-color: #E8E8E8;
  bottom: 0px;
}

.discover-page-tabs-active {
  color: var(--color-title);
  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 124%;
  /* 17.36px */
  text-transform: capitalize;
}

.discover-page-content-followed-users,
.discover-page-content-for-you {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}
</style>