<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <board-input-card />
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
import BoardInputCard from "@/components/board/BoardInputCard";
export default {
  name: "SeminarInput",
  components: { MainCard, BoardInputCard },
  data: () => ({
    header: 'Seminar',
  }),
}
</script>

<style scoped>

</style>