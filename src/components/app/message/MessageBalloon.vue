<template>
  <div class="message-balloon" :class="{ sender: isSender }">
    <div class="message-balloon-area">
      <user-avatar :photo-url="message.data.photoUrl" size="36px" />
      <div class="message-balloon-area-balloon">
        {{ message.data.message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Message } from "@/types/messages";
import { PropType, defineComponent } from "vue"
import UserAvatar from "../common/UserAvatar.vue";
export default defineComponent({
  components: { UserAvatar },
  props: {
    isSender: {
      type: Boolean
    },
    message: {
      type: Object as PropType<Message>,
      required: true,
    }
  }
})
</script>
<style scoped>
.message-balloon {
  display: flex;
  width: 100%;
}

.message-balloon-area {
  margin-right: 10vw;
  width: 100%;
  flex-shrink: 1;
  display: flex;
  gap: 8px;
  align-items: center;
}

.sender .message-balloon-area {
  margin-left: 10vw;
  margin-right: 0;
  flex-direction: row-reverse;
}

.message-balloon-area-balloon {
  flex-shrink: 1;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  background: #FFF;
  padding: 12px;
}

.sender .message-balloon-area-balloon {
  background: var(--color-primary2);

}
</style>