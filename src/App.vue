<template>
  <div id="app" class="SourceSans ctitle">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
})
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>