<template>
  <v-card flat class="project-card pa-1" align="start" outlined>
    <v-hover v-slot="{ hover }">
      <v-img
          contain
          :src="imgSrc"
          :error="errorImg"
          :aspect-ratio="16/9"
          @click="onClickCard"
          style="width: 100%; cursor: pointer"
      >
        <v-fade-transition>
          <div
              v-if="hover"
              class="d-flex  v-card--reveal text-h4 white--text"
              style="height: 100%; background-color: black"
          >
            <v-icon dark>mdi-arrow-right-bold-circle-outline</v-icon>
          </div>
        </v-fade-transition>
      </v-img>
    </v-hover>
    <p
        @click="onClickCard"
        class="text-start ma-2 subtitle-1 grey--text text--darken-3"
        style="cursor: pointer"
    >
      {{ projectData.title }}
    </p>
    <p
        class="text-start ma-2 subtitle-2 grey--text font-weight-regular"
    >
      {{ `${projectData.from}-${projectData.to} | ${projectData.sponsor}` }}
    </p>
    <v-btn
        plain
        @click="onClickCard"
        class="elevation-0 caption px-0 mx-2"
        style="background-color: transparent;"
    >
      Read More
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    projectData: {
      type: Object,
      default: () => {
        return {
          no: 1,
          src: require('@/assets/no_thumbnail.png'),
          title: '',
          content: '',
          from: '',
          to: '',
          sponsor: '',
        }
      }
    }
  },
  data:() => ({

  }),
  computed: {
    errorImg() {
      return require('@/assets/no_thumbnail.png');
    },
    imgSrc() {
      let temp = this.projectData.src.split('/');
      return temp[temp.length-1] === 'null' ? require('@/assets/no_thumbnail.png') : `http://${this.projectData.src}`;
    }
  },
  methods: {
    onClickCard () {
      this.$router.push({
        path: '/projects/content',
        query: {
          'uid': this.projectData.no
        }
      })
    }
  }
}
</script>

<style scoped>
.project-card {
  max-width: 350px;
  width: 100%;
  min-height: 300px;
  height: fit-content;
  background-color: transparent;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .85;
  position: absolute;
  width: 100%;
}
</style>