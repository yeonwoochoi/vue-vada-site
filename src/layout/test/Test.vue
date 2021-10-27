<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">

      </v-card>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "Test",
  data: () => ({
    researchData: [
      {
        imgSrc: '@/assets/research/research_deep_learning.jpg',
        title: 'Deep Learning',
        content: 'We are interested in innovative deep learning algorithms and applications for large-scale data analysis and data-driven learning that can deliver breakthrough performance.'
      },
      {
        imgSrc: '@/assets/research/research_artificial_intelligence.jpg',
        title: 'Artificial Intelligence',
        content: 'We are creating scalable and accurate artificial intelligence algorithms based on recent breakthroughs in deep learning, machine learning, data mining, and statistical/adaptive signal processing.'
      },
      {
        imgSrc: '@/assets/research/research_system_for_intelligence.jpg',
        title: 'Systems for Intelligence',
        content: 'We are developing technology solutions that can implement and accelerate our analytics engines with emphasis on intelligent memory/storage systems and massively parallel/distributed architectures.'
      },
      {
        imgSrc: '@/assets/research/research_intelligence_healthcare.jpg',
        title: 'Intelligent Healthcare',
        content: 'We are aiming at discovering knowledge and wisdom in precision medicine, quantitative biology and genomics, and data-driven digital healthcare.'
      },
    ]
  }),
  methods: {
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
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: normal;
    color: rgba(1, 1, 1, 0.55);
    line-height: 22px;
    letter-spacing: 0mm;
    white-space: pre-wrap;
  }
</style>