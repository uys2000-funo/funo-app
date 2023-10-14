<template>
  <div class="fit column no-wrap items-center" style="padding: 16px; padding-bottom: 52px;">
    <funo-text-icon style="height: 32px;" />
    <div class="image-welcome" :style="`background-image: url('${require('@/assets/images/welcome.svg')}')`">
    </div>
    <div class="column" style="gap:40px">
      <div class="column" style="gap:16px">
        <div class="fs28 lh35 fw400">
          Çevrenizdeki <br />
          etkinlikleri <span class="text-primary fw700">hemen bulun</span>
        </div>
        <div class="fs16 lh20 fw400">
          Çevrenizdeki etkinlikler hakkında sizi bilgilendirmek ve sizi kullanıcılara sosyalleştirmek için tasarlanmıştır
        </div>
      </div>
      <div style="border-radius:4px; overflow: hidden; height: 56px;">
        <q-btn no-caps square flat class="bg-primary fit" to="/login">
          <span class="text-white fs16 lh20 fw600">
            Hemen başla
          </span>
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import FunoTextIcon from "@/icons/logo/FunoTextIcon.vue"
export default {
  name: "LandingView",
  components: { FunoTextIcon }
}
</script>

<style scoped>
.image-welcome {
  flex-shrink: 1;
  flex-grow: 1;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}
</style>
