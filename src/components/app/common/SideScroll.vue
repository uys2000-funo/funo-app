<template>
  <q-scroll-area>
    <div class="row no-wrap" style="gap:8px; padding: 0 16px">
      <slot />
    </div>
  </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "SideScroll",
})
</script>