<template>
  <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M12.5 5.25C8.77208 5.25 5.75 8.27208 5.75 12C5.75 15.7279 8.77208 18.75 12.5 18.75C16.2279 18.75 19.25 15.7279 19.25 12C19.25 8.27208 16.2279 5.25 12.5 5.25ZM4.25 12C4.25 7.44365 7.94365 3.75 12.5 3.75C17.0563 3.75 20.75 7.44365 20.75 12C20.75 16.5563 17.0563 20.25 12.5 20.25C7.94365 20.25 4.25 16.5563 4.25 12Z"
      :fill="clockColor" />
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M12.5 7.15909C12.9142 7.15909 13.25 7.49487 13.25 7.90909V11.25H16.5909C17.0051 11.25 17.3409 11.5858 17.3409 12C17.3409 12.4142 17.0051 12.75 16.5909 12.75H12.5C12.0858 12.75 11.75 12.4142 11.75 12V7.90909C11.75 7.49487 12.0858 7.15909 12.5 7.15909Z"
      :fill="clockInnerColor" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CloseIcon',
  props: {
    clockColor: {
      type: String,
      default: '#FF7F00',
    },
    clockInnerColor: {
      type: String,
      default: '#FF7F00',
    }
  }
})
</script>