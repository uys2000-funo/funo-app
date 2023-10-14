<template>
  <div class="register-page">
    <div class="register-page-header">
      <funo-text-icon color="white" style="height: 32px;" />
    </div>
    <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated
      control-color="primary" class="register-page-contents">
      <q-carousel-slide name="enterprise" class="register-page-contents-content register">
        <div class="register-image"><register-inner-icon /></div>
        <q-form class="register-form" @submit="() => formSubmit('enterprise')"
          @validation-error="(comp) => formError(comp, 'enterprise')">
          <q-carousel class="register-form-content" v-model="innerSlide" transition-prev="slide-right"
            transition-next="slide-left" animated :keep-alive="true">
            <q-carousel-slide class="register-form-content-slide" name="enterpriseGeneral" :keep-alive="true">
              <div class="register-form-content-slide-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div class="register-form-content-slide-inputs">
                <q-input outlined v-model="enterpriseUser.general.name" name="name" label="İşletme İsmi"
                  :rules="[v => !!v || 'Gerekli Alan']" />
                <q-input outlined v-model="enterpriseUser.general.taxNumber" name="taxNumber"
                  label="İşletme vergi numarası" :rules="[v => !!v || 'Gerekli Alan']" />
                <q-input outlined v-model="enterpriseUser.general.phone" name="phone" label="Telefon Numarası"
                  mask="0 (###) ### ####" placeholder="0 (554) 000 0000"
                  :rules="[v => (v && v.length == 16) || 'Gerekli Alan']" />
                <q-input outlined v-model="enterpriseUser.general.address" name="address" label="İşletme adresi"
                  :rules="[v => !!v || 'Gerekli Alan']" />
              </div>
            </q-carousel-slide>
            <q-carousel-slide class="register-form-content-slide" name="enterpriseAccount" :keep-alive="true">
              <div class="text-center fs18 lh27 fw400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div class="register-form-content-slide-inputs">
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
          </q-carousel>
          <div class="register-form-submit">
            <div class="register-form-submit-cover">
              <q-btn class="register-form-submit-cover-button" no-caps square flat :type="btnType" :to="nextSlide">
                Devam et
              </q-btn>
            </div>
          </div>
        </q-form>
      </q-carousel-slide>
      <q-carousel-slide name="landing" class="register-page-contents-content landing">
        <div class="landing-content">
          <register-icon class="landing-content-image" />
          <div class="landing-content-text">Lütfen kullanıcı türünü seçiniz.</div>
        </div>
        <div class="landing-buttons">
          <div class="landing-buttons-cover">
            <q-btn no-caps square flat class="landing-buttons-cover-button" to="/register#individual">
              Bireysel
            </q-btn>
          </div>
          <div class="landing-buttons-cover">
            <q-btn no-caps square flat class="landing-buttons-cover-button" to="/register#enterprise">
              İşletme
            </q-btn>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="individual" class="register-page-contents-content register">
        <div class="register-image"><register-inner-icon /></div>
        <q-form class="register-form" @submit="() => formSubmit('individual')"
          @validation-error="(comp) => formError(comp, 'individual')">
          <q-carousel class="register-form-content" v-model="innerSlide" transition-prev="slide-right"
            transition-next="slide-left" animated :keep-alive="true">
            <q-carousel-slide class="register-form-content-slide" name="individualGeneral" :keep-alive="true">
              <div class="register-form-content-slide-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div class="register-form-content-slide-inputs">
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
            <q-carousel-slide class="register-form-content-slide" name="individualAccount" :keep-alive="true">
              <div class="register-form-content-slide-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div class="register-form-content-slide-inputs">
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
          </q-carousel>
          <div class="register-form-submit">
            <div class="register-form-submit-cover">
              <q-btn class="register-form-submit-cover-button" no-caps square flat :type="btnType" :to="nextSlide">
                Devam et
              </q-btn>
            </div>
          </div>
        </q-form>
      </q-carousel-slide>
    </q-carousel>
    <user-agreement :show="showAgreement" />
  </div>
</template>
<script lang="ts">
import { IndividualUserData, EnterpriseUserData, IndividualUser, EnterpriseUser } from "@/types/user"
import { Component, defineComponent } from 'vue'
import UserAgreement from "@/components/dialogs/UserAgreement.vue"
import FunoTextIcon from "@/icons/logo/FunoTextIcon.vue"
import RegisterIcon from "@/icons/viewSpesific/RegisterIcon.vue"
import RegisterInnerIcon from "@/icons/viewSpesific/RegisterInnerIcon.vue"
import { showAlert } from "@/services/capacitor/dialog"

import { sendRegisterRequest } from "@/services/api/RegisterApi"
import { getTimestampFromString } from "@/services/app/DateService"

export default defineComponent({
  name: "RegisterView",
  components: { FunoTextIcon, RegisterIcon, RegisterInnerIcon, UserAgreement },
  data() {
    return {
      individualUser: new IndividualUserData(),
      enterpriseUser: new EnterpriseUserData(),
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
    preapeareUser(type: "individual" | "enterprise") {
      if (type == "individual") {
        const birthdate = this.birthdate.split("-")
        this.individualUser.general.birthdate = getTimestampFromString(birthdate[2], birthdate[1], birthdate[0])
        this.individualUser.general.gender = this.gender?.value as boolean
        this.individualUser.interests = { main: [], side: [] }
        const user = new IndividualUser()
        user.data = this.individualUser
        return user
      }
      else {
        this.enterpriseUser.interests = { main: [], side: [] }
        const user = new EnterpriseUser()
        user.data = this.enterpriseUser
        return user
      }
    },
    async formSubmit(type: "individual" | "enterprise") {
      if (!this.right) return showAlert("Kullanıcı Sözleşmesi Onayı", "Kullanıcı sözleşmesini kabul etmeniz gerekmekte")
      const user = this.preapeareUser(type)

      //Create User
      const result = await sendRegisterRequest.pLogger(user, this.password, "null")
        .catch(() => showAlert("Opps", "Some thing happend"));

      //Show Results
      if (result.success) this.$router.push({ name: "LoginView" })
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

<style scoped>
/* #region register-page */
.register-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.register-page-header {
  background-color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;

  height: 108px;
  width: 100%;
}

.register-page-contents {
  width: 100%;
  height: 100%;
  background-color: #00000000;
  flex-shrink: 1;
  overflow: hidden;
}

.register-page-contents-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 0px;
  flex-shrink: 1;
  overflow: hidden;
}

/* #endregion */
/* #region landing */
.landing {
  gap: 32px;
  padding: 16px;
  padding-bottom: 20vh;
}

.landing-content {
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  gap: 24px;
}

.landing-content-image {
  flex-shrink: 1;
}

.landing-content-text {
  color: var(--color-title);
  text-align: center;
  font-family: Source Sans Pro;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  /* 30px */
  letter-spacing: 0.1px;
}

.landing-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  gap: 16px;
}

.landing-buttons-cover {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  height: 56px;
}

.landing-buttons-cover-button {
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);

  color: var(--color-button-text);
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Source Sans Pro;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

/* #endregion */
/* #region register */
.register {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 0px;
  justify-content: flex-start;
}

.register-image {
  height: 180px;
  width: 180px;
}

.register-image svg {
  flex-shrink: 1;
}

.register-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-shrink: 1;
  overflow: hidden;
}

.register-form-content {
  background-color: transparent;
  height: 100%;
  flex-shrink: 1;
}

.register-form-content-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.register-form-content-slide-text {
  color: var(--color-title);
  text-align: center;
  font-family: Source Sans Pro;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.09px;
}

.register-form-content-slide-inputs {
  width: 100%;
  overflow: auto;
  height: 100%;
  flex-shrink: 1;
}

.register-form-submit {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.08);
  height: 100px;
}

.register-form-submit-cover {
  border-radius: 4px;
  overflow: hidden;
  height: 52px;
  width: 100%;
  height: 100%;
  padding: 24px 16px;
}

.register-form-submit-cover-button {
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);

  color: var(--color-button-text);

  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Source Sans Pro;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

/* #endregion */
</style>