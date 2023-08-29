<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Kullanıcı Sözleşmesi</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium voluptatem, necessitatibus cumque, ipsum
        cupiditate, facere illo sint beatae vitae perferendis voluptates! Repellendus, ipsum distinctio voluptatum,
        repellat inventore impedit animi blanditiis repudiandae rem a quibusdam perspiciatis quasi amet! Modi magnam ipsam
        error mollitia placeat? Aut voluptate cupiditate corporis dolor nulla, sapiente assumenda praesentium dignissimos
        voluptates ut voluptatibus rem blanditiis delectus soluta ducimus. Illum similique unde modi explicabo itaque aut
        mollitia qui aliquid eveniet. Hic illum quasi consequuntur architecto sapiente eveniet, dolor eum distinctio ad
        dolores harum in sit adipisci quo, quos id quam! Incidunt reiciendis mollitia totam quas quae voluptatem sunt? In,
        modi architecto, laudantium repellat, molestiae voluptate saepe maxime corrupti eligendi minima vero. Soluta
        reiciendis dolorum neque odit odio quia iste totam ipsum itaque perspiciatis eligendi repellendus at nulla
        aspernatur velit distinctio accusantium a magnam, illo eaque repudiandae eos, cupiditate numquam! Fugit tempora
        voluptas eveniet eum voluptatum a, corporis non ratione quod ad eaque, aliquam eius reiciendis, aliquid tenetur
        sed incidunt? Ipsa voluptatem nemo recusandae fugiat accusamus? Quam nostrum maxime ducimus cum dolores provident,
        illo, quaerat sint dignissimos natus vel! Blanditiis, nihil optio esse repellat molestias laudantium iusto, culpa,
        pariatur sed nobis numquam tempora quae magnam similique autem rem natus molestiae iste qui maiores placeat?
        Voluptatibus provident quibusdam id itaque iure adipisci est, aliquid in facere error reiciendis non quos,
        laudantium odit aut. Reprehenderit eaque eligendi eius deleniti quis recusandae dolore officia, officiis animi
        modi natus illo libero molestias facere architecto sint autem quas labore, maiores voluptatem totam. Saepe maxime
        corporis aliquid quasi reiciendis repellendus autem modi laboriosam nulla repudiandae eveniet et, deleniti
        veritatis blanditiis ipsum ipsa! Qui ad reprehenderit labore minima unde corporis, error neque eligendi quae,
        magni obcaecati cupiditate quasi, maiores ut recusandae praesentium dolorem ipsa eos eius? Excepturi, corporis
        illum unde sunt optio id! Nemo aliquam eligendi debitis fugiat neque? Facilis deserunt cumque et similique nostrum
        corporis numquam voluptatum eaque, delectus at accusantium, optio rem quos nisi minus. Corporis, accusantium
        dolorem rem exercitationem ipsa quibusdam iure atque repellendus nostrum fugit voluptate delectus magnam dolor.
        Cum dolor cupiditate vero, iusto voluptate dicta magni nihil numquam soluta quae consequuntur perferendis maiores
        deserunt possimus fugiat qui consequatur nam tenetur quaerat repellat facere expedita odit vitae! Autem sequi
        maiores odit commodi error voluptatibus, obcaecati asperiores labore molestiae neque nobis, cumque nesciunt
        pariatur quibusdam molestias iste totam nulla earum incidunt ratione mollitia, quidem ducimus laboriosam. Deleniti
        rem quia blanditiis minus autem veritatis!
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    show: {
      type: Boolean,
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  watch: {
    show() {
      this.dialog = this.show
    }
  }
})
</script>