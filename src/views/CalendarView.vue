<template>
  <div class="calendar-page" @scrollend="triggerInfiniteLoaders">
    <sticky-flow>
      <q-tabs v-model="page" no-caps class="calendar-page-tabs" active-class="calendar-page-tabs-active"
        indicator-color="primary">
        <q-tab class="calendar-page-tabs-tab" name="#calendar" label="Takvim" />
        <q-tab class="calendar-page-tabs-tab" name="#liked" label="Beğendiğim Etkinlikler" />
      </q-tabs>
    </sticky-flow>
    <q-carousel class="calendar-page-contents" v-model="page" transition-prev="slide-right" transition-next="slide-left"
      swipeable animated control-color="white" height="max-content">
      <q-carousel-slide class="calendar-page-contents-content" name="#calendar">
        <infinite-loader :on-load="loadMoreAroundYourEvents" ref="infiniteLoader ">
          <div class="calendar-content">
            <div class="calendar-content-calendar">
              <calendar-container :on-page-change="loadCalendarEvents" :calendar-funo-events="calendarFunoEvents" />
            </div>
            <div class="calendar-content-events">
              <div class="calendar-content-events-header">
                Çevrendekiler
              </div>
              <div class="calendar-content-events-list">
                <template v-for="funoEvent, index in funoEventsAroundYou.data" :key="index">
                  <event-summary :funo-event="funoEvent" />
                </template>
              </div>
            </div>
          </div>
        </infinite-loader>
      </q-carousel-slide>
      <q-carousel-slide class="calendar-page-contents-content liked" name="#liked">
        <infinite-loader :on-load="loadMoreLikedEvents">
          <div class="liked-content">
            <template v-for="funoEvent, index in funoEventsLiked.data" :key="index">
              <event-summary :funo-event="funoEvent" />
            </template>
          </div>
        </infinite-loader>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getLocalUserData } from '@/services/app/user'
import { getLayoutQueries } from "@/services/app/router"

import { FunoUser } from '@/types/user';

import StickyFlow from '@/components/app/common/StickyFlow.vue';
import InfiniteLoader from '@/components/app/common/InfiniteLoader.vue';
import CalendarContainer from '@/components/app/common/FunoCalendar.vue';
import EventSummary from '@/components/app/common/EventSummary.vue';
import { FunoEvent, FunoEvents, CalendarFunoEvents } from '@/types/event';
import { addExamplesToData } from '@/services/app/ExampleService';

export default defineComponent({
  name: "CalendarView",
  components: { StickyFlow, InfiniteLoader, CalendarContainer, EventSummary },
  props: {
    directAccess: {
      type: Object
    }
  },
  data() {
    return {
      userData_: undefined as FunoUser | undefined,
      tab: "#calendar" as "#calendar" | "#liked",
      calendarFunoEvents: new CalendarFunoEvents(31, true),
      funoEventsAroundYou: new FunoEvents(true),
      funoEventsLiked: new FunoEvents(true)
    }
  },
  methods: {
    getLocalUserData() {
      getLocalUserData.pLogger().then(userData =>
        this.userData_ = userData
      )
    },
    loadCalendarEvents(month: number, done: () => void) {
      this.calendarFunoEvents = new CalendarFunoEvents(31)
      setTimeout(() => {
        this.calendarFunoEvents = new CalendarFunoEvents(31, true)
        done()
      }, 2000);
    },
    loadMoreAroundYourEvents(index: number, done: (done: boolean) => void) {
      setTimeout(() => {
        addExamplesToData(FunoEvent, this.funoEventsAroundYou.data, [true, true])
        done(index == 1)
      }, 2000);
    },
    loadMoreLikedEvents(index: number, done: (done: boolean) => void) {
      setTimeout(() => {
        addExamplesToData(FunoEvent, this.funoEventsLiked.data, [true, true])
        done(index == 3)
      }, 2000);
    }, triggerInfiniteLoaders(event: UIEvent) {
      console.log("test")
    }
  },
  computed: {
    userData(): undefined | FunoUser {
      if (this.userData_) return this.userData_
      this.getLocalUserData()
      return undefined
    },
    page: {
      get() {
        if (this.$route.hash == "#liked") return "#liked"
        else return "#calendar"
      },
      set(value: string) {
        this.$router.push({ hash: value, query: { ...getLayoutQueries(this.$route) } })
      }
    }
  }
})
</script>

<style scoped>
.calendar-page {
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.calendar-page-tabs {
  width: 100vw;
  /*background-color: white;*/
  color: var(--color-text);
  background-color: white;
  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  /* 17.36px */
  text-transform: capitalize;
}

.calendar-page-tabs-tab {
  width: 50%;
}

.calendar-page-tabs::after {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  z-index: -1;
  background-color: #E8E8E8;
  bottom: 0px;
}

.calendar-page-tabs-active {
  color: var(--color-title);
  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 124%;
  /* 17.36px */
  text-transform: capitalize;
}

.calendar-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.calendar-content-events {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.calendar-content-events-header {
  color: var(--color-title);
  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  /* 17.36px */
  text-transform: uppercase;
}

.calendar-content-events-list,
.liked-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>