<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="calendar-header-back" @click="changeDate(-1)">
        &#60;
      </div>
      <div class="calendar-header-now">
        {{ date.toLocaleDateString("tr", { month: "long", year: "numeric" }) }}
      </div>
      <div class="calendar-header-forward" @click="changeDate(1)">
        &#62;
      </div>
    </div>
    <div class="calendar-content">
      <div class="calendar-content-header">
        <template v-for="day, index in wDays" :key="index">
          <span class="calendar-content-header-day" :class="day">
            {{ day }}
          </span>
        </template>
      </div>
      <div class="calendar-content-days">
        <template v-for="day, index in days" :key="index">
          <div class="calendar-content-days-day" :class="`day-${day}${setHiddenDayClass(day)}${setNowTodayClass(day)}`">
            <template v-if="day != 0 && data[day - 1].length != 0">
              <div class="calendar-content-days-day-event" :style="setEventPhotoUrlStyle(data[day - 1][0].data)">
              </div>
            </template>
            <div class="calendar-content-days-day-text" :class="{ active: day != 0 && data[day - 1].length != 0 }">
              {{ day }}
            </div>
            <template v-if="day != 0 && data[day - 1].length != 0">
              <div class="calendar-content-days-day-click" @click="openEvent(data[day - 1][0].eID)"> </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <template v-if="isLoading">
      <div class="calendar-loader">
        <q-spinner-pie color="primary" size="48px" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { EventData } from '@/types/event';
import { CalendarFunoEvents } from '@/types/event';
import { PropType, defineComponent } from 'vue';

import { checkDateIsToday, getIncreasedDateByDay, getMonthLength, getMonthLengthAsArray } from "@/services/app/DateService"
import { range } from "@/services/app/NumberService"
export default defineComponent({
  props: {
    calendarFunoEvents: {
      type: Object as PropType<CalendarFunoEvents>,
      default: new CalendarFunoEvents(31)
    },
    onPageChange: {
      type: Function as PropType<(month: number, done: () => void) => void>,
      default: (month: number, done: () => void) => { console.log(month), done() }
    }
  },
  data() {
    return {
      date: new Date(),
      wDays: ["P", "S", "Ç", "P", "C", "C", "P"],
      funoEvents: [],
      isLoading: false
    }
  },
  methods: {
    openEvent(eID: string | undefined) {
      console.log(eID)
    },
    changeDate(multiplier: number) {
      this.isLoading = true
      const remainingDaysToNextMonth = getMonthLength(this.date) * multiplier
      this.date = getIncreasedDateByDay(this.date, remainingDaysToNextMonth)
      this.onPageChange(this.date.getMonth(), () => { this.isLoading = false })
    },
    setHiddenDayClass(day: number) {
      return day == 0 ? ' hide' : ''
    },
    setNowTodayClass(day: number) {
      return checkDateIsToday(day, this.date) ? " now" : ""
    },
    setEventPhotoUrlStyle(eventData: EventData) {
      return `background-image: url(${eventData.general.photoUrls[0] ? eventData.general.photoUrls[0] : require('@/assets/images/logo/funo-logo.svg')});`
    }
  },
  computed: {
    data() {
      return this.calendarFunoEvents.data
    },
    days() {
      const cDay = ((this.date.getDay() + 6) % 7) + 1
      const wDay = (this.date.getDate() % 7)
      const sLength = (7 - (wDay - cDay)) % 7
      const spaces = range(0, sLength == 7 ? 0 : sLength, 0)


      const days = [...spaces, ...getMonthLengthAsArray(this.date)]
      return days
    }
  }
})
</script>

<style scoped>
.hide {
  opacity: 0;
  cursor: default;
  z-index: -1;
}

.calendar {
  position: relative;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.calendar-header {
  display: flex;
  align-items: center;
}

.calendar-header-back,
.calendar-header-forward {
  width: 100%;
  font-size: 18px;
  flex-shrink: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-header-now {
  color: var(#0A0A0A);
  text-align: center;
  font-family: Source Sans Pro;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  padding: 5px 0;
  width: 100%;
  flex-shrink: 1;
}


.calendar-content-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #F5F5F5;

}

.calendar-content-header-day {
  width: 100%;
  flex-shrink: 1;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-content-days {
  width: 100%;
  flex-shrink: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.calendar-content-days-day {
  width: calc(100% / 7);
  padding-bottom: calc(100% / 7);
  position: relative;
}

.now::before {
  content: "";

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: var(--color-primary);
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-content-days-day-event {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  width: 90%;
  padding-bottom: 90%;
  border-radius: 50%;

  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

}

.calendar-content-days-day-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.now .calendar-content-days-day-text,
.calendar-content-days-day-text.active {
  color: white;
  text-shadow: 0 0 2px #0A0A0A;
}

.calendar-content-days-day-click {
  position: absolute;
  cursor: pointer;
  width: 100%;
  padding-bottom: 100%;
}

.calendar-loader {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  background-color: wheat;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>