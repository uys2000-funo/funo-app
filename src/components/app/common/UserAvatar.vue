<template>
  <q-avatar size="28px">
    <template v-if="!photoUrl || photoUrl == ''">
      <funo-icon />
    </template>
    <img :src="photoUrl" style="border: solid 1px white">
  </q-avatar>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import FunoIcon from "@/icons/logo/FunoIcon.vue"

export default defineComponent({
  name: "UserAvatar",
  components: { FunoIcon },
  props: {
    photoUrl: {
      type: String as PropType<string | undefined>,
    }
  }
})
</script>