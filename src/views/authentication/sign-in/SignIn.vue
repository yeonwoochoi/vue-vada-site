<template>
  <v-img
      :aspect-ratio="aspectRatio"
      style="height: 100%;"
      :src="require('@/assets/bg_login.jpg')"
  >
    <v-row align="center" justify="center" class="ma-0" style="height: 100%;">
      <v-card :style="`width: ${cardWidth}%; height: fit-content;`" class="mb-12 elevation-10" :img="require('@/assets/bg_login.jpg')">
        <v-alert
            :value="showAlert"
            type="error"
            transition="slide-y-transition"
        >
          {{ alertMessage }}
        </v-alert>
        <v-row align="center" justify="center" :class="`${showAlert ? 'pt-0' : 'pt-12 pb-6'}`" style="width: 100%; height: 600px;">
          <v-col cols="10" class="text-center pb-0 mb-0">
            <p class="white--text display-1">
              LOGIN
            </p>
          </v-col>
          <v-col cols="9" align="center" class="py-0 my-0">
            <validation-observer ref="observer">
              <v-form @submit.prevent="submit">
                <validation-provider v-slot="{ errors }" name="Student ID" rules="required">
                  <v-text-field
                      v-model="studentId"
                      :error-messages="errors"
                      label="Student ID"
                      required
                      outlined
                      dense
                      filled
                      dark
                  />
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="Password" rules="required">
                  <v-text-field
                      v-model="password"
                      :error-messages="errors"
                      label="Password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                      required
                      outlined
                      dense
                      filled
                      dark
                      :type="showPassword ? 'text' : 'password'"
                  />
                </validation-provider>
              </v-form>
            </validation-observer>
            <div style="display: flex; justify-content: space-between; height: 30px;">
              <v-checkbox
                  v-model="rememberCheck"
                  label="Remember me"
                  dark
                  class="pa-0 ma-0"
              />
              <a
                  style="text-decoration: none; align-items: center; display: flex"
                  href="/authentication/forgot-password"
              >
                Forgot Password?
              </a>
            </div>
          </v-col>
          <v-col cols="9" align="start" class="mb-6">
            <v-btn
                @click="submit"
                type="submit"
                large
                rounded
                class="text-center black--text font-weight-bold subtitle-1 #DCDCDC"
                style="width: 100%;"
            >
              LOGIN
            </v-btn>
            <v-btn
                @click="cancel"
                type="cancel"
                large
                rounded
                class="text-center white--text font-weight-bold subtitle-1 elevation-0 #DCDCDC mt-3 no-hover-button"
                style="width: 100%; background-color: transparent;"
            >
              CANCEL
            </v-btn>
          </v-col>
          <!--
          <v-col cols="9" align="center" class="subtitle-1 pt-0">
            <p class="white--text">
              Need an account?
              <a
                  style="text-decoration: none;"
                  :href="'/authentication/signup-agreement'"
                  class="ml-2"
              >
                Sign up
              </a>
            </p>
          </v-col>
          -->
        </v-row>
      </v-card>
    </v-row>
  </v-img>
</template>

<script>
import { required } from 'vee-validate/dist/rules'
import { extend, ValidationProvider, setInteractionMode, ValidationObserver } from 'vee-validate'
import VueCookies from "vue-cookies";

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

export default {
  name: "SignIn",
  data: () => ({
    studentId: '',
    password: null,
    showPassword: false,
    rememberCheck: false,
    alertMessage: 'You have entered incorrect password',
    showAlert: false
  }),

  components: {
    ValidationProvider,
    ValidationObserver
  },

  mounted() {
    let accessToken = VueCookies.get('accessToken');
    if (accessToken) {
      this.$router.push('/')
    }
    let emailLocal = localStorage.username;
    if (emailLocal) {
      this.studentId = emailLocal;
      this.rememberCheck = localStorage.checkbox;
    }
  },

  computed: {
    aspectRatio: function () {
      return this.$vuetify.breakpoint.width / this.$vuetify.breakpoint.height;
    },
    cardWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case "xl": return 36
        case "lg": return 40
        case "md": return 55
        case 'sm': return 80
        case 'xs': return 90
        default: return false
      }
    },
  },

  methods: {
    async submit() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        let user = {
          "id": this.studentId,
          "pwd": this.password
        }
        this.rememberMe();
        this.$store.dispatch("user/login", user).then(
            (isTempUser) => {
              if (isTempUser) {
                this.$router.push('/authentication/reset-password')
              }
              else {
                this.$router.push('/');
              }
            },
            (err) => {
              this.alertMessage = err;
              this.showAlert = true;
            }
        );
        this.clear();
      }
    },

    cancel() {
      this.clear();
      this.$router.push('/')
    },

    clear() {
      this.studentId = ''
      this.password = null
      this.$refs.observer.reset()
    },

    rememberMe() {
      if (this.rememberCheck && this.studentId !== "") {
        localStorage.username = this.studentId;
        localStorage.checkbox = this.rememberCheck;
      } else {
        localStorage.username = "";
        localStorage.checkbox = this.rememberCheck;
      }
    }
  }
}
</script>

<style scoped>
  .v-text-field--outlined >>> fieldset {
    border-color: #DCDCDC;
    border-width: 2px;
  }
  .no-hover-button::before {
    display: none;
  }
</style>