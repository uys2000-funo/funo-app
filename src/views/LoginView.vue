<template>
  <div class="login-page">
    <top-color class="login-page-decoration" />
    <funo-text-icon class="login-page-logo" color="white" style="height: 32px;" />
    <q-carousel class="login-page-content" v-model="slide" transition-prev="slide-right" transition-next="slide-left"
      animated>
      <q-carousel-slide name="login" class="login-page-content-slide login">
        <div class="login-contents">
          <login-icon class="login-contents-image" />
          <div class="login-contents-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
        </div>
        <q-form class="login-form" @submit.prevent="formSubmit">
          <div class="login-form-inputs">
            <q-input outlined type="text" label="Kullanıcı Adı" v-model="username" />
            <q-input outlined type="password" label="Şifre" v-model="password" />
          </div>
          <div class="login-form-buttons">
            <div class="login-form-buttons-cover">
              <q-btn no-caps square flat class="login-form-buttons-cover-button" type="submit">
                Giriş Yap
              </q-btn>
            </div>
            <div class="login-form-buttons-forgot">
              <router-link class="ctitle fs16 lh20 fw600" to="/login#forgot">
                Şifreni mi unuttun?
              </router-link>
            </div>
          </div>
        </q-form>
        <div class="login-buttons">
          <div class="login-buttons-cover">
            <q-btn class="logn-buttons-cover-button" no-caps square flat @click="signInWithGoogle">
              <div class="logn-buttons-cover-button-inner">
                <icon-google />
                Google ile devam et
              </div>
            </q-btn>
          </div>
          <div class="login-buttons-cover">
            <q-btn class="logn-buttons-cover-button" no-caps square flat @click="signInWithApple">
              <div class="logn-buttons-cover-button-inner">
                <icon-apple />
                Apple ile devam et
              </div>
            </q-btn>
          </div>
          <div class="text-center">
            <span class="cs fs16 lh24 fw400">Hesabın yok mu?
              <router-link class="cb fw700" style="text-decoration: none;" to="/register">
                Hemen kaydol
              </router-link>
            </span>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="forgot" class="login-page-content-slide forgot">
        <div class="forgot-contents">
          <forgot-icon class="forgot-contents-image" />
          <div class="forgot-contents-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
        <q-form class="forgot-form" @submit.prevent="resetPassword">
          <q-input outlined type="email" label="E-posta adresi" v-model="username"
            :rules="[v => (v && v.match(/[\w\d]*@[\w\d]+\.[\w\d]+/g)) || 'Mail Adresi Giriniz']" />
          <div class="forgot-form-cover">
            <q-btn class="forgot-form-cover-button" no-caps square flat type="submit" @click="resetPassword">
              Gönder
            </q-btn>
          </div>
        </q-form>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import TopColor from "@/icons/background/TopColor.vue"
import FunoTextIcon from "@/icons/logo/FunoTextIcon.vue"
import LoginIcon from "@/icons/viewSpesific/LoginIcon.vue"
import ForgotIcon from "@/icons/viewSpesific/ForgotIcon.vue"
import IconApple from '@/icons/logo/iconApple.vue'
import IconGoogle from '@/icons/logo/iconGoogle.vue'
import { signInWithGoogle, signInWithApple, signInWithEmailAndPassword } from '@/services/capacitor/authentication'
import { sendPasswordResetEmailAuthentication, signInFirebaseWithEmailAndPassword, signInWithGoogleCredential, } from '@/services/firebase/authentication'
import { getUserData } from '@/services/app/user'

import { showAlert } from "@/services/capacitor/dialog"
import { getUserMail } from '@/services/api/AuthenticationApi'
export default defineComponent({
  name: "LoginView",
  components: { TopColor, FunoTextIcon, LoginIcon, ForgotIcon, IconApple, IconGoogle },
  data() {
    return {
      username: "",
      password: "",
      areButtonsDisabled: false
    }
  },
  methods: {
    formErrors(code: string) {
      showAlert(code, "Sorun var kurban olduğum sorun ya E-mail yanlış yada antin kuntin bişiler oluyo hata kodu ortada.")
    },
    getUserData(uID: string) {
      getUserData.pLogger(uID).then(() => {
        this.$router.push({ name: "HomeView", query: { showLogo: "true", showHiToUser: "true" } })
      })
    },
    formSubmit() {
      if (this.username.match(/[\w\d][\w\d]*@[\w\d][\w\d]+\.[\w\d][\w\d]+/g)) {
        this.signInWithPassword(this.username)
      }
      else {
        getUserMail.pLogger(this.username).then((res) => this.signInWithPassword(res.mail)).catch((err) => this.formErrors(err.code))
      }
    },
    signInWithPassword(mail: string) {
      signInWithEmailAndPassword.pLogger(mail ? mail : this.username, this.password).then(() => {
        signInFirebaseWithEmailAndPassword.pLogger(mail ? mail : this.username, this.password).then(userCredential => {
          this.getUserData(userCredential.user.uid)
        }).catch((err) => this.formErrors(err.code))
      }).catch((err) => this.formErrors(err.code))
    },
    signInWithGoogle() {
      signInWithGoogle.pLogger().then(signInResult => {
        if (signInResult.credential && signInResult.credential.idToken)
          signInWithGoogleCredential.pLogger(signInResult.credential.idToken).then(userCredential => {
            signInResult.additionalUserInfo?.isNewUser
            if (signInResult.additionalUserInfo && signInResult.additionalUserInfo.isNewUser) return console.log("Redirect To New User")
            else this.getUserData(userCredential.user.uid)
          }).catch((err) => this.formErrors(err.code))
      }).catch((err) => this.formErrors(err.code))
    },
    signInWithApple() {
      signInWithApple.pLogger()
    },
    resetPassword() {
      sendPasswordResetEmailAuthentication(this.username).then(() => this.$router.push({ hash: '#login' })).catch((err) => this.formErrors(err.code))
    }
  },
  computed: {
    slide() {
      return this.$route.hash == "#forgot" ? "forgot" : "login"
    }
  }
})
</script>

<style scpoed>
.login-page {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
}

.login-page-decoration {
  position: absolute;
}

.login-page-logo {
  position: absolute;
  margin-top: 32px;
}

.login-page-content {
  padding-top: 64px;
  background-color: #00000000;
  flex-shrink: 1;
  height: 100%;
}

.login-page-content-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 24px;
  width: 100%;
  height: 100%;
  padding: 0 16px;
}

.login-contents {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 16px;
  flex-shrink: 1;
  overflow: hidden;
}

.login-contents-image {
  flex-grow: 1;
  flex-shrink: 1;
}

@media (max-height:700px) {
  .login-contents-image {
    display: none;
  }
}

.login-contents-text {
  color: var(--color-title);
  text-align: center;
  font-family: Source Sans Pro;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.09px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.login-form-inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.login-form-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.login-form-buttons-cover {
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  height: 52px;
  margin-top: 8px;
}

.login-form-buttons-cover-button {
  background-color: var(--color-primary);
  width: 100%;
  height: 100%;

  color: var(--color-button-text);
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Source Sans Pro;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.login-form-buttons-forgot {
  text-align: right;
  color: var(--color-title);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Source Sans Pro;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
}

.login-buttons {
  display: flex;
  width: 100%;
  flex-direction: column;
  border-top: 1px solid #00000010;
  gap: 16px;
  padding: 24px 0;
}

.login-buttons-cover {
  border: solid 1px black;
  border-radius: 24px;
  overflow: hidden;
  height: 52px;
}

.logn-buttons-cover-button {
  width: 100%;
  height: 100%;
}

.logn-buttons-cover-button-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  color: var(--color-title);
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Source Sans Pro;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.forgot-contents {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  gap: 16px;
  flex-shrink: 1;
  overflow: hidden;
}

.forgot-contents-image {
  flex-grow: 1;
  flex-shrink: 1;
}

.forgot-contents-text {
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

.forgot-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.forgot-form-cover {
  border-radius: 4px;
  overflow: hidden;
  height: 52px;
  margin-top: 8px;
}

.forgot-form-cover-button {
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
</style>