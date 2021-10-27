<template>
  <v-card class="pa-4 card-flat" flat style="min-width: 300px; height: fit-content;">
    <v-img :src="getImg" contain aspect-ratio="1" style="min-width: 258px; max-width: 258px;"/>
    <p class="font-weight-medium title mt-4">{{ memberData.name }}</p>
    <pre class="my-4 content-grey-font">{{ `${memberData.email}\n${memberData.phone}` }}</pre>
    <div v-if="memberData.researchArea" class="mt-4">
      <p class="font-weight-medium subtitle-1">Research Area</p>
      <pre class="my-4 content-grey-font">{{ memberData.researchArea }}</pre>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "MemberCard",
  props: {
    memberData: {
      type: Object,
      default: () => {
        return {
          imgSrc: '@/assets/members/icon_coming_soon.png',
          name: 'BLAH',
          email: 'blahblah@korea.ac.kr',
          phone: '010-1111-1111',
          researchArea: null,
        }
      }
    }
  },
  computed: {
    getImg() {
      let fileNames = this.memberData.imgSrc.split('/');
      let newPath = ''
      for (let i = 1; i < fileNames.length; i++) {
        newPath += fileNames[i];
        if (i < fileNames.length - 1) {
          newPath += '/'
        }
      }
      return require(`@/${newPath}`)
    },
  }
}
</script>

<style scoped>
  .card-flat {
    width: 100%;
    height: fit-content;
    background-color: transparent;
  }
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