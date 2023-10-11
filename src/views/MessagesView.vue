<template>
  <div class="messages-page">
    <sticky-flow>
      <q-tabs v-model="page" no-caps class="messages-page-tabs" active-class="messages-page-tabs-active"
        indicator-color="primary">
        <q-tab class="messages-page-tabs-tab" name="#suggestions" label="İdeal Etkinlik Arkadaşları" />
        <q-tab class="messages-page-tabs-tab" name="#messages" label="Mesajlarım" />
      </q-tabs>
    </sticky-flow>
    <q-carousel class=" messages-page-content" v-model="page" transition-prev="slide-right" transition-next="slide-left"
      swipeable animated control-color="white" height="max-content">
      <q-carousel-slide class="messages-page-content-page" name="#suggestions">
        test
      </q-carousel-slide>
      <q-carousel-slide class="messages-page-content-page" name="#messages">
        <infinite-loader :is-reversed="true">
          <div class="chat-page-messages-list">
            <template v-for="messageSummary, index in MessageSummaries" :key="index">
              <message-summary-vue :u-i-d="(userData?.uID as string)" :message-summary="messageSummary" />
            </template>
          </div>
        </infinite-loader>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getLocalUserData } from '@/services/app/user'
import { getLayoutQueries } from "@/services/app/router"

import { MessageSummary } from '@/types/messages';
import { FunoUser } from '@/types/user';

import StickyFlow from '@/components/app/common/StickyFlow.vue';
import InfiniteLoader from '@/components/app/common/InfiniteLoader.vue';
import MessageSummaryVue from '@/components/app/message/MessageSummary.vue';
export default defineComponent({
  name: "MessagesView",
  components: { StickyFlow, InfiniteLoader, MessageSummaryVue },
  props: {
    directAccess: {
      type: Object
    }
  },
  data() {
    return {
      userData_: undefined as FunoUser | undefined,
      tab: "#messages" as "#suggestions" | "#messages",
      MessageSummaries: [] as MessageSummary[]
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
    page: {
      get() {
        if (this.$route.hash == "#suggestions") return "#suggestions"
        else return "#messages"
      },
      set(value: string) {
        this.$router.push({ hash: value, query: { ...getLayoutQueries(this.$route) } })
      }
    }
  },
  mounted() {
    const addMessages = (isFirstTime = true) => {
      if (Math.random() < 0.9 || isFirstTime) {
        this.MessageSummaries.push(new MessageSummary(true))
        addMessages(false)
      }
    }
    addMessages()
  }
})
</script>

<style scoped>
.messages-page {
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.messages-page-tabs {
  width: 100vw;
  /*background-color: white;*/
  color: var(--color-text);
  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  /* 17.36px */
  text-transform: capitalize;
}

.messages-page-tabs-tab {
  width: 50%;
}

.messages-page-tabs::after {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  z-index: -1;
  background-color: #E8E8E8;
  bottom: 0px;
}

.messages-page-tabs-active {
  color: var(--color-title);
  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 124%;
  /* 17.36px */
  text-transform: capitalize;
}

.messages-page-content-page {
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0 16px;
}
</style>