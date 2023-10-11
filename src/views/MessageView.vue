<template>
  <div class="chat-page">
    <div class="chat-page-user">
      <user-avatar size="48px" :photo-url="user.data.general.photoUrl" />
      <div class="chat-page-user-name">
        <template v-if="'surname' in user.data.general">
          {{ user.data.general.name }} {{ user.data.general.surname }}
        </template>
        <template v-else>
          {{ user.data.general.name }}
        </template>
      </div>
    </div>
    <div class="chat-page-messages">
      <infinite-loader :is-reversed="true">
        <div class="chat-page-messages-list">
          <template v-for="message, index in messages.data" :key="index">
            <message-balloon :message="message" :is-sender="message.data.uID == user.uID" />
          </template>
        </div>
      </infinite-loader>
    </div>
    <div class="chat-page-input">
      <q-form @submit.prevent="sendMessage">
        <q-input v-model="message" placeholder="Mesaj" outlined rounded>
          <template #append>
            <q-btn @click="sendMessage" class="btn" type="submit" icon="send" text-color="white" color="primary"
              round></q-btn>
          </template>
        </q-input>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import UserAvatar from '@/components/app/common/UserAvatar.vue';
import InfiniteLoader from '@/components/app/common/InfiniteLoader.vue';

import MessageBalloon from '@/components/app/message/MessageBalloon.vue';
import { defineComponent } from 'vue';

import { FunoUser, IndividualUser } from '@/types/user';
import { Message, MessageList } from '@/types/messages';
export default defineComponent({
  components: { UserAvatar, InfiniteLoader, MessageBalloon },
  props: {
    directAccess: {
      type: Object
    }
  },
  data() {
    return {
      message: "",
      user: new IndividualUser(true) as FunoUser,
      messages: new MessageList(true)
    }
  },
  methods: {
    sendMessage() {
      const message = new Message()
      message.data.message = this.message
      message.data.uID = this.user.uID as string
      this.messages.data.push(message)
    }
  },
})
</script>

<style scoped>
.chat-page {
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  flex-direction: column;
}

.chat-page-user {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
  background-color: var(--color-primary1);
}

.chat-page-user-name {
  flex-grow: 1;
}

.chat-page-messages {
  height: 100%;
  overflow: hidden;
  flex-shrink: 1;
}

.chat-page-messages-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.chat-page-input {
  padding: 8px 16px;
}
</style>