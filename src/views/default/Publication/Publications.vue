<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <div v-if="isDataFetched">
              <div v-for="(data, i) in publicationData" :key="i">
                <publication-card :publication-data="data" :is-admin="isAdmin"/>
              </div>
            </div>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import PublicationCard from "@/components/publications/PublicationCard";
import MainCard from "@/components/MainCard";
export default {
  name: "Publications",
  components: {MainCard, PublicationCard},
  data: () => ({
    header: 'Publication',
    isDataFetched: false,
    publicationData: [],
    isAdmin: false,
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("publications/readAllContents").then(
          data => {
            this.publicationData = data;
            this.checkAuthor();
          },
          err => {
            alert(err);
            this.$router.push('/')
          }
      )
    },
    checkAuthor () {
      let params = {
        "id" : localStorage.id,
      };
      if (!params.id) {
        this.isAdmin = false;
        this.isDataFetched = true;
      }
      else {
        this.$store.dispatch('user/isAdmin', params).then(
            (isAdmin) => {
              this.isAdmin = isAdmin;
              this.isDataFetched = true;
            },
            () => {
              this.isAdmin = false;
              this.isDataFetched = true;
            }
        )
      }
    },
  }
}
</script>

<style scoped>
</style>