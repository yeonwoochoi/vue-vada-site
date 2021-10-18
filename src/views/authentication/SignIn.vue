<template>
  <v-img
      :aspect-ratio="aspectRatio"
      style="height: 100%;"
      :src="require('@/assets/bg_login.jpg')"
  >
    <v-row align="center" justify="center" class="ma-0" style="height: 100%;">
      <v-card :style="`width: ${cardWidth}%; height: 65%;`" class="mb-12 elevation-10" :img="require('@/assets/bg_login.jpg')">
        <v-alert
            :value="isShowAlert"
            type="error"
            transition="slide-y-transition"
        >
          {{ message }}
        </v-alert>
        <v-row align="center" justify="center" :class="`${isShowAlert ? 'pt-0' : 'pt-12'}`" style="width: 100%; height: 100%;">
          <v-col cols="10" class="text-center pb-0 mb-0">
            <p class="white--text display-1">
              LOGIN
            </p>
          </v-col>
          <v-col cols="9" align="center" class="py-0 my-0">
            <validation-observer ref="observer">
              <v-form @submit.prevent="submit">
                <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                  <v-text-field
                      v-model="email"
                      :error-messages="errors"
                      label="Email"
                      required
                      outlined
                      dense
                      filled
                      dark
                  />
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="password" rules="required">
                  <v-text-field
                      v-model="password"
                      :error-messages="errors"
                      label="Password"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPass = !showPass"
                      required
                      outlined
                      dense
                      filled
                      dark
                      :type="showPass ? 'text' : 'password'"

                  />
                </validation-provider>
              </v-form>
            </validation-observer>
            <div style="display: flex; justify-content: space-between; height: 30px;">
              <v-checkbox
                  v-model="rmCheck"
                  label="Remember me"
                  dark
                  class="pa-0 ma-0"
              />
              <a
                  style="text-decoration: none; align-items: center; display: flex"
                  href="/"
              >
                Forgot Password?
              </a>
            </div>
          </v-col>
          <v-col cols="9" class="mb-0 pb-0">
            <v-btn
                @click="submit"
                type="submit"
                large
                rounded
                class="text-center black--text font-weight-bold subtitle-1 #DCDCDC"
                style="width: 120px;"
            >
              LOGIN
            </v-btn>
          </v-col>
          <v-col cols="9" align="center" class="subtitle-1">
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
          <v-col cols="12" v-if="isShowAlert"/>
        </v-row>
      </v-card>
    </v-row>
  </v-img>
</template>

<script>
import { required, email } from 'vee-validate/dist/rules'
import { extend, ValidationProvider, setInteractionMode, ValidationObserver } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
  name: "SignIn",
  data: () => ({
    email: '',
    password: null,
    showPass: false,
    rmCheck: false,
    message: 'You have entered incorrect password',
    isShowAlert: false
  }),

  components: {
    ValidationProvider,
    ValidationObserver
  },

  mounted() {
    let emailLocal = localStorage.username;
    if (emailLocal) {
      this.email = emailLocal;
      this.rmCheck = localStorage.checkbox;
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
          "id": this.email,
          "pwd": this.password
        }
        this.rememberMe();
        this.$store.dispatch("user/login", user).then(
            () => {
              console.log('login success')
              this.$router.push('/');
            },
            () => {
              console.log('login failure')
              this.isShowAlert = true;
            }
        );
      }
    },

    clear() {
      this.email = ''
      this.password = null
      this.$refs.observer.reset()
    },

    rememberMe() {
      if (this.rmCheck && this.email !== "") {
        localStorage.username = this.email;
        localStorage.checkbox = this.rmCheck;
      } else {
        localStorage.username = "";
        localStorage.checkbox = this.rmCheck;
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
</style>