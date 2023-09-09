<template>
  <q-layout view="hHh lpR fFf" container>
    <the-header :header-text="headerText" />
    <template v-if="showFooter">
      <the-footer :button-text="buttonText" :callback="() => ($refs.view as any)?.callback" />
    </template>
    <q-page-container>
      <router-view v-slot="{ Component }">
        <component ref="view" :is="Component" />
      </router-view>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import theHeader from "@/components/app/HeaderDirect.vue"
import theFooter from "@/components/app/FooterDirect.vue"
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppDirectLayout",
  components: { theHeader, theFooter },

  data() {
    return {
      showFooter: false,
      headerText: "",
      buttonText: "",
    }
  },
  methods: {
    callback() {
      (this.$refs.view as any)?.callback()
    },
  },
  mounted() {
    const view = (this.$refs.view as any)
    this.showFooter = view?.callback != undefined ? true : false
    this.headerText = view?.directAccess != undefined ? view?.directAccess.headerText : undefined
    this.buttonText = view?.directAccess != undefined ? view?.directAccess.buttonText : undefined
  }
})
</script>
