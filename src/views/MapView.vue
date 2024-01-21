<template>
  <div class="map-page" :style="`height: calc(100vh - ${getHeaderHeight() + getFooterHeight()}px)`">
    <FunoMap />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FunoMap from '@/components/app/common/FunoMap.vue';
export default defineComponent({
  name: "MapView",
  components: { FunoMap },
  methods: {
    getHeaderHeight() {
      const header = document.querySelector("header") as HTMLDivElement;
      return header?.clientHeight ?? 0
    },
    getFooterHeight() {
      const footer = document.querySelector("footer") as HTMLDivElement;
      return footer?.clientHeight ?? 0
    }
  },
})
</script>

<style scoped></style>