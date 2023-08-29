<template>
  <q-infinite-scroll @load="onLoad" :offset="250">
    <slot />
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';

type OnLoad = (index: number, done: (stop?: boolean | undefined) => void) => void
export default defineComponent({
  props: {
    onLoad: {
      type: Function as PropType<OnLoad>,
    }
  }
})
</script>