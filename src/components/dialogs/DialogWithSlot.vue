<template>
  <q-dialog v-model="value" :maximized="fullscreen">
    <div class="dialog-screen">
      <div class="column no-wrap bg-white" style="max-height: 100vh; height: 100%;">
        <div class="dialog-header">
          <div class="row flex-center" style="position: relative; padding: 16px;">
            <slot name="header" />
            <template v-if="!useBackButton">
              <div class="dialog-close-button">
                <q-btn icon="close" class="bg-white"
                  style="position: absolute; right: 16px; z-index: 1000; transform: translateY(-50%);" flat round dense
                  @click="value = false" />
              </div>
            </template>
            <template v-else>
              <div class="dialog-back-button">
                <q-icon size="24px" v-ripple class="bg-white"
                  style="position: absolute; left: 16px; z-index: 1000; transform: translateY(-50%);" flat round dense
                  @click="value = false">
                  <arrow-left-icon />
                </q-icon>
              </div>
            </template>
          </div>
        </div>
        <div class="dialog-content" style="flex-shrink: 2; height: 100%; overflow: hidden auto; flex-grow: 1;">
          <slot />
        </div>
        <template v-if="$slots.footer">
          <div class="dialog-footer">
            <div class="column flex-center" style="border-top: 1px solid #E8E8E8; padding: 16px;">
              <slot name="footer" />
            </div>
          </div>
        </template>
      </div>
    </div>

  </q-dialog>
</template>

<script lang="ts">
import ArrowLeftIcon from "@/icons/common/ArrowLeftIcon.vue"
import { defineComponent } from "vue"
export default defineComponent({
  name: "DialogWithSlot",
  emits: ['update:show'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
    },
    useBackButton: {
      type: Boolean,
    }
  },
  data() {
    return {
      multipleClickShield: false as boolean,
    };
  },
  computed: {
    value: {
      get(): boolean {
        return this.show;
      },
      set(value: boolean) {
        if (this.multipleClickShield) { this.multipleClickShield = false; return; }
        if (this.value != false) this.$emit('update:show', value);
        this.multipleClickShield = true;
      }
    }
  },
  components: { ArrowLeftIcon }
})
</script>