<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0 mb-12">
        <main-card :header="header" v-if="isDataFetched">
          <template v-slot:body>
            <v-img :src="`http://${projectData.src}`" :aspect-ratio="16/9" contain style="width: 100%" />
            <div class="mt-6 ml-6">
              <p class="text-start ma-2 headline grey--text font-weight-medium text--darken-3">
                {{ projectData.title }}
              </p>
              <p class="text-start mx-2 mb-4 subtitle-2 grey--text font-weight-regular">
                {{ `${projectData.from}-${projectData.to} | ${projectData.sponsor}` }}
              </p>
              <pre class="subtitle-1 content-grey-font ml-3" v-html="projectData.content"/>
            </div>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
export default {
  name: "ProjectContent",
  components: {
    MainCard
  },
  mounted() {
    this.$store.dispatch("project/readProjectByIdx", this.$route.query.uid).then(
        (result) => {
          this.projectData = result.data.data
          this.isDataFetched = true;
        },
        (err) => {
          alert(err)
          this.$router.push('/projects')
        }
    )
  },
  data: () => ({
    header: 'Projects',
    projectData: {},
    isDataFetched: false
  })
}
</script>

<style scoped>
.content-grey-font {
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  color: rgba(1, 1, 1, 0.75);
}
</style>