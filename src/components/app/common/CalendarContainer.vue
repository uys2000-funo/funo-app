<template>
  <div class="calendar-container">
    <full-calendar id="calendar" :options="calendarOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import { CalendarOptions } from '@fullcalendar/core';

import trLocale from "@fullcalendar/core/locales/tr"

export default defineComponent({
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          start: 'prev',
          center: 'title',
          end: 'next'
        },
        firstDay: 1,
        locale: trLocale,
      } as CalendarOptions,
    }
  }
})
</script>


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
</style>