<template>
  <q-card>
    <template v-if="eventData.general.photoUrls.length > 1">
      <q-carousel animated v-model="slide" arrows infinite style="width: 224px; height: 126px;" :ratio="16 / 9">
        <template v-for="photoUrl, index in eventData.general.photoUrls" :key="index">
          <q-carousel-slide :name="index" :img-src="photoUrl" />
        </template>
      </q-carousel>
    </template>
    <template v-else-if="eventData.general.photoUrls.length == 1">
      <q-img :src="eventData.general.photoUrls[0]" spinner-color="white" style="width: 224px;" :ratio="16 / 9" />
    </template>
    <template v-else>
      <q-img spinner-color="white" style="width: 224px;" :ratio="16 / 9">
        <funo-text-icon />
      </q-img>
    </template>
    <q-card-section>
      <div class="row items-center" style="gap:4px">
        <user-avatar photo-url="">
        </user-avatar>
        <span class="fw600 fs10 lh12">
          Sarıyer Belediyesi
        </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';

import UserAvatar from './UserAvatar.vue';
import { EventData } from '@/types/event';
import FunoTextIcon from '@/icons/logo/FunoTextIcon.vue';
export default defineComponent({
  components: { UserAvatar, FunoTextIcon },
  props: {
    eventData: {
      type: Object as PropType<EventData>,
      required: true
    }
  },
  data() {
    return {
      slide: 0
    }
  }
})
</script>

