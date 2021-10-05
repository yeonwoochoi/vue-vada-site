<template>
  <v-container fluid>
    <v-row justify="space-between" align="center" class="pa-4">
      <v-col cols="3" align="left">
        <CompanyLogoBtn :logo-src="companyLogo"/>
      </v-col>
      <v-col cols="7" align="right">
        <a
            v-for="(info, i) in footerBtnInfo"
            :key="i"
            class="mr-4 white--text"
            style="text-decoration: none;"
            :href="info.link"
        >
          {{ info.text }}
        </a>
      </v-col>
      <v-col cols="12">
        <div v-for="info in companyInfo" :key="info" class="white--text subtitle-2">
          {{info}}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CompanyLogoBtn from "@/components/CompanyLogoBtn";
export default {
  name: "DefaultFooter",
  components: {CompanyLogoBtn},
  data:()=>({
    companyInfo: [
        '(06235) 서울특별시 강남구 테헤란로 132, 한독타워 11층 (역삼동) │ Tel : 02 3475-7807 │ E-mail : vadapartners@gmail.com │\n',
        '법인명 : 주식회사바다파트너스 │ 대표자 : 김유신 │ 사업자번호 : 325-88-01847',
        '통신판매업 신고번호 : 2021-서울강남-01370호',
        'COPYRIGHT 바다파트너스 2020. ALL RIGHTS RESERVED.'
    ]
  }),
  computed: {
    ...mapState('app', {
      companyLogo: 'companyWhiteLogo',
      footerBtnInfo: 'footerBtnInfo',
      copyright: 'copyright'
    })
  }
}
</script>

<style scoped>

</style>