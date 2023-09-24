<template>
  <q-header reveal height-hint="107" class="bg-white ctitle">
    <q-toolbar class="text-center">
      <q-toolbar-title style="padding-top: 8px;">
        <funo-text-icon style="height: 30px;" />
      </q-toolbar-title>
    </q-toolbar>
    <template v-if="showUserToolBar">
      <q-toolbar class="text-center ctitle fw600 fs16 lh20" style="padding: 0 16px; border-bottom: 1px solid #E8E8E8;">
        <div class="row flex-center" style="gap:12px">
          <user-avatar :photo-url="userData?.general.photoUrl" />
          Merhaba {{ userData?.general.name }}
        </div>
        <div style="flex-grow: 1; flex-shrink: 1;" />
        <div class="row flex-center" style="gap:8px">
          <q-icon size="37px">
            <alert-icon />
          </q-icon>
          <q-icon size="37px">
            <message-icon />
          </q-icon>
        </div>
      </q-toolbar>
    </template>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import FunoTextIcon from "@/icons/logo/FunoTextIcon.vue"
import MessageIcon from "@/icons/common/MessageIcon.vue"
import AlertIcon from "@/icons/common/AlertIcon.vue"

import UserAvatar from './common/UserAvatar.vue'
import { UserData } from '@/types/user'
import { getLocalUserData } from '@/services/app/user'

export default defineComponent({
  name: "HeaderDefault",
  components: { FunoTextIcon, MessageIcon, AlertIcon, UserAvatar },
  data() {
    return {
      userData_: undefined as UserData | undefined,
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
    userData(): undefined | UserData {
      if (this.userData_) return this.userData_
      this.getLocalUserData()
      return undefined
    },
    showUserToolBar(): boolean {
      const excludedPathNames = ["UserProfileView", "CalendarView", "MapView"]
      if (!this.$route.name) return true
      if (excludedPathNames.indexOf(this.$route.name.toString()) != -1) return false
      return true
    }
  },
})

</script>