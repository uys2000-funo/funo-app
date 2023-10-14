<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    console.log("VUE_APP_MODE", process.env.VUE_APP_MODE)
  }
})
</script>

<style scoped>
#app {
  color: var(--color-title);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>