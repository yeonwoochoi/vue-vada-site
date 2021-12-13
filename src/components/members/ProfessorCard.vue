<template>
  <v-row align="start" justify="center">
    <v-col cols="12" md="4" lg="3" align="start" class="mx-4">
      <v-img :src="getImg" aspect-ratio="1" style="min-width: 258px; max-width: 258px" contain />
      <p class="font-weight-medium title mt-4">{{ rankData.name }}</p>
      <pre class="my-4 content-grey-font">{{ rankData.degree }}</pre>
      <pre class="my-4 content-grey-font">{{ `${rankData.email}\n${rankData.phone}` }}</pre>
    </v-col>
    <v-col cols="12" md="7" lg="8" class="mx-4" align="start">
      <div v-if="rankData.education.length > 0" class="mb-8">
        <p class="title font-weight-medium mb-4">Education</p>
        <pre v-for="(edu, index) in rankData.education" :key="index" class="ma-1 content-grey-font">{{ `•  ${edu}` }}</pre>
      </div>
      <div v-if="rankData.experience.length > 0" class="my-8">
        <p class="title font-weight-medium mb-4">Experience</p>
        <pre v-for="(exp, index) in rankData.experience" :key="index" class="ma-1 content-grey-font">{{ `•  ${exp}` }}</pre>
      </div>
      <div v-if="rankData.affiliation.length > 0" class="mt-8">
        <p class="title font-weight-medium mb-4">Affiliation</p>
        <pre v-for="(aff, index) in rankData.affiliation" :key="index" class="ma-1 content-grey-font">{{ `•  ${aff}` }}</pre>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ProfessorCard",
  props: {
    rankData: {
      type: Object,
      default: () => {
        return {
          rank: '',
          imgSrc: '',
          name: '',
          degree: '',
          email: '',
          phone: '',
          education: [],
          experience: [],
          affiliation: []
        }
      }
    }
  },
  computed: {
    getImg() {
      let fileNames = this.rankData.imgSrc.split('/');
      let newPath = ''
      for (let i = 1; i < fileNames.length; i++) {
        newPath += fileNames[i];
        if (i < fileNames.length - 1) {
          newPath += '/'
        }
      }
      return require(`@/${newPath}`)
    },
    getHeaderFontSize() {
      console.log(this.$vuetify.breakpoint.name)
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 37
        case 'sm': return 37
        default: return 40
      }
    }
  }
}
</script>

<style scoped>
  .content-grey-font {
    font-size: 15px;
    font-family: "Roboto", sans-serif;
    font-weight: normal;
    color: rgba(1, 1, 1, 0.55);
    line-height: 22px;
    letter-spacing: 0mm;
    white-space: pre-wrap;
  }
</style>