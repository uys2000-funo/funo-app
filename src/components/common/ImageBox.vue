<template>
  <div class="fit row flex-wrap" style="position: relative; border-radius: 8px; border: 2px #150C0010 solid; gap: 6px;">
    <q-icon size="80px" style="z-index: -1; position: absolute; top:50%; left: 50%; transform: translate(-50%,-50%);">
      <image-icon />
    </q-icon>
    <div class="row" @click="($refs.input as HTMLInputElement)?.click"
      style="z-index:100; position: absolute; bottom: 12px; right: 12px; padding: 6px;border-radius: 20px; background-color: #150C0072;">
      <q-icon size="16px" style="margin: auto;"><camera-icon /></q-icon>
    </div>
    <q-scroll-area style="height: 100%; width: 100%;">
      <div class="row flex-wrap" style="gap: 5%; padding: 5%; padding-bottom: 0px;">
        <template v-for="imageURL, index in imageUrls" :key="index">
          <q-img :src="imageURL"
            style="border: solid 1px #00000020; height: 50px; width: 30%; background-color: white; margin-bottom: 5%;" />
        </template>
      </div>
    </q-scroll-area>
  </div>
  <input ref="input" type="file" accept="image/*" class="hidden" @change="addImage" />
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue"
import ImageIcon from "@/icons/common/ImageIcon.vue"
import CameraIcon from "@/icons/common/CameraIcon.vue"
export default defineComponent({
  name: "ImageBox",
  components: { ImageIcon, CameraIcon },
  props: { modelValue: { type: Array as PropType<File[]>, default: [] as File[] } },
  emits: ['update:modelValue'],
  data() {
    return { imageUrls: [] as string[], reader: new FileReader() }
  },
  computed: {
    values: {
      get(): File[] { return this.modelValue },
      set(value: File[]) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  methods: {
    addImageData() {
      const dataUrl = this.reader.result
      this.imageUrls.push(dataUrl as string)
    },
    addImage(value: Event) {
      const files = (value.target as HTMLInputElement).files
      if (!(files && files.length != 0 && this.values)) return;
      this.values = this.values.concat([files[0]])
      this.reader.readAsDataURL(files[0]);
    }
  },
  mounted() {
    this.reader.onload = this.addImageData
  }
})
</script>