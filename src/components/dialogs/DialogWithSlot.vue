<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ header }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <slot />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "DialogWithSlot",
  props: {
    show: {
      type: Boolean,
    },
    fullscreen: {
      type: Boolean,
    },
    header: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  watch: {
    show() {
      this.dialog = this.show
    }
  }
})
</script>