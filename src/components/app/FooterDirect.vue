<template>
  <q-footer elevated class="full-width bg-white row flex-center" style="height: 100px;">
    <div class="full-width row justify-around items-end" style="height: 52px; padding: 0 16px;">
      <q-btn stretch no-caps class="bg-primary full-width" @click="runCallback" type="submit">
        {{ buttonText }}
      </q-btn>
    </div>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterDirect",
  props: {
    buttonText: {
      type: String,
      default: "Kaydet"
    },
    callback: {
      type: Function,
      required: true
    }
  },
  methods: {
    runCallback() {
      this.callback ? this.callback() : ""
    }
  }
})
</script>
