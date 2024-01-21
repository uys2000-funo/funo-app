<template>
  <div class="user">
    <q-img class="user-body" :src="data.general.photoUrl" :ratio="1">
      <q-knob show-value class="user-body-precentage" :class="{ matched: data.match.percentage == 100 }"
        v-model="data.match.percentage" size="35px" />
      <div class="user-body-detail">
        <div class="user-body-detail-name">
          {{ data.general.name }}, {{ data.general.age }}
        </div>
        <div class="user-body-detail-reason">
          {{ data.match.reason }}
        </div>
      </div>
    </q-img>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { SuggestedUser, SuggestedUserData } from "@/types/user"
export default defineComponent({
  props: {
    suggestedUser: {
      type: Object as PropType<SuggestedUser>,
      default: new SuggestedUser()
    }
  },
  computed: {
    data(): SuggestedUserData {
      return this.suggestedUser.data
    }
  }
})
</script>

<style scoped>
.user {
  width: 100%;
  border-radius: 8px;
}

.user-body {
  width: 100%;
  position: relative;
}

.user-body-precentage {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 35px;
  height: 35px;
  padding: 3px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  color: var(--color-primary);
  font-family: Poppins;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  background-color: white;
  text-transform: capitalize;
}

.user-body-precentage.matched {
  background-color: var(--color-primary);
  color: white;
}

.user-body-detail {
  background-color: transparent;
  bottom: 0;
}

.user-body-detail-name {
  color: #FFF;
  font-family: Source Sans Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  text-transform: capitalize;
  text-shadow: 1px 1px #000;
}

.user-body-detail-reason {
  color: #FFF;
  font-family: Source Sans Pro;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 124%;
  text-transform: capitalize;
  text-shadow: 1px 1px #000;
}
</style>