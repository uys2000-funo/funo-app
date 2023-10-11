<template>
  <q-header reveal height-hint="107" class="bg-white ctitle">
    <q-slide-transition>
      <q-toolbar v-show="showLogo" class="text-center">
        <q-toolbar-title style="padding-top: 8px;">
          <funo-text-icon style="height: 30px;" />
        </q-toolbar-title>
      </q-toolbar>
    </q-slide-transition>
    <q-slide-transition>
      <q-toolbar v-show="showHiToUser" class="text-center ctitle fw600 fs16 lh20"
        style="padding: 0 16px; border-bottom: 1px solid #E8E8E8;">
        <div class="row flex-center" style="gap:12px">
          <user-avatar :photo-url="userData?.data.general.photoUrl" />
          Merhaba {{ userData?.data.general.name }}
        </div>
        <div style="flex-grow: 1; flex-shrink: 1;" />
        <div class="row flex-center" style="gap:8px">
          <router-link :to="{ name: 'NotificationsView', query: { showViewTitle: 'true', viewTitle: 'Bildirimler' } }">
            <q-icon size="37px">
              <alert-icon />
            </q-icon>
          </router-link>
          <router-link :to="{ name: 'MessagesView', query: { showLogo: 'true' } }">
            <q-icon size="37px">
              <message-icon />
            </q-icon>
          </router-link>
        </div>
      </q-toolbar>
    </q-slide-transition>
    <q-slide-transition>
      <div v-show="showViewTitle" class="header-default-view-title-area">
        <div class="header-default-view-title-area-title">
          {{ viewTitle }}
        </div>
        <div class="dialog-back-button">
          <q-icon size="24px" v-ripple class="bg-white"
            style="position: absolute; left: 16px; z-index: 1000; transform: translateY(-50%);" flat round dense
            @click="$router.go(-1)">
            <arrow-left-icon />
          </q-icon>
        </div>
      </div>
    </q-slide-transition>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import FunoTextIcon from "@/icons/logo/FunoTextIcon.vue"
import MessageIcon from "@/icons/common/MessageIcon.vue"
import AlertIcon from "@/icons/common/AlertIcon.vue"
import ArrowLeftIcon from "@/icons/common/ArrowLeftIcon.vue"

import UserAvatar from './common/UserAvatar.vue'
import { FunoUser, IndividualUser } from '@/types/user'
import { getLocalUserData } from '@/services/app/user'

export default defineComponent({
  name: "HeaderDefault",
  components: { FunoTextIcon, MessageIcon, AlertIcon, ArrowLeftIcon, UserAvatar },
  data() {
    return {
      userData_: new IndividualUser() as FunoUser
    }
  },
  methods: {
    getLocalUserData() {
      getLocalUserData.pLogger().then(userData =>
        userData ? this.userData_ = userData : ""
      )
    }
  },
  computed: {
    userData(): undefined | FunoUser {
      if (this.userData_) return this.userData_
      this.getLocalUserData()
      return undefined
    },
    showLogo(): boolean {
      if (!this.$route.query.showLogo) return false
      return this.$route.query.showLogo == "true"
    },
    showHiToUser(): boolean {
      if (!this.$route.query.showHiToUser) return false
      return this.$route.query.showHiToUser == "true"
    },
    showViewTitle(): boolean {
      if (!this.$route.query.showViewTitle) return false
      return this.$route.query.showViewTitle == "true"
    },
    viewTitle(): string {
      if (!this.$route.query.viewTitle) return "NoViewTitle"
      return this.$route.query.viewTitle as string
    }
  },
})

</script>

<style scoped>
.header-default-view-title-area {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 16px;
}

.header-default-view-title-area-title {
  color: var(--color-title);
  text-align: center;
  font-family: Source Sans Pro;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  /* 18.6px */
  letter-spacing: -0.3px;
}
</style>