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
          <v-col cols="11" align="center" class="py-0 my-0">
            <sign-up-header-icons :active-icon-index="0"></sign-up-header-icons>
          </v-col>
          <v-col cols="11" class="py-0 my-0" align="end">
            <v-checkbox
                class="ml-3"
                dark
                v-model="totalCheckBox"
                :label="totalCheckBoxComment"
            />
          </v-col>
          <v-col cols="11" align="center" class="white--text py-0 my-0">
            <p class="pa-3 subtitle-2 text-start" style="height: 150px; width: 100%; overflow-y: scroll; white-space: pre-wrap;">
              {{ termsOfUse }}
            </p>
            <v-checkbox
                class="ml-3"
                dark
                v-model="termsOfUseCheckBox"
                :label="termsOfUseCheckBoxComment"
            />
          </v-col>
          <v-col cols="11" align="center" class="white--text py-0 my-0">
            <p class="pa-3 subtitle-2 text-start" style="height: 150px; width: 100%; overflow-y: scroll; white-space: pre-wrap;">
              {{ privacyPolicy }}
            </p>
            <v-checkbox
                class="ml-3"
                dark
                v-model="privacyPolicyCheckBox"
                :label="privacyPolicyCheckBoxComment"
            />
          </v-col>
          <v-col cols="11" align="center" class="my-6">
            <v-btn
                color="white"
                x-large
                class="title black--text font-weight-bold mx-2"
                @click="onClickNextBtn"
            >
              다음으로 >
            </v-btn>
            <v-btn
                color="white"
                x-large
                class="title black--text font-weight-medium mx-2"
                @click="$router.push('/authentication/sign-in')"
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
import SignUpHeaderIcons from "@/components/SignUpHeaderIcons";
import { mapState, mapMutations } from "vuex";

export default {
  name: "SignUpAgreement",
  data: () => ({
    headerIcons: [
        require('@/assets/signup/icon_agreement_active.png'),
        require('@/assets/signup/icon_enter_user_info_inactive.png'),
        require('@/assets/signup/icon_sign_up_complete_inactive.png')
    ],
    totalCheckBox: false,
    termsOfUseCheckBox: false,
    privacyPolicyCheckBox: false,
    totalCheckBoxComment: '전체약관 동의하기',
    termsOfUseCheckBoxComment: '바다파트너스의 이용약관에 동의합니다.',
    privacyPolicyCheckBoxComment: '바다파트너스의 개인정보 처리방침 동의합니다.',
  }),
  components: {
    SignUpHeaderIcons
  },
  computed: {
    ...mapState('app', {
      termsOfUse: 'termsOfUse',
      privacyPolicy: 'privacyPolicy'
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
    onClickNextBtn() {
      if (this.totalCheckBox) {
        this.$router.push('/authentication/sign-up')
      } else {
        if (!this.termsOfUseCheckBox) {
          alert('이용약관에 동의해 주세요.')
        }
        else if (!this.privacyPolicyCheckBox) {
          alert('개인정보 처리방침에 동의해 주세요.')
        }
      }
    }
  },
  watch: {
    totalCheckBox (val){
      if (val) {
        this.termsOfUseCheckBox = true;
        this.privacyPolicyCheckBox = true;
        this.setTermsOfUse(true);
        this.setPrivacyPolicy(true);
      }
    },
    termsOfUseCheckBox (val) {
      this.setTermsOfUse(val);
      this.totalCheckBox = val && this.privacyPolicyCheckBox;
    },
    privacyPolicyCheckBox (val) {
      this.setPrivacyPolicy(val);
      this.totalCheckBox = val && this.termsOfUseCheckBox;
    }
  }
}
</script>

<style scoped>

</style>