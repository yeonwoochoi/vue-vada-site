<template>
  <v-img
      :aspect-ratio="aspectRatio"
      style="height: 100%;"
      :src="require('@/assets/bg_login.jpg')"
  >
    <v-row align="center" justify="center" class="ma-0" style="height: 100%;">
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
            <p :class="`white--text ${isMobile ? 'display-1 font-weight-bold' : 'display-2'}`">
              비밀번호 변경
            </p>
          </v-col>
          <v-col cols="9" align="start" class="my-0 py-0">
            <p class="subtitle-1 font-weight-light white--text mb-0 pb-2">
              새 비밀번호
            </p>
            <v-text-field
                v-model="newPwd"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                required
                outlined
                dense
                filled
                dark
                :type="showPassword ? 'text' : 'password'"
            />
          </v-col>
          <v-col cols="9" align="start" class="my-0 py-0">
            <p class="subtitle-1 font-weight-light white--text mb-0 pb-2">
              새 비밀번호 확인
            </p>
            <v-text-field
                v-model="newPwdCheck"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                required
                outlined
                dense
                filled
                dark
                :type="showPassword ? 'text' : 'password'"
            />
          </v-col>
          <v-col cols="9" class="my-0 py-0">
            <v-btn
                x-large
                @click="submit"
                class="font-weight-bold"
                width="100%"
                height="60px"
                style="letter-spacing: 1px; text-transform: none"
            >
              확인
            </v-btn>
            <v-btn
                to="/"
                large
                class="text-center white--text font-weight-bold subtitle-1 elevation-0 #DCDCDC my-3 no-hover-button"
                style="width: 100%; background-color: transparent;"
            >
              취소
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-img>
</template>

<script>
export default {
  name: "ResetPassword",
  data: () => ({
    isShowingAlert: false,
    alertMessage: '',
    newPwd: '',
    newPwdCheck: '',
    showPassword: false,
  }),
  computed: {
    aspectRatio () {
      return this.$vuetify.breakpoint.width / this.$vuetify.breakpoint.height;
    },
    cardWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case "xl": return 30
        case "lg": return 40
        case "md": return 60
        case 'sm': return 70
        case 'xs': return 80
        default: return false
      }
    },
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    }
  },
  methods: {
    showAlert(msg) {
      this.isShowingAlert = false;
      this.alertMessage = msg;
      this.isShowingAlert = true;
    },

    reset() {
      this.isShowingAlert = false;
      this.alertMessage = '';
      this.newPwd = null;
      this.newPwdCheck = null;
    },

    submit () {
      if (!this.newPwd || !this.newPwdCheck) {
        this.showAlert('모든 값을 입력해주세요')
      }
      else if (this.newPwd === this.newPwdCheck) {
        let user = {
          "email": localStorage.id,
          "newPwd": this.newPwd
        }
        this.$store.dispatch('user/resetPwd', user).then(
            (data) => {
              console.log(data)
              this.$router.push('/');
              this.reset();
            },
            (err) => {
              this.showAlert(err);
            }
        );
      } else {
        this.showAlert('비밀번호가 일치하지 않습니다.')
      }
    }
  }
}
</script>

<style scoped>
  .no-hover-button::before {
    display: none;
  }
</style>