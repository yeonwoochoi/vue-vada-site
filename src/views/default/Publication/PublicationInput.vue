<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <publication-input-card v-if="isDataFetched" :publication-data="publicationData" :is-update="isUpdate"/>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import PublicationInputCard from "@/components/publications/PublicationInputCard";
import MainCard from "@/components/MainCard";
import VueCookies from "vue-cookies";

export default {
  name: "PublicationInput",
  components: {PublicationInputCard, MainCard},
  data:()=>({
    header: 'Publications',
    isUpdate: false,
    isDataFetched: false,
    publicationData: {}
  }),
  mounted() {
    if (localStorage.id && VueCookies.get("accessToken")) {
      this.$store.dispatch('user/isAdmin', {id: localStorage.id}).then(
          (isAdmin) => {
            if (!isAdmin) {
              alert('접근 권한이 없습니다.')
              this.$router.push('/publications')
            }
            else {
              let params = this.$route.query.uid;
              this.isUpdate = params !== undefined;
              if (params !== undefined) {
                this.$store.dispatch("publications/readContentByIdx", params).then(
                    (data) => {
                      this.publicationData = data;
                      this.isDataFetched = true;
                    },
                    (err) => {
                      alert(err)
                      this.$router.push("/publications")
                    }
                )
              }
              else {
                this.isDataFetched = true;
              }
            }
          },
          (err) => {
            alert(err)
            this.$router.push('/publications')
          }
      )
    }
    else {
      alert("접근 권한이 없습니다.")
      this.$router.push('/publications')
    }
  },
}
</script>

<style scoped>

</style>