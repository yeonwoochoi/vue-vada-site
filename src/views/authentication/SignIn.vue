<template>
  <v-img
      :aspect-ratio="aspectRatio"
      style="height: 100%;"
      :src="require('@/assets/bg_login.jpg')"
  >
    <v-row align="center" justify="center" class="ma-0" style="height: 100%;">
      <v-card width="700px" height="600px" class="pt-12 mb-12 elevation-10" :img="require('@/assets/bg_login.jpg')">
        <v-row align="center" justify="center" style="width: 100%; height: 100%;">
          <v-col cols="10" class="text-center">
            <p class="white--text display-1">
              LOGIN
            </p>
          </v-col>
          <v-col cols="9" align="center" class="pb-0 mb-0">
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
          </v-col>
          <v-col cols="4" align="start" class="mt-0 pt-0">
            <v-checkbox
              v-model="rmCheck"
              label="Remember me"
              dark
            />
          </v-col>
          <v-col cols="5" align="end" class="mt-0 pt-0">
            <a
                style="text-decoration: none;"
                href="/"
            >
              Forget Password?
            </a>
          </v-col>
          <v-col cols="9" class="my-0 py-0">
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
          <v-col cols="9" align="center" class="subtitle-1 mt-12">
            <p class="white--text">
              Need an account?
              <a
                  style="text-decoration: none;"
                  href="/"
                  class="ml-2"
              >
                Sign up
              </a>
            </p>
          </v-col>
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
  data: () => ({
    email: '',
    password: null,
    showPass: false,
    rmCheck: false,
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
    }
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
              this.$router.go(this.$router.currentRoute);
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