<template>
  <div class="event-users">
    <div class="row items-center align-middle" style="height: 28px;">
      <template v-if="!eventUsers.userCount">
        <span class="cptext fs14 fw600 lh18">Kimsecikler Yok</span>
      </template>
      <template v-else-if="eventUsers.userPhotoUrls">
        <template
          v-for="photoUrl, index in  [...eventUsers.userPhotoUrls].reverse().slice(0, eventUsers.userPhotoUrls.length < 4 ? eventUsers.userPhotoUrls.length : 4) "
          :key="index">
          <user-avatar :photo-url="photoUrl" :style="index != 0 ? 'margin-left:-10px' : ''" />
        </template>
        <template v-if="eventUsers.userCount > 4 && eventUsers.userCount < 104">
          <span class="cptext fs14 fw600 lh18">&nbsp;&nbsp;+{{ eventUsers.userCount - 4 }}</span>
        </template>
        <template v-else-if="eventUsers.userCount >= 104">
          <span class="cptext fs14 fw600 lh18">&nbsp;&nbsp;+99</span>

        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { EventUsersData } from "@/types/event"
import UserAvatar from "@/components/app/common/UserAvatar.vue"
export default defineComponent({
  components: { UserAvatar },
  props: {
    eventUsers: {
      type: Object as PropType<EventUsersData>,
      required: true
    }
  }
})
</script>