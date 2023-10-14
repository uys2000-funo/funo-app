<template>
  <div style="height: 100%; display: flex; flex-direction: column; overflow: hidden;">
    <div @scrollend="onScroll" class="infinite-loader" :class="{ 'infinite-loader-reversed': isReversed }" ref="loader">
      <slot />
      <template v-if="isLoading">
        <div class="text-center">
          <template v-if="isReversed">
            <q-spinner-ball color="primary" size="48px" />
          </template>
          <template v-else>
            <q-spinner-dots color="primary" size="48px" />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';

import { ScrollDetail } from "@/types/quasar"
export default defineComponent({
  name: "InfiniteLoader",
  inject: ["addToOnScrollFunctions", "removeFromOnScrollFunctions"],
  props: {
    isReversed: {
      type: Boolean
    },
    onLoad: {
      type: Function as PropType<(index: number, endLoader: (done?: boolean | undefined) => void) => void>,
      default: (index: number, done: (stop?: boolean | undefined) => void) => {
        setTimeout(() => {
          done(false)
        }, 10000)
      }
    }
  },
  data() {
    return {
      index: 0,
      done: false,
      isLoading: false
    }
  },
  methods: {
    startLoader(isLayoutScroll: boolean) {
      this.isLoading = true
      setTimeout(() => {
        const t = isLayoutScroll ? ".scroll" : ".infinite-loader"
        const target = document.querySelector(t) as HTMLDivElement
        const toScroll = target.scrollHeight * (this.isReversed ? -1 : 1)
        target.scrollTo({ left: 0, top: toScroll, behavior: "smooth" })
      })
    },
    runLoader(isLayoutScroll = false) {
      this.startLoader(isLayoutScroll)
      this.onLoad(this.index, this.endLoader)
    },
    endLoader(done: boolean | undefined) {
      this.isLoading = false
      this.done = done ? true : false
      this.index++
    },
    onScroll(event: UIEvent) { //use this if scroll hapens in .infinit-loader
      const target = event.target as HTMLDivElement
      let scrollMax = (target.scrollHeight - target.offsetHeight) * (this.isReversed ? -1 : 1)
      if (scrollMax == target.scrollTop && !this.done && !this.isLoading) {
        this.runLoader()
      }
    },
    onLayoutScroll(d: ScrollDetail, maxH: number) {//use this if scroll hapens in .scroll
      if (maxH == d.position) this.runLoader(true)
    }
  },
  mounted() {
    setTimeout(() => {
      // eslint-disable-next-line
      (this.addToOnScrollFunctions as any)(this.onLayoutScroll)
    })
  },
  beforeUnmount() {
    setTimeout(() => {
      // eslint-disable-next-line
      (this.addToOnScrollFunctions as any)(this.onLayoutScroll)
    })
  }
})
</script>

<style scoped>
.infinite-loader {
  height: 100%;
  width: 100%;
  flex-shrink: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.infinite-loader-reversed {
  flex-direction: column-reverse;
}
</style>