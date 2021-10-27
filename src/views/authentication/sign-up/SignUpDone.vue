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
              회원가입
            </p>
          </v-col>
          <v-col cols="11" align="center" class="py-0 mt-6">
            <sign-up-header-icons :active-icon-index="2"></sign-up-header-icons>
          </v-col>
          <v-col cols="12" align="center" class="mt-6 mb-2">
            <v-img aspect-ratio="1" style="width: 150px; height: 150px;" contain :src="require('@/assets/icon_complete.png')"/>
          </v-col>
          <v-col cols="10" class="mb-6" style="display: flex; align-items: center; justify-content: center">
            <p class="white--text ma-1 text-h5 text-center font-weight-regular">회원가입이 완료 되었습니다</p>
          </v-col>
          <v-col cols="10" align="center">
            <v-btn
                @click="goToMain"
                type="cancel"
                x-large
                rounded
                class="ma-2 text-center black--text font-weight-bold subtitle-1 #DCDCDC"
                style="width: 180px;"
            >
              메인으로 이동
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-img>
</template>

<script>
import SignUpHeaderIcons from "@/components/signup/SignUpHeaderIcons";
import { mapState, mapMutations } from "vuex";

export default {
  name: "SignUpDone",
  mounted() {
    if (!this.termsOfUse && !this.privacyPolicy) {
      this.$router.push('/authentication/signup-agreement')
    }
  },
  components:{
    SignUpHeaderIcons
  },
  computed:{
    ...mapState('app', {
      termsOfUse: 'termsOfUseCheckBox',
      privacyPolicy: 'privacyPolicyCheckBox'
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
  },
  methods: {
    ...mapMutations('app', {
      setTermsOfUse: 'setTermsOfUse',
      setPrivacyPolicy: 'setPrivacyPolicy'
    }),
    goToMain(){
      this.setTermsOfUse(false);
      this.setPrivacyPolicy(false);
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>