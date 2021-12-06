<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <board-content-card
                v-if="isDataFetched"
                :table-content="tableData"
                :is-comment-used="true"
                :path="path"
                :targetTable="table"
            />
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
import BoardContentCard from "@/components/board/BoardContentCard";

export default {
  name: "SeminarContent",
  components: { MainCard, BoardContentCard },
  mounted() {
    this.$store.dispatch("board/readSeminarContent", this.$route.query.uid).then(
      (result) => {
        this.tableData = result.data.data
        this.isDataFetched = true;
      },
      (err) => {
        alert(err)
      }
    )

    this.$store.dispatch("board/addViewCount", this.$route.query.uid).then(
      () => {},
      (err) => {
        alert(err)
      }
    )
  },
  data: () => ({
    isDataFetched: false,
    tableData: {},
    path: 'seminar',
    header: 'Seminar',
    table: 'board'
  })
}
</script>

<style scoped>

</style>