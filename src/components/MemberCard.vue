<template>
  <v-card width="270px" height="fit-content" class="pa-4" flat>
    <div style="min-height: 600px;">
      <v-img :src="headerImg" width="100%" aspect-ratio="1" class="my-2" contain/>
      <v-card-title class="mb-2">
        <div>
          <pre class="font-weight-medium">{{ memberData.name.korean }}</pre>
          <pre class="font-weight-black text-h5">{{ memberData.name.english }}</pre>
        </div>
      </v-card-title>
      <v-card-subtitle class="py-0">
        <div v-for="(state, index) in memberData.state" :key="index">
          <pre class="font-weight-light">{{ state }}</pre>
        </div>
        <p class="font-weight-light lighten-1 mt-2">{{ memberData.email }}</p>
      </v-card-subtitle>
      <v-divider style="color: #DCDCDC; width: 100%"/>
      <v-card-text class="mt-4 py-0">
        <pre class="#DCDCDC my-1"><strong>BS</strong>: {{ memberData.bs }}</pre>
        <pre v-if="memberData.career" class="#DCDCDC"><strong>Career</strong>: {{ memberData.career }}</pre>
        <pre class="#DCDCDC my-1"><strong>Admission</strong>: {{ memberData.admission }}</pre>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "MemberCard",
  mounted() {
    let img = '';
    try {
      img = require(`@/assets/members/${this.memberData.img}`);
      this.headerImg = img;
    }
    catch (e) {
      console.log('Cannot find member image')
      img = require('@/assets/members/icon_coming_soon.png');
      this.headerImg = img;
    }
  },
  props: {
    memberData: {
      type: Object,
      default: () => {
        return {
          img: require('@/assets/members/icon_coming_soon.png'),
          name: {
            korean: '이름',
            english: 'Name'
          },
          state: ['PH.D. STUDENT', 'DEEP LEARNING'],
          email: 'blahblah@korea.ac.kr',
          bs: 'School of Business Administration, Hankuk University of Foreign Language, 2018',
          career: '',
          admission: 'September 1, 2019'
        }
      }
    }
  },
  data: () => ({
    headerImg: ''
  }),
}
</script>

<style scoped>
  pre{
    white-space: pre-wrap;
  }
</style>