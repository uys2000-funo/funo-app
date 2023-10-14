<template>
  <div class="map-page" :style="`height: calc(100vh - ${headerHeight + footerHeight}px)`">
    <FunoMap />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FunoMap from '@/components/app/common/FunoMap.vue';
export default defineComponent({
  name: "MapView",
  components: { FunoMap },
  computed: {
    headerHeight() {
      const header = document.querySelector("header") as HTMLDivElement;
      return header?.clientHeight ?? 0
    },
    footerHeight() {
      const footer = document.querySelector("footer") as HTMLDivElement;
      return footer?.clientHeight ?? 0
    }
  }
})
</script>

<style scoped></style>