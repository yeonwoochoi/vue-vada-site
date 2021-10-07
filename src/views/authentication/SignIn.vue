<template>
  <v-row align="center" justify="center" class="ma-0" style="height: 100%;">
    <v-card width="600px" class="pb-12 mb-12" flat>
      <v-card-title class="blue--text my-2 display-1">
        LOGIN
      </v-card-title>
      <v-card-text>
        <validation-observer ref="observer">
          <v-form @submit.prevent="submit">
            <validation-provider v-slot="{ errors }" name="email" rules="required|email">
              <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  label="Email"
                  required
                  outlined
                  filled
                  dense
              ></v-text-field>
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
                  :type="showPass ? 'text' : 'password'"
              ></v-text-field>
            </validation-provider>
          </v-form>
        </validation-observer>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submit" type="submit" large rounded class="text-center white--text font-weight-bold subtitle-1 blue" style="width: 120px;">
          LOGIN
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
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
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    email: '',
    password: null,
    showPass: false
  }),
  computed: {
    params() {
      return {
        email: this.email,
        password: this.password
      }
    }
  },
  methods: {
    async submit() {
      const valid = await this.$refs.observer.validate()
      if (valid) {
        console.log('login success')
        this.$router.push('/')
      }
    },
    clear() {
      this.email = ''
      this.password = null
      this.$refs.observer.reset()
    }
  }
}
</script>

<style scoped>

</style>