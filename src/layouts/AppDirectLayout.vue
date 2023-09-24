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
    <common-dialogs />
  </q-layout>
</template>
<script lang="ts">
import theHeader from "@/components/app/HeaderDirect.vue"
import theFooter from "@/components/app/FooterDirect.vue"
import { defineComponent } from "vue";
import CommonDialogs from "@/components/app/CommonDialogs.vue";
export default defineComponent({
  name: "AppDirectLayout",
  components: { theHeader, theFooter, CommonDialogs },

  data() {
    return {
      showFooter: false,
      headerText: "",
      buttonText: "",
    }
  },
  methods: {
    callback() {
      (this.$refs.view as typeof CommonDialogs)?.callback()
    },
  },
  mounted() {
    const view = (this.$refs.view as typeof CommonDialogs)
    this.showFooter = view?.callback != undefined ? true : false
    this.headerText = view?.directAccess != undefined ? view?.directAccess.headerText : undefined
    this.buttonText = view?.directAccess != undefined ? view?.directAccess.buttonText : undefined
  }
})
</script>
