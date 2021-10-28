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
      content: 'Professor Sungroh Yoon\n' +
          'Rm. 908, Bldg. 301\n' +
          'Department of Electrical and Computer Engineering\n' +
          'Seoul National University\n' +
          '1 Gwanak-ro, Gwanak-gu\n' +
          'Seoul 08826, Republic of Korea\n' +
          '서울 관악구 관악로 1\n' +
          '서울대학교 공과대학 전기정보공학부 301동 908호\n' +
          '우편번호 08826\n'
    },
    contactData2: {
      header: 'Line',
      content: 'Phone : +82-2-880-1406 (Professor), +82-2-880-1406 (Lab)\n' +
          'Fax : +82-2-880-1406'
    },
    contactData3: {
      header: 'Directions',
      content: 'How to get to SNU (Gwanak campus): English, Korean'
    }
  }),
}
</script>

<style scoped>

.content-grey-font {
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  color: rgba(1, 1, 1, 0.55);
  line-height: 22px;
  letter-spacing: 0mm;
  white-space: pre-wrap;
}

pre {
  white-space: pre-wrap;
}
</style>