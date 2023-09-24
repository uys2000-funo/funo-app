<template>
  <CalendarContainer>

  </CalendarContainer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CalendarContainer from '@/components/app/common/CalendarContainer.vue';
export default defineComponent({
  components: { CalendarContainer }
})
</script>


<style>
span {
  padding: 20px;
  font-family: Croissant;
  font-size: 28px;
  font-style: normal;
  font-weight: 800;
  line-height: 124%;
  /* 14.88px */
  letter-spacing: -0.3pc;
}
</style>