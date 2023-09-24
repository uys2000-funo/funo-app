<template>
  <div class="bg-primary row flex-center" style="height: 108px; width: 100%;">
    <funo-text-icon color="white" style="height: 32px;" />
  </div>
  <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated control-color="primary"
    class="fit" style="background-color: #00000000; flex-shrink: 1;">
    <!-- #region Enterprise -->
    <q-carousel-slide name="enterprise" class="column flex-center no-wrap" style="gap:16px; padding: 0px;">
      <register-inner-icon style="flex-shrink: 1; height: 100%; width: 100%;" />
      <q-form @submit="() => formSubmit('enterprise')" @validation-error="(comp) => formError(comp, 'enterprise')"
        class="full-width column">
        <q-carousel v-model="innerSlide" transition-prev="slide-right" transition-next="slide-left" animated
          :keep-alive="true" control-color="primary" style="background-color: #00000000; height: unset;">
          <!-- #region Enterprise General -->
          <q-carousel-slide name="enterpriseGeneral" class="column flex-center no-wrap" :keep-alive="true">
            <div class="text-center fs18 lh27 fw400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div class="full-width column">
              <q-input outlined v-model="enterpriseUser.general.name" name="name" label="İşletme İsmi"
                :rules="[v => !!v || 'Gerekli Alan']" />
              <q-input outlined v-model="enterpriseUser.general.taxNumber" name="taxNumber" label="İşletme vergi numarası"
                :rules="[v => !!v || 'Gerekli Alan']" />
              <q-input outlined v-model="enterpriseUser.general.phone" name="phone" label="Telefon Numarası"
                mask="0 (###) ### ####" placeholder="0 (554) 000 0000"
                :rules="[v => (v && v.length == 16) || 'Gerekli Alan']" />
              <q-input outlined v-model="enterpriseUser.general.address" name="address" label="İşletme adresi"
                :rules="[v => !!v || 'Gerekli Alan']" />
            </div>
          </q-carousel-slide>
          <!-- #endregion -->
          <!-- #region Enterprise Account -->
          <q-carousel-slide name="enterpriseAccount" class="column flex-center no-wrap" :keep-alive="true">
            <div class="text-center fs18 lh27 fw400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div class="full-width column">
              <q-input outlined v-model="enterpriseUser.account.name" label="Kullanıcı Adı" mask="N" reverse-fill-mask
                :rules="[v => !!v || 'Gerekli Alan']" />
              <q-input outlined v-model="password" label="Şifre" type="password"
                :rules="[v => v.length >= 6 || 'Gerekli Alan']" />
              <q-input outlined v-model="passwordControl" label="Şifre Tekrar" type="password"
                :rules="[v => v == password || 'Gerekli Alan']" />
              <q-input outlined v-model="enterpriseUser.account.mail" label="Mail Adresi" type="email"
                :rules="[v => (v && v.match(/[\w\d]*@[\w\d]+\.[\w\d]+/g)) || 'Gerekli Alan']" />
              <q-item tag="label" v-ripple style="padding: 0px;">
                <q-item-section avatar>
                  <q-checkbox v-model="right" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <a href="javascript;;" @click.prevent="openLicenseAgreement" class="ctitle">
                      Kullanıcı sözleşmesi</a>'ni okudum ve onaylıyorum.</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-carousel-slide>
          <!-- #endregion -->
        </q-carousel>
        <div class="row flex-center full-width shadow-3" style="height: 100px;">
          <div class="full-width" style="border-radius:4px; overflow: hidden; height: 52px;">
            <q-btn no-caps square flat class="bg-primary fit" :type="btnType" :to="nextSlide">
              <span class="text-white fs16 lh20 fw600">
                Devam et
              </span>
            </q-btn>
          </div>
        </div>
      </q-form>
    </q-carousel-slide>
    <!-- #endregion -->
    <!-- #region Enterprise Compleate-->
    <!-- #endregion -->
    <!-- #region Choose -->
    <q-carousel-slide name="landing" class="column flex-center no-wrap" style="gap:16px; padding-bottom: 100px;">
      <register-icon style="margin-bottom: 8px; flex-shrink: 1;" />
      <div class="fs20 lh30 fw600" style="margin-bottom: 16px;">
        Lütfen kullanıcı türünü seçiniz.
      </div>
      <div class="full-width" style="border-radius:4px; overflow: hidden; height: 56px;">
        <q-btn no-caps square flat class="bg-primary fit" to="/register#individual">
          <span class="text-white fs16 lh20 fw600">
            Bireysel
          </span>
        </q-btn>
      </div>
      <div class="full-width" style="border-radius:4px; overflow: hidden; height: 56px;">
        <q-btn no-caps square flat class="bg-primary fit" to="/register#enterprise">
          <span class="text-white fs16 lh20 fw600">
            İşletme
          </span>
        </q-btn>
      </div>
    </q-carousel-slide>
    <!-- #endregion -->
    <!-- #region Individual Compleate-->
    <!-- #endregion -->
    <!-- #region Individual -->
    <q-carousel-slide name="individual" class="column flex-center no-wrap" style="gap:16px; padding: 0px;">
      <register-inner-icon style="flex-shrink: 1; height: 100%; width: 100%;" />
      <q-form @submit="() => formSubmit('individual')" @validation-error="(comp) => formError(comp, 'individual')"
        class="full-width column">
        <q-carousel v-model="innerSlide" transition-prev="slide-right" transition-next="slide-left" animated
          :keep-alive="true" control-color="primary" style="background-color: #00000000; height: unset;">
          <!-- #region Individual General -->
          <q-carousel-slide name="individualGeneral" class="column flex-center no-wrap" :keep-alive="true">
            <div class="text-center fs18 lh27 fw400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div class="full-width column">
              <q-input outlined v-model="individualUser.general.name" name="name" label="Ad" mask="S" reverse-fill-mask
                :rules="[v => !!v || 'Gerekli Alan']" />
              <q-input outlined v-model="individualUser.general.surname" name="surname" label="Soyad" mask="S"
                reverse-fill-mask :rules="[v => !!v || 'Gerekli Alan']" />
              <q-input outlined v-model="birthdate" label="Doğum Tarihi" name="birthdate" placeholder="GG-AA-YYYY"
                mask="##-##-####" :rules="[v => (v && v.length == 10) || 'Gerekli Alan']" />
              <q-input outlined v-model="individualUser.general.phone" name="phone" label="Telefon Numarası"
                mask="0 (###) ### ####" placeholder="0 (554) 000 0000"
                :rules="[v => (v && v.length == 16) || 'Gerekli Alan']" />
              <q-select outlined v-model="gender" name="gender"
                :options="[{ label: 'Erkek', value: true }, { label: 'Kadın', value: false },]" label="Cinsiyet"
                :rules="[v => !!v || 'Gerekli Alan']" />
            </div>
          </q-carousel-slide>
          <!-- #endregion -->
          <!-- #region Individual Account -->
          <q-carousel-slide name="individualAccount" class="column flex-center no-wrap" :keep-alive="true">
            <div class="text-center fs18 lh27 fw400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div class="full-width column">
              <q-input outlined v-model="individualUser.account.name" label="Kullanıcı Adı" mask="N" reverse-fill-mask
                :rules="[v => !!v || 'Gerekli Alan']" />
              <q-input outlined v-model="password" label="Şifre" type="password"
                :rules="[v => v.length >= 6 || 'Gerekli Alan']" />
              <q-input outlined v-model="passwordControl" label="Şifre Tekrar" type="password"
                :rules="[v => v == password || 'Gerekli Alan']" />
              <q-input outlined v-model="individualUser.account.mail" label="Mail Adresi" type="email"
                :rules="[v => (v && v.match(/[\w\d][\w\d]*@[\w\d][\w\d]+\.[\w\d][\w\d]+/g)) || 'Gerekli Alan']" />
              <q-item tag="label" v-ripple style="padding: 0px;">
                <q-item-section avatar>
                  <q-checkbox v-model="right" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <a href="javascript;;" @click.prevent="openLicenseAgreement" class="ctitle">
                      Kullanıcı sözleşmesi</a>'ni okudum ve onaylıyorum.</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-carousel-slide>
          <!-- #endregion -->
        </q-carousel>
        <div class="row flex-center full-width shadow-3" style="height: 100px;">
          <div class="full-width" style="border-radius:4px; overflow: hidden; height: 52px;">
            <q-btn no-caps square flat class="bg-primary fit" :type="btnType" :to="nextSlide">
              <span class="text-white fs16 lh20 fw600">
                Devam et
              </span>
            </q-btn>
          </div>
        </div>
      </q-form>
    </q-carousel-slide>
    <!-- #endregion -->
  </q-carousel>
  <user-agreement :show="showAgreement" />
</template>
<script lang="ts">
import { IndividualUser, EnterpriseUser } from "@/types/user"
import { Component, defineComponent } from 'vue'
import UserAgreement from "@/components/dialogs/UserAgreement.vue"
import FunoTextIcon from "@/icons/logo/FunoTextIcon.vue"
import RegisterIcon from "@/icons/viewSpesific/RegisterIcon.vue"
import RegisterInnerIcon from "@/icons/viewSpesific/RegisterInnerIcon.vue"
import { showAlert } from "@/services/capacitor/dialog"

import { httpRequest, prepeareRequest } from "@/services/api"

export default defineComponent({
  components: { FunoTextIcon, RegisterIcon, RegisterInnerIcon, UserAgreement },
  data() {
    return {
      individualUser: { general: {}, account: {}, firebase: {} } as IndividualUser,
      enterpriseUser: { general: {}, account: {}, firebase: {} } as EnterpriseUser,
      birthdate: "",
      gender: undefined as { value: boolean } | undefined,
      password: "",
      passwordControl: "",
      right: false,
      showAgreement: false
    }
  },
  methods: {
    openLicenseAgreement() {
      this.showAgreement = false
      setTimeout(() => this.showAgreement = true);
      return false
    },
    // eslint-disable-next-line
    returnToErrorPages(result: Record<string, any>, type: "individual" | "enterprise") {
      if (result.code == "auth/email-already-exists") {
        const text = "Mail adresin hali hazırda kullanılıyor gözüküyor şifre yenilemeyi dene istersen :)"
        showAlert("Hata", text).then(() => this.$router.push(`/register#${type}Account`))
      }
      else if (result.code == "auth/username-already-exists") {
        const text = "Kullanıcı adın hali hazırda kullanılıyor gözüküyor şifre yenilemeyi dene istersen, Yada başka bi tane de seçebilirsin :)"
        showAlert("Hata", text).then(() => this.$router.push(`/register#${type}Account`))
      }
    },
    async formSubmit(type: "individual" | "enterprise") {
      if (!this.right) return showAlert("Kullanıcı Sözleşmesi Onayı", "Kullanıcı sözleşmesini kabul etmeniz gerekmekte")

      //Prepeare User Object
      let user;
      if (type == "individual") {
        user = this.individualUser
        const birthdate = this.birthdate.split("-")
        user.general.birthdate = new Date(parseInt(birthdate[2]), parseInt(birthdate[1]), parseInt(birthdate[0])).getMilliseconds()
        user.general.gender = this.gender?.value as boolean
      } else user = this.enterpriseUser
      user.interests = { main: [""], side: [""] }

      //Create User
      const body = { password: this.password, photoUrl: "null", user: prepeareRequest(user) }
      const reuqest = await httpRequest("user/", "POST", body)
      console.log(reuqest)
      const result = await reuqest.json().catch(() => showAlert("Opps", "Some thing happend"))
      console.log(result)

      //Show Results
      if (result.success) this.$router.push("/register#success")
      else this.returnToErrorPages(result, type)
      return true
    },
    formError(ref: Component, type: "individual" | "enterprise") {
      if (ref.name) this.$router.push("/register#" + type)
    },
  },
  computed: {
    slide() {
      if (this.$route.hash.indexOf("#individual") != -1) return "individual"
      else if (this.$route.hash.indexOf("#enterprise") != -1) return "enterprise"
      return "landing"
    },
    innerSlide() {
      if (this.$route.hash == "#individual") return "individualGeneral"
      else if (this.$route.hash == "#individualAccount") return "individualAccount"
      else if (this.$route.hash == "#enterprise") return "enterpriseGeneral"
      else if (this.$route.hash == "#enterpriseAccount") return "enterpriseAccount"
      return "landing"
    },
    nextSlide() {
      if (this.$route.hash == "#individual") return "/register#individualAccount"
      else if (this.$route.hash == "#enterprise") return "/register#enterpriseAccount"
      return undefined
    },
    btnType() {
      if (this.$route.hash == "#individualAccount") return "submit"
      else if (this.$route.hash == "#enterpriseAccount") return "submit"
      return "button"
    }
  },
})
</script>