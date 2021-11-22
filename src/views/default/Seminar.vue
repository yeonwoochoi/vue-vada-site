<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <board-card-new v-if="isDataFetched" :table-contents="tableData" :total-page="totalPage"/>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
import BoardCardNew from "@/components/board/BoardCardNew";

export default {
  name: "Seminar",
  components: {BoardCardNew, MainCard},
  created() {
    const currentPage = this.$route.query.page;
    if (!currentPage) {
      this.$router.push({
        path: 'seminar',
        query: {
          page: 1,
          board_list_sort: 'no',
          items_per_page: 10
        }
      })
      return;
    }

    let itemsPerPage = this.$route.query.items_per_page;
    let sortBy = this.$route.query.board_list_sort;
    let keyword = this.$route.query.keyword;
    let target = this.$route.query.target;

    if (!itemsPerPage) itemsPerPage = 10;
    if (!sortBy) sortBy = 'no';
    if (!target) target = null;
    if (!keyword) keyword = null;

    const payload = {
      currentPage: currentPage,
      orderBy: sortBy,
      itemPerPage: itemsPerPage,
      searchBy: target,
      keyword: keyword
    }

    this.$store.dispatch('board/readTotalPage', payload).then(
        (res) => {
          this.totalPage = res.data.data.totalPage
          this.$store.dispatch('board/readSeminarContentsByPage', payload).then(
              (contents) => {
                this.tableData = contents.data.data
                this.isDataFetched = true;
              },
              (err) => {
                alert(err)
              }
          )
        },
        (err) => {
          alert(err)
        }
    )
  },
  data: () => ({
    isDataFetched: false,
    tableData: [],
    totalPage: 1,
    header: 'Seminar',
  }),
}
</script>

<style scoped>

</style>