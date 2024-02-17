<template>
  <q-dialog v-model="value" position="bottom">
    <div class="filter">
      <div class="filter-header">
        <div><q-icon name="close" size="24px" /></div>
        <div>Filtre</div>
        <div>Temizle</div>
      </div>
      <div class="filter-body">
        <div class="body-categories">
          <div class="categories-header">
            Kategorİler
          </div>
          <side-scroll class="category-items" style="height :42px;">
            <div class="category-btn active">
              <q-btn stretch class="fit">Müzik</q-btn>
            </div>
            <div class="category-btn">
              <q-btn>Spor</q-btn>
            </div>
            <div class="category-btn">
              <q-btn>Spor</q-btn>
            </div>
            <div class="category-btn">
              <q-btn>Spor</q-btn>
            </div>
            <div class="category-btn">
              <q-btn>Spor</q-btn>
            </div>
            <div class="category-btn">
              <q-btn>Spor</q-btn>
            </div>
            <div class="category-btn">
              <q-btn>Spor</q-btn>
            </div>
          </side-scroll>
        </div>
      </div>
      <div class="dates-body">
        <div class="dates-header">
          TARİH
        </div>
        <div class="dates-start">
          <label for="start">Başlangıç tarihi</label>
          <q-input filled v-model="startDate" mask="date" :rules="['date']" placeholder="Tarih Seçin veya Girin">
            <template v-slot:append>
              <q-icon name="expand_more" class="cursor-pointer text-primary">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="startDate" minimal>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="dates-end">
          <label for="start">Başlangıç tarihi</label>
          <q-input filled v-model="startDate" mask="date" :rules="['date']" placeholder="Tarih Seçin veya Girin">
            <template v-slot:append>
              <q-icon name="expand_more" class="cursor-pointer text-primary">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="startDate" minimal>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="date-shortcuts">
          <div class="date-btn active">
            <q-btn stretch class="fit">Hepsi</q-btn>
          </div>
          <div class="date-btn">
            <q-btn stretch class="fit">Bu gün</q-btn>
          </div>
          <div class="date-btn">
            <q-btn stretch class="fit">Bu Hafta</q-btn>
          </div>
          <div class="date-btn">
            <q-btn stretch class="fit">Bu Ay</q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import SideScroll from "./SideScroll.vue";
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
      startDate: "",
      multipleClickShield: false as boolean,
    };
  },
  computed: {
    value: {
      get(): boolean {
        return this.show;
      },
      set(value: boolean) {
        if (this.multipleClickShield) {
          this.multipleClickShield = false;
          return;
        }
        if (this.value != false)
          this.$emit('update:show', value);
        this.multipleClickShield = true;
      }
    }
  },
  components: { SideScroll }
})
</script>

<style scoped>
.filter {
  width: 100vw;
  background-color: white;
  border-radius: 30px 30px 0px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 8px 16px;
}

.filter-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
  padding: 16px 0;
  border-bottom: 1px solid #E8E8E8;
}

.filter-header>div {
  flex-shrink: 1;
  width: 100%;
  padding: 0 15px;
}

.filter-header>div:nth-child(1) {
  text-align: left;
}

.filter-header>div:nth-child(2) {
  text-align: center;
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  letter-spacing: 0.16px;
}

.filter-header>div:nth-child(3) {
  text-align: right;
  color: #FF7F00;
  font-family: "Source Sans Pro";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  letter-spacing: 0.14px;
}

.filter-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.body-categories {
  padding: 24px 0px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.categories-header {
  color: #000;
  font-family: "Source Sans Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
  text-transform: uppercase;
}

.categories-items {
  display: flex;

}

.category-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  overflow: hidden;

  font-feature-settings: 'clig' off, 'liga' off;
  font-family: "Source Sans Pro";
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.374px;
}

.category-btn.active {
  border: 1px solid #FF7F00;
  background: #FF7F00;
  color: #fff;
}
</style>