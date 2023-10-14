<template>
  <div class="notifications-page">
    <infinite-loader :is-reversed="false">
      <div class="notifications-page-list">
        <template
          v-for="notification, index in [...notifications.data].sort((a, b) => (b.data.reciveTime - a.data.reciveTime))"
          :key="index">
          <notification-item :funo-fotification="notification" />
        </template>
      </div>
    </infinite-loader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getLocalUserData } from '@/services/app/user'

import { FunoNotifications, FunoNotification } from '@/types/notification';
import { FunoUser } from '@/types/user';

import InfiniteLoader from '@/components/app/common/InfiniteLoader.vue';
import NotificationItem from "@/components/app/notification/NotificationItem.vue"
export default defineComponent({
  name: "NotificationsView",
  components: { InfiniteLoader, NotificationItem },
  props: {
    directAccess: {
      type: Object
    }
  },
  data() {
    return {
      userData_: undefined as FunoUser | undefined,
      notifications: new FunoNotifications()
    }
  },
  methods: {
    getLocalUserData() {
      getLocalUserData.pLogger().then(userData =>
        this.userData_ = userData
      )
    }
  },
  computed: {
    userData(): undefined | FunoUser {
      if (this.userData_) return this.userData_
      this.getLocalUserData()
      return undefined
    },
  },
  mounted() {
    const add = (isFirstTime = true) => {
      if (Math.random() < 0.9 || isFirstTime) {
        this.notifications.data.push(new FunoNotification(true))
        add(false)
      }
    }
    add()
  }
})
</script>

<style scoped>
.notifications-page {
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding-bottom: 10px;
}

.notifications-page-list {
  display: flex;
  flex-direction: column;
}

.notifications-page-list-element {
  padding: 10px 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  border-bottom: 1px solid #E8E8E8;
}

.notifications-page-list-element:last-child {
  border-bottom: 0px none;
}

.notifications-page-list-element.attention {
  background: var(--color-primary1);
}

.notifications-page-list-element-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-shrink: 1;
  overflow: hidden;
  gap: 8px;
}

.notifications-page-list-element-content-title {
  color: var(--color-title);
  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 124%;
  text-transform: capitalize;
}

.notifications-page-list-element-content-text {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: var(--color-text);
  font-family: Source Sans Pro;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 124%;
  /* 14.88px */
  letter-spacing: -0.06px;
}
</style>