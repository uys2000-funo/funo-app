<template>
  <div style="width: 400px; height: 750px;">
    <FunoMap />
  </div>
</template>
<script lang="ts">
import FunoMap from '@/components/app/common/FunoMap.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { FunoMap }
})
</script>
