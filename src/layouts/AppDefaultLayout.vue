<template>
  <q-layout view="hHh lpR fFf" container>
    <the-header />
    <the-footer />
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
    <common-dialogs />
  </q-layout>
</template>
<script lang="ts">
import theHeader from "@/components/app/HeaderDefault.vue"
import theFooter from "@/components/app/FooterDefault.vue"
import { defineComponent } from "vue";
import CommonDialogs from "@/components/app/CommonDialogs.vue";
export default defineComponent({
  name: "AppDefaultLayout",
  components: { theHeader, theFooter, CommonDialogs }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  position: absolute;
  width: 100vw;
  transition: opacity 0.5s ease;
}

.fade-enter-from {
  transform: translateX(-100vh);
}

.fade-leave-to {
  transform: translateX(100vh);
}
</style>