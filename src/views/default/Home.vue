<template>
  <v-container fluid class="pa-0">
    <v-row align="center" justify="center">
      <v-col cols="12" align="center" class="px-0">
        <home-card class="home-card" title="Data Science & Business Analytics (DSBA) Lab" subtitle="고려대학교 산업경영공학부 데이터과학 및 비즈니스 어낼리틱스 연구실 방문을 환영합니다.">
          <template v-slot:body>
            <v-row align="center" justify="center">
              <v-col cols="11" sm="6" md="8" class="my-12">
                <carousel
                    :autoplayLoop="true"
                    :autoplay="true"
                    :autoplayTimeout="3000"
                    :autoplayHoverPause="true"
                    :per-page="3"
                    :perPageCustom="[[480, 1], [768, 2], [992, 3]]"
                >
                  <slide
                      v-for="(photo, i) in groupPhoto"
                      :key="i"
                      :data-index="i"
                      :data-name="`Slide-${i}`"
                  >
                    <img
                        :src="photo.src"
                        style="max-width: 100%;"
                    />
                  </slide>
                </carousel>
              </v-col>
            </v-row>
          </template>
        </home-card>
      </v-col>
      <v-col cols="12" align="center" class="px-0">
        <home-card class="home-card-with-color" title="RESEARCHES">
          <template v-slot:body>
            <v-row align="center" justify="center" style="max-width: 1200px;">
              <v-col cols="10" sm="6" md="4" v-for="(data, i) in researches" :key="i" class="my-6">
                <v-img :src="data.src" style="max-width: 64px"/>
                <p class="font-weight-medium mt-6">{{ data.text }}</p>
              </v-col>
            </v-row>
          </template>
        </home-card>
      </v-col>
      <v-col cols="8" align="center" class="px-0 mb-12">
        <home-card class="home-card-bottom" title="PROJECTS">
          <template v-slot:body>
            <v-row align="start" justify="center" class="pt-6" v-if="isDataFetched">
              <v-col cols="12" sm="6" md="3" v-for="(project, i) in sampleProjectData" :key="i">
                <project-card :project-data="project"/>
              </v-col>
            </v-row>
          </template>
        </home-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HomeCard from "@/components/home/HomeCard";
import { Carousel, Slide } from 'vue-carousel';
import ProjectCard from "@/components/projects/ProjectCard";

export default {
  name: "Home",
  components: {ProjectCard, HomeCard, Carousel, Slide},
  mounted() {
    this.$store.dispatch('project/readProjectAll').then(
        (result) => {
          this.projects = result.data.data
          if (this.projects.length > 0) {
            this.isDataFetched = true;
          }
        },
        err => {
          alert(err)
        }
    )
  },
  data: () => ({
    projectDataCount: 4,
    isDataFetched: false,
    groupPhoto: [
      {
        src: require('@/assets/photo/group_photo_2016.jpg'),
      },
      {
        src: require('@/assets/photo/group_photo_2017.jpg'),
      },
      {
        src: require('@/assets/photo/group_photo_2018.jpg'),
      },
      {
        src: require('@/assets/photo/group_photo_2019.jpg'),
      },
    ],
    researches: [
      {
        src: require('@/assets/icon/home_icon_machine_learning_algorithms.png'),
        text: 'Machine Learning Algorithms'
      },
      {
        src: require('@/assets/icon/home_icon_natural_language_processing.png'),
        text: 'Natural Language Processing'
      },
      {
        src: require('@/assets/icon/home_icon_image_processing.png'),
        text: 'Image Processing'
      },
      {
        src: require('@/assets/icon/home_icon_novelty_detection.png'),
        text: 'Novelty Detection'
      },
      {
        src: require('@/assets/icon/home_icon_smart_manufacturing.png'),
        text: 'Smart Manufacturing'
      },
      {
        src: require('@/assets/icon/home_icon_recommendation system.png'),
        text: 'Recommendation System'
      },
    ],
    projects: []
  }),
  computed: {
    sampleProjectData() {
      let count = this.projectDataCount
      if (this.projects.length < this.projectDataCount) {
        count = this.projects.length
      }
      return this.projects.slice(0, count)
    }
  }
}
</script>

<style scoped>
  .home-card {
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .home-card-bottom {
    padding-top: 50px;
    padding-bottom: 100px;
  }
  .home-card-with-color {
    background-color: #F5F5F5;
    padding-top: 70px;
    padding-bottom: 50px;
    margin-bottom: 50px;
  }
</style>