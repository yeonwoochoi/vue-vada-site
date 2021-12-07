<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <project-input-card v-if="isDataFetched" :project-data="projectData" :is-update="isUpdate"/>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
import ProjectInputCard from "@/components/projects/ProjectInputCard";
import VueCookies from "vue-cookies";

export default {
  name: "ProjectInput",
  components: {MainCard, ProjectInputCard},
  mounted() {
    this.init();
  },
  data: () => ({
    header: 'Projects',
    isAdmin: false,
    isUpdate: false,
    isDataFetched: false,
    projectData: {}
  }),
  methods: {
    init() {
      if (localStorage.id && VueCookies.get("accessToken")) {
        this.$store.dispatch('user/isAdmin', {id: localStorage.id}).then(
            (isAdmin) => {
              console.log(`isAdmin: ${isAdmin}`)
              this.isAdmin = isAdmin;
              if (!this.isAdmin) {
                alert('접근 권한이 없습니다.')
                this.$router.push('/projects')
              }
              else {
                // update
                if (this.$route.query.uid !== undefined) {
                  this.isUpdate = true;
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
                }
                // create
                else {
                  this.isUpdate = false;
                  this.isDataFetched = true;
                }
              }
            },
            (err) => {
              alert(err)
              this.$router.push('/projects')
            }
        )
      }
      else {
        alert("접근 권한이 없습니다.")
        this.$router.push('/projects')
      }
    },
  }
}
</script>

<style scoped>

</style>