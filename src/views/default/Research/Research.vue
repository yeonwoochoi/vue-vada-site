<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <research-card :research-data="getResearchData"/>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ResearchCard from "@/components/research/ResearchCard";
import MainCard from "@/components/MainCard";
export default {
  name: "Research",
  components: {MainCard, ResearchCard},
  data: () => ({
    header: 'Research Topics',
  }),
  computed: {
    ...mapGetters({
      getResearchData: 'research/getResearchData'
    })
  }
}
</script>

<style scoped>
</style>