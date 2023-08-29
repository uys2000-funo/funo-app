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
import theHeader from "@/components/app/theHeader.vue"
import theFooter from "@/components/app/theFooter.vue"
import { defineComponent } from "vue";

export default defineComponent({
  components: { theHeader, theFooter }
})
</script>
