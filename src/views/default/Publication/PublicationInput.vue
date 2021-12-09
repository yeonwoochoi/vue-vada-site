<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <publication-input-card v-if="isDataFetched" :publication-data="publicationData"/>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import PublicationInputCard from "@/components/publications/PublicationInputCard";
import MainCard from "@/components/MainCard";

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
    let params = this.$route.query.uid;
    if (params) {
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
      this.$router.push("/publications")
    }
  },
}
</script>

<style scoped>

</style>