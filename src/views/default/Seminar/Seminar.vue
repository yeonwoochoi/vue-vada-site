<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <board-card
              v-if="isDataFetched && isAuthDataFetched"
              :table-contents="tableData"
              :total-page="totalPage"
              :total-data-length="totalDataLength"
              :current-path="path"
              :is-login="isLogin"
              :is-admin="isAdmin"
              :can-admin-input="false"
              @goToInput="goToSeminarInput"
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
  name: "Seminar",
  components: {BoardCard, MainCard},
  mounted() {
    this.checkAuth()
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  data: () => ({
    isDataFetched: false,
    isAuthDataFetched: false,
    tableData: [],
    totalPage: 1,
    totalDataLength: 1,
    header: 'Seminar',
    isLogin: false,
    isAdmin: false,
    path: 'seminar',
  }),
  methods: {
    checkAuth () {
      let params = {
        "id" : localStorage.id
      };
      if (!params.id) {
        this.isAuthDataFetched = true;
        return;
      }
      this.$store.dispatch('user/isLogin', params).then(
          (isLogin) => {
            this.isLogin = isLogin;
            if (isLogin) {
              this.checkAdmin()
            }
            else {
              this.isAuthDataFetched = true;
            }
          },
          (err) => {
            alert(err)
          }
      )
    },
    checkAdmin () {
      // 글쓰기 button 활성화 조건이 isAdmin && isLogin 인데
      // admin이 아닌 user도 글쓰기가 허용되는 경우이므로 isAdmin이 아님에도 그냥 true로 해줌.
      this.isAdmin = true;
      this.isAuthDataFetched = true;
    },
    fetchData() {
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

      this.$store.dispatch('seminar/readTotalPage', payload).then(
          (res) => {
            this.totalPage = res.data.data.totalPage
            this.totalDataLength = res.data.data.totalDataLength
            this.$store.dispatch('seminar/readSeminarContentsByPage', payload).then(
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
    goToSeminarInput() {
      this.$router.push(`seminar/content/input`).catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
        ) { throw err }
      });
    }
  }
}
</script>

<style scoped>

</style>