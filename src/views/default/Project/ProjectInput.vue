<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <project-input-card/>
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
    if (localStorage.id && VueCookies.get("accessToken")) {
      this.$store.dispatch('user/isAdmin', {id: localStorage.id}).then(
          (isAdmin) => {
            console.log(isAdmin)
            this.isAdmin = isAdmin;
            if (!this.isAdmin) {
              alert('접근 권한이 없습니다.')
              this.$router.push('/projects')
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
  data: () => ({
    header: 'Projects',
    isAdmin: false,
  }),
}
</script>

<style scoped>

</style>