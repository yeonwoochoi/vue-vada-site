<template>
  <v-img
      :aspect-ratio="aspectRatio"
      style="height: 100%;"
      :src="require('@/assets/bg_login.jpg')"
  >
    <v-row align="center" justify="center" class="ma-0" style="height: 100%;">
      <v-card :style="`width: ${cardWidth}%; height: fit-content`" class="my-9 pb-12 elevation-10" :img="require('@/assets/bg_login.jpg')">
        <v-alert
          :value="isShowingAlert"
          type="error"
          transition="slide-y-transition"
          >
          {{ alertMessage }}
        </v-alert>
        <v-row align="center" justify="center" :class="`${isShowingAlert ? 'pt-0' : 'pt-12'}`" style="width: 100%; height: fit-content;">
          <v-col cols="10" class="text-center pb-0 mb-0">
            <p class="white--text display-1">
              회원가입
            </p>
          </v-col>
          <v-col cols="11" align="center" class="py-3 my-0">
            <sign-up-header-icons :active-icon-index="1"></sign-up-header-icons>
          </v-col>
          <v-col cols="9" align="center" class="py-0 my-0">
            <validation-observer ref="observer">
              <v-form @submit.prevent="submit">
                <validation-provider v-slot="{ errors }" name="Email" rules="required|email">
                  <p class="white--text ma-1 subtitle-1 text-start font-weight-regular">Email</p>
                  <div style="display:flex; flex-direction: row; justify-content: start; align-items: start">
                    <v-text-field
                        v-model="email"
                        :error-messages="errors"
                        required
                        outlined
                        dense
                        filled
                        dark
                        :disabled="isAuthorized"
                    />
                    <v-btn
                        @click="sendEmailAuthCode"
                        large
                        class="font-weight-bold ml-4"
                        :disabled="isAuthorized"
                    >
                      이메일 인증
                    </v-btn>
                  </div>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="Email auth code" v-if="isEmailAuthCodeSending">
                  <div style="display:flex; flex-direction: row; justify-content: start; align-items: start">
                    <v-text-field
                        v-model="emailAuthCode"
                        :error-messages="errors"
                        @keypress="isNumber($event)"
                        maxlength="6"
                        required
                        outlined
                        dense
                        filled
                        dark
                        :disabled="isAuthorized"
                    />
                    <v-btn
                        @click="emailAuth"
                        large
                        class="font-weight-bold ml-4"
                        :disabled="isAuthorized"
                    >
                      확인
                    </v-btn>
                  </div>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="Password" vid="password" rules="required|alpha-dash|min:8|max:20">
                  <p class="white--text ma-1 subtitle-1 text-start font-weight-regular">Password</p>
                  <v-text-field
                      v-model="password"
                      :error-messages="errors"
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
                <validation-provider v-slot="{ errors }" name="Confirm password" rules="required|confirmed:password" data-vv-as="password">
                  <p class="white--text ma-1 subtitle-1 text-start font-weight-regular">Confirm Password</p>
                  <v-text-field
                      v-model="passwordConfirmed"
                      :error-messages="errors"
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
                <validation-provider v-slot="{ errors }" name="Name" rules="required">
                  <p class="white--text ma-1 subtitle-1 text-start font-weight-regular">Username</p>
                  <v-text-field
                      v-model="username"
                      :error-messages="errors"
                      required
                      outlined
                      dense
                      filled
                      dark
                  />
                </validation-provider>
                <p class="white--text ma-1 subtitle-1 text-start font-weight-regular">Phone</p>
                <div style="display:flex; flex-direction: row; justify-content: center; align-items: center">
                  <v-select
                      v-model="phoneFirst"
                      :items="phoneFirstList"
                      :menu-props="{ closeOnClick: true, offsetY: true, bottom: true }"
                      style="width: 25%;"
                      dense
                      filled
                      dark
                  />
                  <p class="white--text font-weight-bold title text-center mb-6 mx-5"> - </p>
                  <v-text-field
                      v-model="phoneMiddle"
                      @keypress="isNumber($event)"
                      style="width: 25%;"
                      maxlength="4"
                      required
                      outlined
                      dense
                      filled
                      dark
                  />
                  <p class="white--text font-weight-bold title text-center mb-6 mx-5"> - </p>
                  <v-text-field
                      v-model="phoneLast"
                      @keypress="isNumber($event)"
                      style="width: 25%;"
                      maxlength="4"
                      required
                      outlined
                      dense
                      filled
                      dark
                  />
                </div>
                <p class="white--text ma-1 subtitle-1 text-start font-weight-regular">Organization</p>
                <div>
                  <v-radio-group
                    v-model="organization"
                    mandatory
                    dark
                    row
                  >
                    <v-radio
                      label="Private"
                      value="Private"
                      class="mr-6"
                    />
                    <v-radio
                      label="Institution"
                      value="Institution"
                      class="mr-6"
                    />
                    <v-radio
                      label="Enterprise"
                      value="Enterprise"
                      class="mr-6"
                    />
                  </v-radio-group>
                </div>
              </v-form>
            </validation-observer>
          </v-col>
          <v-col cols="10" align="end" class="mb-0 pb-0">
            <v-btn
                @click="submit"
                type="submit"
                x-large
                rounded
                class="mx-2 text-center black--text font-weight-bold subtitle-1 #DCDCDC"
                style="width: 150px;"
            >
              회원가입하기
            </v-btn>
            <v-btn
                @click="cancel"
                type="cancel"
                x-large
                rounded
                class="mx-2 text-center black--text font-weight-medium subtitle-1 #DCDCDC"
                style="width: 150px;"
            >
              취소하기
            </v-btn>
          </v-col>
          <v-col cols="12" v-if="isShowingAlert"/>
        </v-row>
      </v-card>
    </v-row>
  </v-img>
</template>

<script>
import { required, email, between, confirmed, alpha_dash, integer, min, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";
import SignUpHeaderIcons from "@/components/SignUpHeaderIcons";
import { mapState } from "vuex";

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('email', {
  ...email,
  message: '{_field_} must be valid'
})

extend('confirmed', {
  ...confirmed,
  message: '{_field_} must match'
})

extend('between', {
  ...between,
  message: '{_field_} must be between 8 and 20'
})

extend('alpha-dash', {
  ...alpha_dash,
  message: '{_field_} may contain alpha-numeric characters as well as dashes and underscores'
})

extend('integer', {
  ...integer,
  message: '{_field_} must be an integer'
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than 8 characters'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than 20 characters'
})


export default {
  name: "SignUp",
  mounted() {
    if (!this.termsOfUse && !this.privacyPolicy) {
      this.$router.push('/authentication/signup-agreement')
    }
    this.reset();
  },
  data: () => ({
    email: '',
    emailAuthCode: '',
    isEmailAuthCodeSending: false,
    isEmailClickChecking: false,
    isAuthorized: false,
    password: null,
    passwordConfirmed: null,
    username: '',
    phoneFirst: '010',
    phoneMiddle: null,
    phoneLast: null,
    phoneFirstList: ['010','011','016','017','019','02','031','032','033','041','043','042','044','051','052','053','054','055','061','062','063','064','070'],
    organization: 'Private',
    showPassword: false,
    isShowingAlert: false,
    alertMessage: ""
  }),
  components: {
    ValidationObserver,
    ValidationProvider,
    SignUpHeaderIcons
  },
  computed: {
    ...mapState('app', {
      termsOfUse: 'termsOfUseCheckBox',
      privacyPolicy: 'privacyPolicyCheckBox'
    }),
    ...mapState('user', {
      emailAuthNum: "emailAuthNumForSignUp"
    }),
    aspectRatio () {
      return this.$vuetify.breakpoint.width / this.$vuetify.breakpoint.height;
    },
    cardWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case "xl": return 55
        case "lg": return 65
        case "md": return 70
        case 'sm': return 80
        case 'xs': return 90
        default: return false
      }
    },
    phone () {
      return `${this.phoneFirst}-${this.phoneMiddle}-${this.phoneLast}`
    }
  },
  methods: {
    async submit() {
      const valid = await this.$refs.observer.validate();
      if (valid && this.phone && this.isAuthorized) {
        let user = {
          "id": this.email,
          "pwd": this.password,
          "name": this.username,
          "phone": this.phone,
          "organization": this.organization
        }
        console.log(user)
        this.$store.dispatch('user/register', user).then(
            () => {
              this.$router.push('/authentication/signup-done')
            },
            (msg) => {
              this.showAlert(msg);
              //this.$router.push('/authentication/sign-in')
            },
        )
      }
    },

    async sendEmailAuthCode() {
      // email validate check
      if (!this.isEmailClickChecking) {
        this.isEmailClickChecking = true;
        if (!this.email) {
          this.showAlert('Please input email.')
          this.isEmailClickChecking = false;
        } else {
          let user = {
            "email": this.email
          }
          this.$store.dispatch('user/emailAuth', user).then(
              () => {
                alert("인증 코드가 발송되었습니다.")
                this.isEmailAuthCodeSending = true;
                this.closeAlert();
              },
              (msg) => {
                this.isEmailClickChecking = false;
                this.showAlert(msg);
              }
          )
        }
      }
    },

    emailAuth() {
      console.log(this.emailAuthNum)
      if (`${this.emailAuthNum}` === this.emailAuthCode) {
        alert("인증이 완료되었습니다.")
        this.closeAlert();
        this.isAuthorized = true;
      } else {
        this.showAlert("올바른 인증 코드를 입력해주세요.")
      }
    },

    cancel(){
      this.reset();
      this.$router.push('/authentication/sign-in')
    },

    reset() {
      this.email = '';
      this.isEmailAuthCodeSending = false;
      this.isEmailClickChecking = false;
      this.isAuthorized = false;
      this.password = null;
      this.passwordConfirmed = null;
      this.username = '';
      this.phoneFirst = '010';
      this.phoneMiddle = null;
      this.phoneLast = null;
      this.organization = 'Private';
      this.showPassword = false;
      this.isShowingAlert = false;
      this.$refs.observer.reset()
    },

    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    showAlert (msg) {
      this.isShowingAlert = false;
      this.alertMessage = msg;
      this.isShowingAlert = true;
    },

    closeAlert () {
      this.isShowingAlert = false;
      this.alertMessage = "";
    }
  }
}
</script>

<style scoped>

</style>