<template>
  <q-form class="column" style="padding: 16px; gap: 16px;">
    <div class="fs18 lh27 fw600">
      Lorem Ipsum
    </div>
    <q-input outlined v-model="eventData.general.name" label="Etkinlik Adı" lazy-rules />
    <q-input outlined v-model="eventData.general.description" label="Etkinlik hakkında" type="textarea" lazy-rules />
    <div class="fs18 lh27 fw600">
      Kategori
    </div>
    <q-select outlined v-model="eventData.general.tags.main" :options='["Sport", "Education", "Art", "Meet", "Music"]'
      label="Ana Kategori" />
    <q-input outlined v-model="sideTags" label="Yan Kategoriler" lazy-rules
      placeholder="kategori1, kategori2, kategori3" />
    <div class="fs18 lh27 fw600">
      Lokasyon
    </div>
    <q-input outlined v-model="sideTags" label="Konum seç" lazy-rules />
    <q-input outlined v-model="eventData.general.description" label="Konum Tarifi" type="textarea" lazy-rules />
    <div class="fs18 lh27 fw600">
      Tarih & Zaman
    </div>
    <div class="row no-wrap" style="gap:8px">
      <div style="flex-shrink: 1;">
        <span>
          Başlangıç Tarihi
        </span>
        <q-input outlined v-model="date.start" mask="##.##.####">
          <template v-slot:append>
            <q-icon name=" event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date.start" mask="DD.MM.YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div style="flex-shrink: 1;">
        <span>
          Bitiş Tarihi
        </span>
        <q-input outlined v-model="date.start" mask="##.##.####">
          <template v-slot:append>
            <q-icon name=" event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date.start" mask="DD.MM.YYYY">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="row no-wrap" style="gap:8px">
      <div style="flex-shrink: 1;">
        <span>
          Başlangıç Saati
        </span>
        <q-input outlined v-model="time.start" mask="time" :rules="['time']">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="time.start">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div style="flex-shrink: 1;">
        <span>
          Bitiş Saati
        </span>
        <q-input outlined v-model="time.end" mask="time" :rules="['time']">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="time.end">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="fs18 lh27 fw600">
      Şartlar
    </div>
    <q-input outlined v-model.number="eventData.conditions.userLimit" label="Katılımcı Limiti" type="number" lazy-rules />
    <div class="row justify-between items-center"
      style="border:solid 1px rgba(0, 0, 0, 0.24);; padding: 8px;border-radius: 4px">
      <span>
        18 Yaş Üstü
      </span>
      <q-checkbox v-model="ageLimit" />
    </div>
    <div class="row justify-between items-center"
      style="border:solid 1px rgba(0, 0, 0, 0.24);; padding: 8px;border-radius: 4px">
      <span>
        Onaylı katılım
      </span>
      <q-checkbox v-model="eventData.conditions.needsApproval" />
    </div>
    <div class="fs18 lh27 fw600">
      Fiyat
    </div>
    <q-input outlined v-model.number="eventData.conditions.userLimit" label="Ödenecek Tutar" type="number" lazy-rules />
    <div class="fs18 lh27 fw600">
      Fotoğraf ekle
    </div>
    <div style="height: 182px; width:100%;">
      <image-box :model-value="images" />
    </div>
  </q-form>
</template>
<script lang="ts">
import { EventData } from '@/types/event';
import { defineComponent } from 'vue';
import ImageBox from "@/components/common/ImageBox.vue"
export default defineComponent({
  name: "EventCreateView",
  components: { ImageBox },
  props: {
    directAccess: {
      type: Object
    }
  },
  data() {
    return {
      eventData: new EventData(),
      sideTags: "",
      date: {
        start: "",
        end: ""
      },
      time: {
        start: "",
        end: ""
      },
      images: []
    }
  },
  methods: {
    callback() {
      console.log("this.eventData")
    }
  },
  computed: {
    ageLimit: {
      set(value: boolean) {
        this.eventData.conditions.ageLimit = value ? [0, 18] : [0, 0]
      },
      get(): boolean {
        return this.eventData.conditions.ageLimit && this.eventData.conditions.ageLimit[1] == 18 ? true : false
      }
    }
  }
})
</script>