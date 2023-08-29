<template>
  <q-avatar size="28px">
    <template v-if="imageUrl != ''">
      <funo-icon />
    </template>
    <img :src="imageUrl">
  </q-avatar>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import FunoIcon from "@/icons/logo/FunoIcon.vue"

export default defineComponent({
  components: { FunoIcon },
  props: {
    imageUrl: {
      type: String as PropType<string | undefined>,
    }
  }
})
</script>