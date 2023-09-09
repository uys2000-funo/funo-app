<template>
  <q-card>
    <!-- #region Header Image -->
    <template v-if="!eventData.general.photoUrls">
      <q-img spinner-color="white" style="width: 224px;" :ratio="16 / 9">
        <funo-text-icon />
      </q-img>
    </template>
    <template v-else-if="eventData.general.photoUrls.length > 1">
      <q-carousel animated v-model="slide" arrows infinite style="width: 224px; height: 126px;" :ratio="16 / 9">
        <template v-for="photoUrl, index in eventData.general.photoUrls" :key="index">
          <q-carousel-slide :name="index" :img-src="photoUrl" />
        </template>
      </q-carousel>
    </template>
    <template v-else>
      <q-img :src="eventData.general.photoUrls[0]" spinner-color="white" style="width: 224px;" :ratio="16 / 9" />
    </template>
    <!-- #endregion -->
    <!-- #region Description -->
    <q-card-section style="padding: 8px;">
      <!-- #region Description Upper Text -->
      <div class="row items-center" style="gap:4px">
        <user-avatar photo-url="" />
        <span class="ct2 fw600 fs10 lh12">
          {{ eventData.owners[0].name }}
        </span>
        <template v-if="eventData.owners[0].isApproved">
          <q-icon size="18px">
            <success-icon />
          </q-icon>
        </template>
      </div>
      <div>
        <span class="ctred fw600 fs12 lh14">
          {{ date }}
        </span>
      </div>
      <!-- #endregion -->
      <!-- #region Description Use Images -->
      <div class="row items-center align-middle" style="height: 28px;">
        <template v-if="!eventData.users.userCount">
          <span>Kimsecikler Yok</span>
        </template>
        <template v-else-if="eventData.users.userPhotoUrls">
          <template
            v-for="photoUrl, index in  [...eventData.users.userPhotoUrls].reverse().slice(0, eventData.users.userPhotoUrls.length < 4 ? eventData.users.userPhotoUrls.length : 4) "
            :key="index">
            <user-avatar :photo-url="photoUrl" :style="index != 0 ? 'margin-left:-10px' : ''" />
          </template>
          <template v-if="eventData.users.userCount > 4 && eventData.users.userCount < 104">
            &nbsp;&nbsp;+{{ eventData.users.userCount - 4 }}
          </template>
          <template v-else-if="eventData.users.userCount >= 104">
            &nbsp;&nbsp;+99
          </template>
        </template>
      </div>
      <!-- #endregion -->
      <!-- #region Description Bottom Text & Price -->
      <div class="row justify-between align-middle no-wrap" style="flex-shrink: 1;">
        <div class="row items-center cs fw600 fs10 lh12" style="gap:2px; ">
          <template v-if="'place' in eventData.general.location">
            <q-icon size="20px">
              <location-icon class="ft" />
            </q-icon>
            <span>
              {{ eventData.general.location.place }}
            </span>
          </template>
          <template v-else>
            <q-icon size="20px">
              <web-hook-icon class="ft" />
            </q-icon>
            <span>
              {{ eventData.general.location.app }}
            </span>
          </template>
        </div>
        <template v-if="eventData.conditions.price">
          <span class="fs13 fw600 lh16 cb">
            ₺ {{ eventData.conditions.price }}
          </span>
        </template>
      </div>
      <!-- #endregion -->
    </q-card-section>
    <!-- #endregion -->
  </q-card>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';

import UserAvatar from './UserAvatar.vue';
import { EventData } from '@/types/event';
import FunoTextIcon from '@/icons/logo/FunoTextIcon.vue';
import LocationIcon from '@/icons/common/LocationIcon.vue';
import WebHookIcon from '@/icons/common/WebHookIcon.vue';
import SuccessIcon from '@/icons/common/SuccessIcon.vue';
export default defineComponent({
  name: "EventMini",
  components: { UserAvatar, FunoTextIcon, LocationIcon, WebHookIcon, SuccessIcon },
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
  },
  computed: {
    date() {
      const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi",]
      const date = new Date(this.eventData.general.date.start)
      const dateTextDate = date.toLocaleDateString("TR", { day: "numeric", month: "long" })
      const dateTextDay = date.getDay()

      const timeText = date.toLocaleTimeString("TR", { hour: "2-digit", minute: "2-digit" })

      const dateEnd = new Date(this.eventData.general.date.end)

      const end = dateEnd.toLocaleDateString("TR") == date.toLocaleDateString("TR") ? dateEnd.toLocaleTimeString("TR", { hour: "2-digit", minute: "2-digit" }) : "..."
      return `${dateTextDate}, ${days[dateTextDay]}, ${timeText} - ${end}`
    }
  }
})
</script>

