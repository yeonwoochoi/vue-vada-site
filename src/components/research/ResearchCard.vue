<template>
  <v-row align="start" justify="space-around" class="mb-6 mx-4">
    <v-col v-for="(research, index) in researchData" :key="`research-${index}`" cols="12" sm="6" class="px-6 pb-12">
      <v-img :src="getImg(research.imgSrc)" :aspect-ratio="16/9" style="min-width: 95%; max-width: 95%;"/>
      <p class="font-weight-medium title mt-4 mb-2">{{ research.title }}</p>
      <v-divider style="width: 80px; background-color:rgb(150, 150, 150); border-width: 1px !important;" class="mb-4 mt-1"/>
      <pre class="pr-4 content-grey-font">{{ research.content }}</pre>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ResearchCard",
  props: {
    researchData: {
      type: Array,
      default: () => {
        return [{
          imgSrc: '',
          title: '',
          content: ''
        }]
      }
    }
  },

  //TODO: admin에서 바꿀수 있게끔 asset 폴더에서 빼고 db에 저장하기
  methods: {
    getImg(imgSrc) {
      console.log(imgSrc)
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
  .content-grey-font {
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: normal;
    color: rgba(1, 1, 1, 0.55);
    line-height: 22px;
    letter-spacing: 0mm;
    white-space: pre-wrap;
  }
</style>