<template>
  <div class="calendar-container">
    <full-calendar id="calendar" :options="{ ...calendarOptions, dateClick, height }" />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { CalendarOptions, EventInput, EventSourceInput } from '@fullcalendar/core';

import trLocale from "@fullcalendar/core/locales/tr"

export default defineComponent({
  components: {
    FullCalendar
  },
  props: {
    dateClick: {
      type: Function as PropType<(arg?: DateClickArg) => void>,
      default: (arg: DateClickArg) => console.log("dateClick", arg)
    },
    events: {
      type: Array as PropType<EventInput[]>,
      default: [{
        id: 'a',
        title: 'my event',
        start: '2023-09-25',
        display: "background"
      }
      ] as EventSourceInput
    },
    height: {
      type: String || Number,
      default: "100%"
    }
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          start: 'prev',
          center: 'title',
          end: 'next'
        },
        firstDay: 1,
        locale: trLocale,
        dayHeaderFormat: { weekday: "narrow" },
        eventColor: '#378006'
      } as CalendarOptions,
    }
  }
})
</script> 

<!--

<style>
.fc-toolbar-title {
  font-size: 1.4rem;
  line-height: 1rem;
}

.fc-icon {
  padding: 0 20px;
  height: 20px;
}

.fc .fc-toolbar.fc-header-toolbar {
  margin-top: .5rem;
  margin-bottom: .5rem;
}

.fc-theme-standard td,
.fc-theme-standard th {
  border: transparent;
}

.fc-daygrid-day-frame {
  position: relative;
}

.fc-daygrid-day-top {
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
-->
