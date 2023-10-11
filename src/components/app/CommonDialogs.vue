<template>
  <dialog-with-slot v-model:show="showEventDetail" fullscreen use-back-button>
    <event-detail-view />
    <template #header>
      <span class="ctitle fs15 fw600 lh19">
        Etkinlik Detay
      </span>
    </template>
    <template #footer>
      <div class="event-detail-price-and-join" style="width: 100%;">
        <div class="row no-wrap">
          <template v-if="$route.hash.split('?')[2].split('=')[1] != 'null'">
            <div class="event-detail-price" style="width: 100%; flex-shrink: 1;">
              <div class="column" style="gap: 2px">
                <div class="event-detail-price-text">
                  <span class="cstitle fs14 fw600 lh17">
                    Ödenecek Tutar
                  </span>
                </div>
                <div class="event-detail-price-amount">
                  <span class="ctitle fs16 fw600 lh19">
                    ₺{{ $route.hash.split("?")[2].split("=")[1] }}
                  </span>
                </div>
              </div>
            </div>
          </template>
          <div class="event-detail-join" style="width: 100%; flex-shrink: 1; min-height: 47px;">
            <div class="fit" style="border-radius: 4px; overflow: hidden;">
              <q-btn no-caps stretch class="fit bg-primary">
                <span>
                  Etkinliğe Katıl
                </span>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </template>
  </dialog-with-slot>


  <dialog-with-slot v-model:show="showEventCreate" fullscreen use-back-button>
    <event-create-view />
    <template #header>
      <span class="ctitle fs15 fw600 lh19">
        Etkinlik Oluştur
      </span>
    </template>
    <template #footer>
      <div class="event-create-button" style="width: 100%;">
        <div class="row no-wrap">
          <div class="full-width" style="border-radius: 4px; overflow: hidden; flex-shrink: 1; min-height: 52px">
            <q-btn no-caps stretch class="fit bg-primary">
              <span class="cbtext fs16 fw700 lh20">
                Devam et
              </span>
            </q-btn>
          </div>
        </div>
      </div>
    </template>
  </dialog-with-slot>

  <dialog-with-slot v-model:show="showMessage" fullscreen use-back-button>
    <message-view />
    <template #header>
      <span class="ctitle fs15 fw600 lh19">
        Sohbet
      </span>
    </template>
  </dialog-with-slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import DialogWithSlot from '@/components/dialogs/DialogWithSlot.vue';
import EventDetailView from '@/views/EventDetailView.vue';
import EventCreateView from '@/views/EventCreateView.vue';
import MessageView from '@/views/MessageView.vue';
export default defineComponent({
  components: { DialogWithSlot, EventDetailView, EventCreateView, MessageView },
  computed: {
    showEventDetail: {
      get() {
        return this.$route.hash.startsWith("#event-detail")
      },
      set() {
        this.$router.go(-1)
      }
    },
    showEventCreate: {
      get(): boolean {
        return this.$route.hash == "#event-create"
      },
      set() {
        this.$router.go(-1)
      }
    },
    showMessage: {
      get(): boolean {
        return this.$route.query.chat != "" && this.$route.query.chat != undefined
      },
      set() {
        this.$router.go(-1)
      }
    },
  }
})

</script>