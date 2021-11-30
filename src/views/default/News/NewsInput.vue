<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <board-input-card :is-news="true" />
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
import BoardInputCard from "@/components/board/BoardInputCard";
import VueCookies from "vue-cookies";

export default {
  name: "NewsInput",
  components: { MainCard, BoardInputCard },
  data: () => ({
    header: 'News',
  }),
  mounted() {
    if (localStorage.id && VueCookies.get("accessToken")) {
      this.$store.dispatch('user/isAdmin', {id: localStorage.id}).then(
          (isAdmin) => {
            console.log(isAdmin)
            this.isAdmin = isAdmin;
            if (!this.isAdmin) {
              alert('접근 권한이 없습니다.')
              this.$router.push('/news')
            }
          },
          (err) => {
            alert(err)
            this.$router.push('/news')
          }
      )
    }
    else {
      alert("접근 권한이 없습니다.")
      this.$router.push('/news')
    }
  },
}
</script>

<style scoped>

</style>