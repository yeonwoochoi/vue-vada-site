<template>
  <v-img
      :aspect-ratio="aspectRatio"
      style="height: 100%;"
      :src="require('@/assets/bg_login.jpg')"
  >
    <v-row align="center" justify="center" class="ma-0" style="height: 100%;">
      <forgot-password-auth v-if="isAuthorized" :email="email"/>
      <v-card :style="`width: ${cardWidth}%; height: fit-content;`" class="elevation-10" :img="require('@/assets/bg_login.jpg')" v-if="!isAuthorized">
        <v-alert
            :value="isShowingAlert"
            type="error"
            transition="slide-y-transition"
        >
          {{ alertMessage }}
        </v-alert>
        <v-row align="center" justify="center" class="py-10" style="width: 100%; height: 600px;">
          <v-col cols="9" align="start" class="text-start">
            <p class="white--text display-2">
              Forgot your password?
            </p>
            <p class="white--text title font-weight-light">
              Please enter the email you use to sign in to vada
            </p>
          </v-col>
          <v-col cols="9" align="start" class="my-0 py-0">
            <validation-observer ref="observer">
              <v-form @submit.prevent="submit">
                <validation-provider v-slot="{ errors }" name="Email" rules="required|email">
                  <p class="subtitle-1 font-weight-light white--text mb-0 pb-2">
                    Your email
                  </p>
                  <v-text-field
                      v-model="email"
                      :error-messages="errors"
                      required
                      dark
                      class="my-0 py-0"
                  />
                </validation-provider>
              </v-form>
            </validation-observer>
          </v-col>
          <v-col cols="9" class="mt-0 pt-0">
            <v-btn
              x-large
              @click="submit"
              class="font-weight-bold"
              width="100%"
              height="60px"
              style="letter-spacing: 1px; text-transform: none"
            >
              Request password reset
            </v-btn>
            <v-btn
              id="no-background-hover"
              x-large
              to="/authentication/sign-in"
              class="white--text font-weight-bold elevation-0 mt-2"
              width="100%"
              height="60px"
              :ripple="false"
              style="background-color: transparent; text-transform: none;"
            >
              Back To Sign In
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-img>
</template>

<script>
import ForgotPasswordAuth from "@/views/authentication/forgot-password/ForgotPasswordAuth";
import { required, email } from "vee-validate/dist/rules";
import { extend, ValidationProvider, setInteractionMode, ValidationObserver } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('email', {
  ...email,
  message: '{_field_} must be valid'
})

export default {
  name: "ForgotPassword",
  mounted() {
    this.reset();
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    ForgotPasswordAuth,
  },
  data: () => ({
    isShowingAlert: false,
    isSendingCode: false,
    alertMessage: '',
    email: null,
    isAuthorized: false,
  }),
  computed: {
    aspectRatio () {
      return this.$vuetify.breakpoint.width / this.$vuetify.breakpoint.height;
    },
    cardWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case "xl": return 40
        case "lg": return 55
        case "md": return 70
        case 'sm': return 85
        case 'xs': return 95
        default: return false
      }
    },
  },
  methods: {
    async submit() {
      if (!this.isSendingCode) {
        this.isSendingCode = true;
        const valid = await this.$refs.observer.validate();
        if (valid) {
          let user = {
            "email": this.email
          }
          this.$store.dispatch("user/emailCheck", user).then(
              () => {
                this.isSendingCode = false;
                this.isShowingAlert = false;
                alert('인증코드가 발송되었습니다.')
                this.isAuthorized = true;
              },
              (err) => {
                this.isSendingCode = false;
                this.showAlert(err)
              }
          )
        } else {
          this.isSendingCode = false;
        }
      }
    },
    showAlert(msg) {
      this.isShowingAlert = false;
      this.alertMessage = msg;
      this.isShowingAlert = true;
    },
    reset() {
      this.email = null;
      this.isShowingAlert = false;
      this.isSendingCode = false;
      this.alertMessage = '';
      this.isAuthorized = false;
      this.$refs.observer.reset();
    }
  }
}
</script>

<style scoped>
#no-background-hover::before {
  background-color: transparent !important;
}
</style>