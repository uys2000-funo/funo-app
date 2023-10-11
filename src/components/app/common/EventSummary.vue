<template>
  <div class="event-summary" :class="{ 'small': small, }">
    <router-link :to="`#event-detail?eID=${funoEvent.eID}?price=${funoEvent.data.conditions.price}`">
      <div class="event-image">
        <div class="event-image-inner">
          <template v-if="funoEvent.data.general.photoUrls && funoEvent.data.general.photoUrls[0]">
            <q-img class="event-image-component" :src="funoEvent.data.general.photoUrls[0]" fit="cover" />
          </template>
          <template v-else>
            <q-img class="event-image-component" :src="require('@/assets/images/logo/funo-text.svg')" fit="contain" />
          </template>
        </div>
        <div class="event-image-overlays">
          <div class="event-main-tag" :style="mainTagColor">
            {{ mainTag }}
          </div>
          <div class="event-like-button bg-white" round v-ripple>
            <q-icon size="20px"><hearth-icon /></q-icon>
          </div>
        </div>
      </div>
      <div class="event-detail">
        <div class="event-general-info">
          <div class="event-main-owner">
            <div class="user-avatar">
              <user-avatar :photo-url="funoEvent.data.owners[0].photoUrl" size="inherit" />
            </div>
            <div class="user-name">
              <template v-if="'surname' in funoEvent.data.owners[0]">
                {{ funoEvent.data.owners[0].name }} {{ funoEvent.data.owners[0].surname }}
              </template>
              <template v-else>
                {{ funoEvent.data.owners[0].name }}
              </template>
            </div>
            <div class="user-approve">
              <template v-if="funoEvent.data.owners[0].isApproved">
                <q-icon size="inherit"><success-icon /></q-icon>
              </template>
            </div>
          </div>
          <div class="event-details">
            <div class="event-time">
              {{ eventShortTime }}
              <q-tooltip transition-show="flip-right" transition-hide="flip-left" :hide-delay="10000">
                <table>
                  <tr>
                    <td style="padding-right: 2px;">
                      Başlangıç:
                    </td>
                    <td>
                      {{ new Date(funoEvent.data.general.date.start).toLocaleDateString("tr") }},
                      {{ new Date(funoEvent.data.general.date.start).toLocaleTimeString("tr") }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Bitiş:
                    </td>
                    <td>
                      {{ new Date(funoEvent.data.general.date.end).toLocaleDateString("tr") }},
                      {{ new Date(funoEvent.data.general.date.end).toLocaleTimeString("tr") }}
                    </td>
                  </tr>
                </table>
              </q-tooltip>
            </div>
            <div class="event-name">
              {{ funoEvent.data.general.name }}
            </div>
          </div>
        </div>
        <div class="event-users">
          <event-users :event-users="funoEvent.data.users" />
        </div>
        <div class="event-location-and-price">
          <div class="event-location-or-app">
            <q-icon class="location-or-app-icon" size="20px">
              <template v-if="'place' in funoEvent.data.general.location">
                <location-icon />
              </template>
              <template v-else>
                <web-hook-icon />
              </template>
            </q-icon>
            <div class="location-or-app-text">
              <template v-if="'place' in funoEvent.data.general.location">
                {{ funoEvent.data.general.location.place }}
              </template>
              <template v-else>
                {{ funoEvent.data.general.location.app }}
              </template>
            </div>
          </div>
          <template v-if="funoEvent.data.conditions.price">
            <div class="event-price">
              {{ funoEvent.data.conditions.price }} ₺
            </div>
          </template>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { FunoEvent } from '@/types/event';
import { PropType, defineComponent } from 'vue';

import UserAvatar from './UserAvatar.vue';
import EventUsers from './EventUsers.vue';

import HearthIcon from '@/icons/common/HearthIcon.vue';
import SuccessIcon from '@/icons/common/SuccessIcon.vue';
import LocationIcon from '@/icons/common/LocationIcon.vue';
import WebHookIcon from '@/icons/common/WebHookIcon.vue';


export default defineComponent({
  components: { HearthIcon, UserAvatar, SuccessIcon, EventUsers, LocationIcon, WebHookIcon, },
  props: {
    funoEvent: {
      type: Object as PropType<FunoEvent>,
      default: new FunoEvent(true, true)
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    mainTag() {
      const tag = this.funoEvent.data.general.tags.main;
      switch (tag) {
        case "art": return "Sanat";
        case "education": return "Eğitim";
        case "meet": return "Buluşma";
        case "sport": return "Spor";
        case "music": return "Müzik";
        case "tech": return "Teknoloji";
        default: return "NotFound";
      }
    },
    mainTagColor() {
      return `background-color: var(--color-category-${this.funoEvent.data.general.tags.main})`;
    },
    eventShortTime() {
      const start = new Date(this.funoEvent.data.general.date.start);
      const end = new Date(this.funoEvent.data.general.date.end);
      return start.toLocaleDateString("tr", { day: "2-digit", month: "long", weekday: "long" }).replace(/ /g, ", ") + ", " +
        start.toLocaleTimeString("tr", { hour: "2-digit", minute: "2-digit" }) + " - " +
        end.toLocaleTimeString("tr", { hour: "2-digit", minute: "2-digit" })
    },
  },
})
</script>

<style scoped>
.event-summary>a {
  text-decoration: none;
  display: block;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.event-summary .event-image {
  position: relative;
}

.event-summary .event-image .event-image-component {
  position: relative;
}

.event-summary .event-image .event-image-component {
  width: 100%;
  height: 140px;
}

.event-summary.small .event-image .event-image-component {
  width: 224px;
  height: 120px;
}


.event-summary .event-image .event-main-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 6px 12px;
  border-radius: 600px;

  /* Font */
  color: var(--color-button-text);
  font-family: Source Sans Pro;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  letter-spacing: -0.12px;
}

.event-summary .event-image .event-like-button {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.event-summary .event-detail {
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
}

.event-summary .event-detail .event-general-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.event-summary .event-detail .event-general-info .event-main-owner {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  width: fit-content;
}

.event-summary .event-detail .event-general-info .event-main-owner .user-avatar {
  font-size: 24px;
}

.event-summary.small .event-detail .event-general-info .event-main-owner .user-avatar {
  font-size: 18px;
}

.event-summary .event-detail .event-general-info .event-main-owner .user-name {
  color: var(--color-text);
  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  /* 12.4px */

  margin-bottom: -3px;
}

.event-summary.small .event-detail .event-general-info .event-main-owner .user-name {
  font-size: 10px;

}

.event-summary .event-detail .event-general-info .event-main-owner .user-approve {
  font-size: 24px;
}

.event-summary.small .event-detail .event-general-info .event-main-owner .user-approve {
  font-size: 18px;
}

.event-summary .event-detail .event-general-info .event-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.event-summary .event-detail .event-general-info .event-details .event-time {
  color: var(--color-alert);
  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  /* 14.88px */
}

.event-summary.small .event-detail .event-general-info .event-details .event-time {
  font-size: 12px;
}

.event-summary .event-detail .event-general-info .event-details .event-name {
  color: var(--color-title);
  font-family: Source Sans Pro;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  /* 17.36px */
}

.event-summary.small .event-detail .event-general-info .event-details .event-name {
  font-size: 14px;
}

.event-summary .event-detail .event-location-and-price {
  display: flex;
  flex-direction: row;
}

.event-summary .event-detail .event-location-and-price .event-location-or-app {
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 2px;
}

.event-summary .event-detail .event-location-and-price .event-location-or-app .location-or-app-icon {
  color: var(--color-title);
}

.event-summary .event-detail .event-location-and-price .event-location-or-app .location-or-app-text {
  margin-bottom: -1px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 140px;
  overflow: hidden;

  color: var(--color-sub-title);
  font-family: Source Sans Pro;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  /* 12.4px */
}

.event-summary.small .event-detail .event-location-and-price .event-location-or-app .location-or-app-text {
  font-size: 10px;
}

.event-summary .event-detail .event-location-and-price .event-price {
  color: var(--color-primary);
  font-family: Source Sans Pro;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  /* 16.12px */
}

.event-summary.small .event-detail .event-location-and-price .event-price {
  font-size: 13px;
}
</style>