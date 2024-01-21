<template>
  <template v-if="data.reciveTime < Date.now()">
    <div class="notifications-page-list-element" :class="{ attention: !data.isReaded }">
      <user-avatar size="56px" :photo-url="data.photoUrl" />
      <div class="notifications-page-list-element-content">
        <div class="notifications-page-list-element-content-title">
          {{ data.title }}
        </div>
        <div class="notifications-page-list-element-content-text">
          {{ time }}
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { FunoNotification, NotificationData } from '@/types/notification';
import UserAvatar from '@/components/app/common/UserAvatar.vue';

export default defineComponent({
  components: { UserAvatar },
  props: {
    funoFotification: {
      type: Object as PropType<FunoNotification>,
      default: new FunoNotification()
    }
  },
  computed: {
    data(): NotificationData {
      return this.funoFotification.data
    },
    time() {
      const s = 60
      const m = s * 60
      const h = m * 60
      const d = h * 24
      const itemTime = Math.floor((Date.now() - this.data.reciveTime) / 1000);
      if (itemTime > d)
        return `${Math.ceil(itemTime / d)} Gün Önce`
      if (itemTime > h)
        return `${Math.ceil(itemTime / h)} Saat Önce`
      if (itemTime > m)
        return `${Math.ceil(itemTime / d)} Dakika Önce`
      if (itemTime > s)
        return `${Math.ceil(itemTime / s)} Saniye Önce`
      return "Az Önce"
    }
  }
})
</script>