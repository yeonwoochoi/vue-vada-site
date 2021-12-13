<template>
  <v-row align="start" justify="start">
    <v-col v-for="(member, index) in memberData" :key="`member-${index}`" cols="12" md="4" lg="3" sm="6" align="start" class="pr-4">
      <v-card class="pa-4 card-flat" flat style="min-width: 300px; height: fit-content;">
        <v-img :src="getImg(member.imgSrc)" contain aspect-ratio="1" style="min-width: 258px; max-width: 258px;"/>
        <p class="font-weight-medium title mt-4">{{ member.name }}</p>
        <pre class="my-4 content-grey-font">{{ `${member.email}\n${member.phone}` }}</pre>
        <div v-if="member.researchArea" class="mt-4">
          <p class="font-weight-medium subtitle-1">Research Area</p>
          <pre class="my-4 content-grey-font">{{ member.researchArea }}</pre>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "StudentCard",
  props: {
    memberData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    getHeaderFontSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 37
        case 'sm':
          return 37
        default:
          return 40
      }
    },
    getImg(imgSrc) {
      let fileNames = imgSrc.split('/');
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