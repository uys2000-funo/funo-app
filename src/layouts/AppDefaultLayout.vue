<template>
  <q-layout view="hHh lpR fFf" container>
    <the-header />
    <the-footer />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import theHeader from "@/components/app/HeaderDefault.vue"
import theFooter from "@/components/app/FooterDefault.vue"
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppDefaultLayout",
  components: { theHeader, theFooter }
})
</script>
