<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <board-card
              v-if="isDataFetched"
              :table-contents="tableData"
              :total-page="totalPage"
              :total-data-length="totalDataLength"
              :current-path="path"
              :admin-input="true"
            />
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
import BoardCard from "@/components/board/BoardCard";

export default {
  name: "News",
  components: {BoardCard, MainCard},
  mounted() {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  data: () => ({
    isDataFetched: false,
    tableData: [],
    totalPage: 1,
    totalDataLength: 1,
    header: 'News',
    path: 'news'
  }),
  methods: {
    fetchData() {
      const currentPage = this.$route.query.page;
      if (!currentPage) {
        this.$router.push({
          path: this.path,
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

      this.$store.dispatch('news/readTotalPage', payload).then(
          (res) => {
            this.totalPage = res.data.data.totalPage
            this.totalDataLength = res.data.data.totalDataLength
            this.$store.dispatch('news/readNewsContentsByPage', payload).then(
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
    }
  }
}
</script>

<style scoped>

</style>