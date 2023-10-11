<template>
  <div v-if="userData">
    <div class="yellow-area">
      <div class="column" style="gap:24px; background-color: #FF7F0012; padding: 20px 16px;">
        <div class="profile-info">
          <div class="row" style="gap: 20px;">
            <div class="user-avatar" style="flex-shrink: 1;">
              <user-avatar :photo-url="userData.general.photoUrl" size="100px" />
            </div>
            <div class="user-info" style="flex-grow: 1;">
              <div class="column" style="gap:12px">
                <div class="user-basic-info">
                  <div class="column" style="gap:4px">
                    <div class="user-name">
                      <div class="ctitle fw600 fs18 lh18">
                        <template v-if="'surname' in userData.general">
                          <span>{{ userData.general.name }} {{ userData.general.surname }}</span>
                        </template>
                        <template v-else>
                          <span>{{ userData.general.name }}</span>
                        </template>
                      </div>
                    </div>
                    <div class="user-mail">
                      <div class="cstitle fw400 fs14 lh14">
                        <span v-if="userData.settings?.privacy?.showMail != true">
                          {{ userData.account.mail }}
                        </span>
                        <div v-else class="hidden-mail" style="color: transparent;">
                          Mail is hidden by default
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="user-count-info">
                  <div class="row" style="gap:40px">
                    <div class="user-point">
                      <div class="column text-center" style="gap:4px">
                        <div class="fs20 fw600 lh24">
                          {{ userData.counts?.posints ?? 0 }}
                        </div>
                        <div class="fs16 fw400 lh20">
                          Puan
                        </div>
                      </div>
                    </div>
                    <div class="user-followers">
                      <div class="column text-center" style="gap:4px">
                        <div class="fs20 fw600 lh24">
                          {{ userData.counts?.followers ?? 0 }}
                        </div>
                        <div class="fs16 fw400 lh20">
                          Takipçi
                        </div>
                      </div>
                    </div>
                    <div class="user-following">
                      <div class="column text-center" style="gap:4px">
                        <div class="fs20 fw600 lh24">
                          {{ userData.counts?.following ?? 0 }}
                        </div>
                        <div class="fs16 fw400 lh20">
                          Takip
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="user-search-bar">
            <div class="row items-center flex-nowrap" @click="($refs.search as HTMLInputElement).focus()"
              style="background-color: #fff; border-radius: 24px; border: 1px solid #E0E0E0; padding: 3px 16px; gap: 8px;">
              <q-icon size="16px">
                <search-icon />
              </q-icon>
              <q-input ref="search" borderless dense style="flex-grow: 1;" v-model="searchValue"
                placeHolder="Keşfette Ara" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-area">
      <div class="tabs">
        <side-scroll style="height: 50px;">
          <q-tabs v-model="tab" class="ctext" active-color="primary">
            <q-tab name="events" label="Sana Özel Etkinlikler" />
            <q-tab name="users" label="Takip ettiğin kullanıcılar" />
            <q-tab name="atmosphere" label="Atmosfer" />
            <q-tab name="usersForU" label="Sana uygun kullanıcılar" />
          </q-tabs>
        </side-scroll>
      </div>
      <div class="pages">

      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { FunoUser } from '@/types/user'
import { getLocalUserData } from '@/services/app/user'

import UserAvatar from '@/components/app/common/UserAvatar.vue'
import SearchIcon from '@/icons/common/SearchIcon.vue'
import SideScroll from '@/components/app/common/SideScroll.vue'

export default defineComponent({
  name: "UserProfileView",
  components: { UserAvatar, SearchIcon, SideScroll },
  data() {
    return {
      userData_: undefined as FunoUser | undefined,
      searchValue: "",
      tab: "events"
    }
  },
  methods: {
    getLocalUserData() {
      getLocalUserData.pLogger().then(userData => {
        this.userData_ = userData
        console.log("---", this.userData_)
      }
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
})

</script>

<style>
.q-field__prepend {
  padding-right: 8px
}

.q-field--outlined .q-field__control:before {
  background-color: white;
}
</style>