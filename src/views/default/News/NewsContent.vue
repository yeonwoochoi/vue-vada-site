<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <board-content-card v-if="isDataFetched" :table-content="tableData" />
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
  name: "NewsContent",
  components: { MainCard, BoardContentCard },
  mounted() {
    this.$store.dispatch("news/readNewsContent", this.$route.query.uid).then(
      (result) => {
        this.tableData = result.data.data
        this.isDataFetched = true;
      },
      (err) => {
        alert(err)
      }
    )

    this.$store.dispatch("news/addViewCount", this.$route.query.uid).then(
      (result) => {
        console.log(result)
      },
      (err) => {
        alert(err)
      }
    )
  },
  data: () => ({
    isDataFetched: false,
    tableData: {},
    header: 'News',
  })
}
</script>

<style scoped>

</style>