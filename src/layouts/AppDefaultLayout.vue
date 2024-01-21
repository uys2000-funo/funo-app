<template>
  <q-layout view="hHh lpR fFf" container @scroll="runOnScrollFunctions" @scroll-height="setScrollHeight">
    <the-header />
    <the-footer />
    <q-page-container class="default-layout-page-container">
      <q-page>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </keep-alive>
        </router-view>
      </q-page>
    </q-page-container>
    <common-dialogs />
  </q-layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import theHeader from "@/components/app/HeaderDefault.vue"
import theFooter from "@/components/app/FooterDefault.vue"

import CommonDialogs from "@/components/app/CommonDialogs.vue";

import { ScrollDetail } from "@/types/quasar";
export default defineComponent({
  name: "AppDefaultLayout",
  components: { theHeader, theFooter, CommonDialogs },
  data() {
    return {
      scrollTimeout: 0,
      onScrollFunctions: [] as Array<(d: ScrollDetail, m: number) => void>,
      maxScrollHeight: 0,
    }
  },
  provide() {
    return {
      addToOnScrollFunctions: (f: (d: ScrollDetail, m: number) => void) => {
        this.onScrollFunctions.push(f)
      },
      removeFromOnScrollFunctions: (f: (d: ScrollDetail, m: number) => void) => {
        this.onScrollFunctions = this.onScrollFunctions.filter(i => i != f)
      }
    }
  },
  methods: {
    setScrollHeight(h: number) {
      const scroll = (document.querySelector(".scroll") as HTMLDivElement).clientHeight
      this.maxScrollHeight = h - scroll
    },
    runOnScrollFunctions(d: ScrollDetail) {
      clearTimeout(this.scrollTimeout)
      this.scrollTimeout = setTimeout(() => {
        this.onScrollFunctions.forEach(f => f(d, this.maxScrollHeight))
      }, 500)
    }
  },
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