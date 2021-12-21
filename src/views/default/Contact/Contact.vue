<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <google-map class="ml-6"/>
            <div class="pt-4">
              <contact-card :contact-data="contactData1"/>
              <contact-card :contact-data="contactData2"/>
              <contact-card :contact-data="contactData3"/>
            </div>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
import GoogleMap from "@/components/contact/GoogleMap";
import ContactCard from "@/components/contact/ContactCard";

export default {
  name: "Contact",
  components: {ContactCard, GoogleMap, MainCard},
  data: () => ({
    header: 'Contact',
    contactData1: {
      header: 'Mailing address',
      content: 'Professor Changwoo Lee\n' +
          'Department of Computer Information Engineering\n' +
          'Kunsan National University\n' +
          '558, Daehak-ro, Gunsan-si \n' +
          'Jeollabuk-do, Republic of Korea\n' +
          '전북 군산시 대학로 558\n' +
          '군산대학교 디지털 정보관 컴퓨터 정보통신학과 151-317\n' +
          '우편번호 54150'
    },
    contactData2: {
      header: 'Line',
      content: 'Email : cwlee@kunsan.ac.kr (Professor)'
    },
    contactData3: {
      header: 'Directions',
      content: 'How to get to KSNU : English, Korean'
    }
  }),
}
</script>

<style scoped>


pre {
  white-space: pre-wrap;
}
</style>