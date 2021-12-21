<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <lecture-content-card
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
import LectureContentCard from "@/components/board/BoardContentCard";

export default {
  name: "LectureContent",
  components: { MainCard, LectureContentCard },
  mounted() {
    this.$store.dispatch("lecture/readLectureContent", this.$route.query.uid).then(
        (result) => {
          this.tableData = result.data.data
          this.isDataFetched = true;
        },
        (err) => {
          alert(err)
        }
    )

    this.$store.dispatch("lecture/addViewCount", this.$route.query.uid).then(
        () => {},
        (err) => {
          alert(err)
        }
    )
  },
  data: () => ({
    isDataFetched: false,
    tableData: {},
    path: 'lecture',
    header: 'Lecture',
    table: 'lecture'
  })
}
</script>

<style scoped>

</style>