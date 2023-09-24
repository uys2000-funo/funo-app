<template>
  <q-footer reveal class="ctitle bg-white">
    <div class="full-width row justify-around" style="height: 78px; overflow-y:visible; padding-bottom: 18px;">
      <q-btn flat dense rounded no-caps style="width: 72px; height: 42px; margin-top: 12px;" :to="{ name: 'HomeView' }"
        :disable="isHomeActive">
        <div class="column justify-center content-center items-center" style="gap:2px">
          <q-icon size="24px">
            <home-icon />
          </q-icon>
          <span style="font-weight: 400; color: #7B7B7B; line-height: 15px;">
            Anasayfa
          </span>
        </div>
      </q-btn>
      <q-btn flat dense rounded no-caps style="width: 72px; height: 42px; margin-top: 12px;"
        :to="{ name: 'CalendarView' }" :disable="isCalendarActive">
        <div class="column justify-center content-center items-center" style="gap:2px">
          <q-icon size="24px">
            <calendar-plus-icon />
          </q-icon>
          <span style="font-weight: 400; color: #7B7B7B; line-height: 15px;">
            Takvim
          </span>
        </div>
      </q-btn>
      <q-btn flat dense round no-caps class="bg-secondary"
        style="width: 69px; height: 69px; border: 1px solid #3C485332; margin-top: -9px;" :to="{ name: 'DiscoverView' }"
        :disable="isDiscoverActive">
        <div class=" column justify-center content-center items-center" style="gap:2px">
          <q-icon size="28px">
            <funo-icon :color="isDiscoverActive ? undefined : '#3C4853'" />
          </q-icon>
          <span style="font-size: 12px; font-weight: 400; color: #7B7B7B; line-height: 15px;">
            Keşfet
          </span>
        </div>
      </q-btn>
      <q-btn flat dense rounded no-caps style="width: 72px; height: 42px; margin-top: 12px;" :to="{ name: 'MapView' }"
        :disable="isMapActive">
        <div class="column justify-center content-center items-center" style="gap:2px">
          <q-icon size=" 24px">
            <world-icon />
          </q-icon>
          <span style="font-weight: 400; color: #7B7B7B; line-height: 15px;">
            Harita
          </span>
        </div>
      </q-btn>
      <q-btn flat dense rounded no-caps style="width: 72px; height: 42px; margin-top: 12px;"
        :to="{ name: 'UserProfileView' }" :disable="isUserActive">
        <div class="column justify-center content-center items-center" style="gap:2px">
          <q-icon size="24px">
            <account-icon />
          </q-icon>
          <span style="font-weight: 400; color: #7B7B7B; line-height: 15px;">
            Profilim
          </span>
        </div>
      </q-btn>
    </div>
  </q-footer>
</template>

<script lang="ts">

import HomeIcon from "@/icons/common/HomeIcon.vue";
import CalendarPlusIcon from "@/icons/common/CalendarPlusIcon.vue";
import AccountIcon from "@/icons/common/AccountIcon.vue";
import WorldIcon from "@/icons/common/WorldIcon.vue";
import FunoIcon from "@/icons/logo/FunoIcon.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "FooterDefault",
  components: { HomeIcon, CalendarPlusIcon, AccountIcon, WorldIcon, FunoIcon },
  computed: {
    isHomeActive(): boolean {
      return this.$route.name == "HomeView"
    },
    isCalendarActive(): boolean {
      return this.$route.name == "CalendarView"
    },
    isDiscoverActive(): boolean {
      return this.$route.name == "DiscoverView"
    },
    isMapActive(): boolean {
      return this.$route.name == "MapView"
    },
    isUserActive(): boolean {
      return this.$route.name == "UserView"
    }
  }
})
</script>

<style lang="scss">
.q-btn.disabled * {
  color: $primary !important;
  fill: $primary !important;
}
</style>