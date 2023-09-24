<template>
  <q-header reveal height-hint="107" class="bg-white ctitle">
    <q-toolbar class="text-center">
      <q-icon size="24px" class="absolute">
        <arrow-left-icon />
      </q-icon>
      <q-toolbar-title class="ctitle fw600 fs15 lh18" style="letter-spacing: -2%; padding: 0;">
        {{ headerText }}
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ArrowLeftIcon from '@/icons/common/ArrowLeftIcon.vue'

export default defineComponent({
  name: "HeaderDirect",
  components: { ArrowLeftIcon },
  props: {
    headerText: {
      type: String,
      default: "Funo"
    }
  }
})

</script>