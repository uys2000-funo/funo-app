<template>
  <div class="fit column no-wrap">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "DefaultLayout",
})
</script>