<template>
  <div class="notifications-page">
    <infinite-loader :is-reversed="true">
      <div class="notifications-page-list">
        <template v-for="notification, index in notifications.data" :key="index">
          <div class="notifications-page-list-element">
            <user-avatar size="56px" :photo-url="notification.data.photoUrl" />
            <div class="notifications-page-list-element-content">
              <div class="notifications-page-list-element-content-title">
                {{ notification.data.title }}
              </div>
              <div class="notifications-page-list-element-content-text">
                {{ notification.data.content }}
              </div>
            </div>
          </div>
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
import UserAvatar from '@/components/app/common/UserAvatar.vue';

export default defineComponent({
  name: "NotificationsView",
  components: { InfiniteLoader, UserAvatar },
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
}

.notifications-page-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

.notifications-page-list-element {
  display: flex;
  gap: 8px;
  align-items: center;
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