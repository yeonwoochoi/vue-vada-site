<template>
  <v-footer
      app
      absolute
      padless
      color="rgb(25,25,25)"
      height="280"
  >
    <v-container>
      <v-row justify="space-between" align="center" class="pa-4">
        <v-col cols="12" align="start" class="mb-5">
          <CompanyLogoBtn :logo-src="companyLogo" :logo-height="250"/>
        </v-col>
        <v-col cols="12" align="start">
          <div v-for="info in companyInfo" :key="info" class="white--text subtitle-2">
            {{info}}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'
import CompanyLogoBtn from "@/components/CompanyLogoBtn";

export default {
  name: "DefaultFooter",
  components: {CompanyLogoBtn},
  data:()=>({
    companyInfo: [
      'Unit 317, Digital Information Center, 558 Daehak-ro Gunsan-si Jeollabuk-do\n',
      '© Copyright 2021, Artificial Intelligence Laboratory,\n',
      'Kunsan National University.\n',
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