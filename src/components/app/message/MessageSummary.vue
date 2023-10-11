<template>
  <div class="message-summary" v-ripple @click="openChatPage">
    <user-avatar :photo-url="photoUrl" size="48px" />
    <div class="message-summary-info">
      <span class="message-summary-info-name">{{ chatName }}</span>
      <span class="message-summary-info-message">{{ lastMessage }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { MessageSummary } from '@/types/messages';

import UserAvatar from "@/components/app/common/UserAvatar.vue";
export default defineComponent({
  components: { UserAvatar },
  props: {
    uID: {
      type: String,
      default: "-uID"
    },
    messageSummary: {
      type: Object as PropType<MessageSummary>,
      required: true
    }
  },
  methods: {
    openChatPage() {
      this.$router.push({ query: { chat: this.messageSummary.mcID }, hash: this.$route.hash })
    }
  },
  computed: {
    photoUrl() {
      const data = this.messageSummary.data
      const index = data.participants.indexOf(this.uID)
      if (index == 0) return data.participantsPhotoUrls[1]
      return data.participantsPhotoUrls[0]
    },
    chatName() {
      const data = this.messageSummary.data
      if (data.chatName != "") return data.chatName
      return ""
    },
    lastMessage() {
      const data = this.messageSummary.data
      if (data.messages && data.messages.length != 0) return data.messages[0].data.message
      return ""
    }
  }
})
</script>

<style>
.message-summary {
  border-top: 1px solid #E8E8E8;
  padding: 12px 4px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  position: relative;
}

.message-summary-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: auto 0;
  width: 100%;
  flex-shrink: 1;
  overflow: hidden;
}

.message-summary-info-name {
  color: var(--color-title);
  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 124%;
  text-transform: capitalize;
}

.message-summary-info-message {
  color: var(--color-text);
  font-family: Source Sans Pro;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 124%;
  letter-spacing: -0.06px;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>