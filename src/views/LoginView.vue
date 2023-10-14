<template>
  <top-color style="position: absolute;" />
  <funo-text-icon color="white" style="height: 32px; margin-top: 32px; position: absolute;" />
  <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated control-color="primary"
    class="fit" style="background-color: #00000000; flex-shrink: 1; padding-top: 64px;">
    <!-- #region SignIn -->
    <q-carousel-slide name="login" class="column no-wrap" style="gap:16px">
      <login-icon style="flex-grow: 1; flex-shrink: 1;" />
      <div class="text-center fs18 lh27 fw400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
      <!-- #region UserName Password SignIn -->
      <q-form class="column" style="gap:16px; margin: 8px 0;" @submit="formSubmit">
        <q-input outlined type="text" label="Kullanıcı Adı" v-model="username" />
        <q-input outlined type="password" label="Şifre" v-model="password" />
        <div style="border-radius:4px; overflow: hidden; height: 52px; margin-top: 8px;">
          <q-btn no-caps square flat class="bg-primary fit" type="submit">
            <span class="text-white fs16 lh20 fw600">
              Giriş Yap
            </span>
          </q-btn>
        </div>
        <div class="text-right">
          <router-link class="ctitle fs16 lh20 fw600" to="/login#forgot">
            Şifreni mi unuttun?
          </router-link>
        </div>
      </q-form>
      <!-- #endregion -->
      <!-- #region Provider SignIn -->
      <div class="column" style="border-top: 1px solid #00000010; padding-top: 8px; gap:16px; margin-bottom: 50px;">
        <div style="border:solid 1px black; border-radius:24px; overflow: hidden; height: 52px; margin-top: 8px;">
          <q-btn no-caps square flat class="fit" @click="signInWithGoogle">
            <div class="row flex-center" style="gap:6px">
              <icon-google />
              <span class="ctitle fs18 fw700">
                Google ile devam et
              </span>
            </div>
          </q-btn>
        </div>
        <div style="border:solid 1px black; border-radius:24px; overflow: hidden; height: 52px;">
          <q-btn no-caps square flat class="fit" @click="signInWithApple">
            <div class="row flex-center" style="gap:6px">
              <icon-apple />
              <span class="ctitle fs18 fw700">
                Apple ile devam et
              </span>
            </div>
          </q-btn>
        </div>
        <!-- #endregion -->
        <div class="text-center">
          <span class="cs fs16 lh24 fw400">Hesabın yok mu?
            <router-link class="cb fw700" style="text-decoration: none;" to="/register">
              Hemen kaydol
            </router-link>
          </span>
        </div>
      </div>
    </q-carousel-slide>
    <!-- #endregion -->
    <!-- #region Forgot Password -->
    <q-carousel-slide name="forgot" class="column align-center no-wrap" style="gap:16px">
      <forgot-icon style="margin: 16px auto;" />
      <div class="text-center">
        <span class="ctitle fs20 lh30 fw600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </span>
      </div>
      <form class="column" style="gap:16px; margin: 8px 0;">
        <q-input outlined type="text" label="E-posta adresi" v-model="username" />
        <div style="border-radius:4px; overflow: hidden; height: 52px; margin-top: 8px;">
          <q-btn no-caps square flat class="bg-primary fit" type="submit">
            <span class="text-white fs16 lh20 fw600">
              Gönder
            </span>
          </q-btn>
        </div>
        <div class="text-right">
          <router-link class="ctitle fs16 lh20 fw600" to="/login#forgot">
            Şifreni mi unuttun?
          </router-link>
        </div>
      </form>
    </q-carousel-slide>
  </q-carousel>
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
import { signInFirebaseWithEmailAndPassword, signInWithGoogleCredential, } from '@/services/firebase/authentication'
import { getUserData } from '@/services/app/user'
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
    getUserData(uID: string) {
      getUserData.pLogger(uID).then(() => {
        this.$router.push("/app/home")
      })
    },
    formSubmit() {
      if (this.username.match(/[\w\d][\w\d]*@[\w\d][\w\d]+\.[\w\d][\w\d]+/g)) {
        signInWithEmailAndPassword(this.username, this.password).then(() => {
          signInFirebaseWithEmailAndPassword(this.username, this.password).then(userCredential => {
            this.getUserData(userCredential.user.uid)
          })
        })
      }
    },
    signInWithGoogle() {
      signInWithGoogle.pLogger().then(signInResult => {
        if (signInResult.credential && signInResult.credential.idToken)
          signInWithGoogleCredential.pLogger(signInResult.credential.idToken).then(userCredential => {
            signInResult.additionalUserInfo?.isNewUser
            if (signInResult.additionalUserInfo && signInResult.additionalUserInfo.isNewUser) return console.log("Redirect To New User")
            else this.getUserData(userCredential.user.uid)
          })
      })
    },
    signInWithApple() {
      signInWithApple.pLogger()
    }
  },
  computed: {
    slide() {
      return this.$route.hash == "#forgot" ? "forgot" : "login"
    }
  }
})
</script>