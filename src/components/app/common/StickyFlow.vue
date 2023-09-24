<template>
  <div class="sticky-item">
    <div class="sticky-item-target" :style="`top:${top}px; position:${fixed ? 'fixed' : 'relative'}`">
      <slot />
    </div>

    <div class="sticky-item-replacement" :style="`${fixed ? replacementValues : 'display:none;'}`">{{ replacementValues }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      replacementValues: "",
      header: undefined as undefined | HTMLDivElement,
      target: undefined as undefined | HTMLDivElement,

      headerHeight: 0,
      upperHeight: 0,

      fixed: false,
      height: 0,
      top: 0,
    }
  },
  methods: {
    setReplacementValues(target: HTMLDivElement) {
      this.replacementValues = `height:${target.clientHeight}px`
    },
    async getHeaderStatus(count = 0): Promise<boolean> {
      return new Promise((resolve, reject) => {
        if (this.header) return resolve(this.header.classList.contains("q-header--hidden"));
        this.header = document.querySelector(".q-header") as HTMLDivElement;
        if (count < 5) setTimeout(async () => resolve(await this.getHeaderStatus(count++)), 10)
        else reject(false)
      })
    },
    async getHeaderHeight(count = 0): Promise<number> {
      return new Promise((resolve, reject) => {
        if (this.header) return resolve(this.header.clientHeight);
        this.header = document.querySelector(".q-header") as HTMLDivElement;
        if (count < 5) setTimeout(async () => resolve(await this.getHeaderHeight(count++)), 10)
        else reject(0)
      })
    },
    async getUpperHeight(count = 0): Promise<number> {
      return new Promise((resolve, reject) => {
        if (this.target) return resolve(this.target.offsetTop);
        this.target = document.querySelector(".sticky-item") as HTMLDivElement;
        if (count < 5) setTimeout(async () => resolve(await this.getUpperHeight(count++)), 10)
        else reject(0)
      })
    },
    async updateFixed(scrollTop = 0) {
      const headerStatus = await this.getHeaderStatus()
      if (headerStatus) this.fixed = scrollTop > this.upperHeight
      else this.fixed = scrollTop > this.upperHeight - this.headerHeight
    },
    async updateTop() {
      const headerStatus = await this.getHeaderStatus()
      if (!this.fixed) return this.top = 0
      if (headerStatus) this.top = 0
      else this.top = this.headerHeight
    }
  },
  mounted() {
    this.getHeaderHeight.pLogger().then(value => this.headerHeight = value)
    this.getUpperHeight.pLogger().then(value => this.upperHeight = value)
    const scroll = document.querySelector(".scroll") as HTMLDivElement
    scroll.addEventListener("scroll", (value) => {
      const scrollTop = (value.target as HTMLDivElement).scrollTop
      this.setReplacementValues(this.target as HTMLDivElement)
      this.updateFixed(scrollTop)
      this.updateTop()
    })
  }
})
</script>


<style scoped>
.sticky-item {
  width: max-content;
}

.sticky-item-target {
  z-index: 100;
}
</style>