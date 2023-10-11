<template>
  <q-avatar :size="size" :square="!photoUrl || photoUrl == ''">
    <template v-if="!photoUrl || photoUrl == ''">
      <funo-icon />
    </template>
    <q-img style="border: solid 1px white;" :src="photoUrl" :ratio="1" />
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
    },
    size: {
      type: String as PropType<string>,
      default: '28px'
    }
  }
})
</script>