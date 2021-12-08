<template>
  <v-card :style="`width: ${cardWidth}%; height: fit-content;`" class="elevation-10" :img="require('@/assets/bg_login.jpg')">
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
          Password reset
        </p>
        <p class="white--text subtitle-1 font-weight-light">
          {{ `You have requested a password reset. To get a new password, please check your inbox for the Red email from Vada and enter the Password reset code we have sent to:\n`}}
        </p>
        <p class="white--text subtitle-1 font-weight-bold">
          {{ `${email}` }}
          <a
              style="text-decoration: none;"
              href="/authentication/forgot-password"
          >
            Change email
          </a>
        </p>

      </v-col>
      <v-col cols="9" align="start" class="my-0 py-0">
        <p class="subtitle-1 font-weight-light white--text mb-0 pb-2">
          Password reset code
        </p>
        <v-text-field
            v-model="emailAuthOtp"
            @keypress="isNumber($event)"
            maxlength="6"
            required
            dark
            class="my-0 py-0"
        />
      </v-col>
      <v-col cols="9" class="mt-0 pt-0">
        <v-btn
            x-large
            block
            :disabled="!isActive"
            @click="submit"
            class="font-weight-bold"
            width="100%"
            height="60px"
            style="letter-spacing: 1px; text-transform: none"
        >
          Confirm
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {mapMutations, mapState} from "vuex";
export default {
  name: "ForgotPasswordAuth",
  data: () => ({
    isShowingAlert: false,
    alertMessage: '',
    emailAuthOtp: null,
    otpLength: 6
  }),
  props: ['email'],
  computed: {
    ...mapState('user', {
      code : "emailAuthNumForResetPwd"
    }),
    aspectRatio () {
      return this.$vuetify.breakpoint.width / this.$vuetify.breakpoint.height;
    },
    cardWidth () {
      console.log(this.$vuetify.breakpoint.height)
      switch (this.$vuetify.breakpoint.name) {
        case "xl": return 40
        case "lg": return 55
        case "md": return 70
        case 'sm': return 85
        case 'xs': return 95
        default: return false
      }
    },
    isActive() {
      if (!this.emailAuthOtp) return false;
      return this.emailAuthOtp.length === this.otpLength;
    }
  },
  methods: {
    ...mapMutations('user', {
      'resetAuthCode': 'resetEmailAuthNumForResetPwd'
    }),

    showAlert(msg) {
      this.isShowingAlert = false;
      this.alertMessage = msg;
      this.isShowingAlert = true;
    },

    reset() {
      this.isShowingAlert = false;
      this.alertMessage = '';
      this.emailAuthOtp = null;
      this.resetAuthCode()
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

    submit () {
      console.log(this.code)
      if (this.emailAuthOtp.length === this.otpLength) {
        if (`${this.code}` === '-1') {
          this.$router.go(this.$router.currentRoute);
        }
        else if (`${this.emailAuthOtp}` === `${this.code}`) {
          console.log('forgot password email auth success');
          let user = {
            "email": this.email
          }
          this.$store.dispatch('user/resetPwd', user).then(
              () => {
                this.$router.push('/authentication/forgot-password-done')
                this.reset();
              },
              (err) => {
                this.showAlert(err);
              }
          );
          /// 비밀번호 재설정 해줘야지.. 서버통신 ... 성공하면 아래코드 실행.
        }
        else {
          console.log('forgot password email auth failure')
          this.showAlert('잘못된 인증코드입니다.')
        }
      } else {
        this.showAlert('인증번호 6자리를 입력해주십시오.')
      }
    },
  }
}
</script>

<style scoped>
</style>