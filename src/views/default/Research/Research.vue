<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <research-card :research-data="researchData"/>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ResearchCard from "@/components/research/ResearchCard";
import MainCard from "@/components/MainCard";
export default {
  name: "Research",
  components: {MainCard, ResearchCard},
  data: () => ({
    header: 'Research Topics',
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
  })
}
</script>

<style scoped>
</style>