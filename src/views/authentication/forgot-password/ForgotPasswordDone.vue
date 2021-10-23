<template>
  <v-img
      :aspect-ratio="aspectRatio"
      style="height: 100%;"
      :src="require('@/assets/bg_login.jpg')"
  >
    <v-row align="center" justify="center" class="ma-0" style="height: 100%;">
      <v-card :style="`width: ${cardWidth}%; height: fit-content;`" class="my-9 pb-9 elevation-10" :img="require('@/assets/bg_login.jpg')">
        <v-row align="center" justify="center" style="width: 100%; height: 100%;">
          <v-col cols="11" class="text-center pb-0 mb-0 mt-12">
            <p class="white--text display-1">
              비밀번호 재설정 완료
            </p>
          </v-col>
          <v-col cols="12" align="center" class="mt-6 mb-2">
            <v-img aspect-ratio="1" style="width: 150px; height: 150px;" contain :src="require('@/assets/icon_complete.png')"/>
          </v-col>
          <v-col cols="10" class="mb-6" style="display: flex; align-items: end; justify-content: center">
            <p class="white--text text-h5 text-center font-weight-light">
              임시 비밀번호는
            </p>
            <p class="white--text mr-3 ml-1 text-h3 text-center font-weight-medium">{{tempPassword}}</p>
            <p class="white--text text-h5 text-center font-weight-light">입니다.</p>
          </v-col>
          <v-col cols="10" align="center">
            <v-btn
                @click="goToLogin"
                type="cancel"
                x-large
                rounded
                class="ma-2 text-center black--text font-weight-bold subtitle-1 #DCDCDC"
                style="width: 180px;"
            >
              로그인으로 이동
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-img>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ForgotPasswordDone",
  mounted() {
    if (!this.tempPassword) {
      this.$router.push('/')
    }
  },
  computed:{
    ...mapState('user', {
      tempPassword: 'tempPassword'
    }),
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
    goToLogin(){
      this.$router.push('/authentication/sign-in')
    }
  }
}
</script>

<style scoped>

</style>