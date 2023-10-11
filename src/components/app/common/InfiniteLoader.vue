<template>
  <div style="height: 100%; display: flex; flex-direction: column; overflow: hidden;">
    <div @scrollend="onScroll" class="infinite-loader" :class="{ 'infinite-loader-reversed': isReversed }" ref="loader">
      <slot />
      <template v-if="isLoading">
        <div class="text-center">
          <q-spinner-ball color="primary" size="48px" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';

export default defineComponent({
  name: "InfiniteLoader",
  props: {
    isReversed: {
      type: Boolean
    },
    onLoad: {
      type: Function as PropType<(index: number, endLoader: (done?: boolean | undefined) => void) => void>,
      default: (index: number, done: (stop?: boolean | undefined) => void) => {
        console.log("Loading Started", index)
        setTimeout(() => {
          console.log("Loading Ended", index)
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
    startLoader() {
      this.isLoading = true
      setTimeout(() => {
        const target = this.$refs.loader as HTMLDivElement
        const toScroll = target.scrollHeight * (this.isReversed ? -1 : 1)
        target.scrollTo(0, toScroll)
      })
    },
    runLoader() {
      this.startLoader()
      this.onLoad(this.index, this.endLoader)
    },
    endLoader(done: boolean | undefined) {
      this.isLoading = false
      this.done = done ? true : false
      this.index++
    },
    onScroll(event: UIEvent) {
      const target = event.target as HTMLDivElement
      let scrollMax = (target.scrollHeight - target.offsetHeight) * (this.isReversed ? -1 : 1)
      if (scrollMax == target.scrollTop) {
        this.runLoader()
      }
    }
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