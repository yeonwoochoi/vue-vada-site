<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <board-content-card
              v-if="isDataFetched && isAuthDataFetched"
              :table-content="tableData"
              :path="path"
              :is-login="isLogin"
              :is-admin="isAdmin"
              :is-author="isAdmin"
              @delete="deleteContent"
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
  name: "NewsContent",
  components: { MainCard, BoardContentCard },
  mounted() {
    this.checkAuth();
    this.fetchData();

    this.$store.dispatch("news/addViewCount", this.$route.query.uid).then(
      () => {},
      (err) => {
        alert(err)
      }
    )
  },
  data: () => ({
    isDataFetched: false,
    isAuthDataFetched: false,
    tableData: {},
    header: 'News',
    path: 'news',
    table: 'news',
    isLogin: false,
    isAdmin: false,
  }),
  methods: {
    checkAuth () {
      let params = {
        "id" : localStorage.id
      };
      if (!params.id) {
        this.isLogin = false;
        return;
      }
      this.$store.dispatch('user/isLogin', params).then(
          (isLogin) => {
            this.isLogin = isLogin;
            if (isLogin) {
              this.checkAdmin();
            } else {
              this.isAuthDataFetched = true;
            }
          },
          () => { }
      )
    },
    checkAdmin() {
      let params = {
        "id" : localStorage.id
      };
      this.$store.dispatch('user/isAdmin', params).then(
          (isAdmin) => {
            this.isAdmin = isAdmin
            this.isAuthDataFetched = true;
          },
          () => { }
      )
    },
    fetchData() {
      this.$store.dispatch("news/readNewsContent", this.$route.query.uid).then(
          (result) => {
            this.tableData = result.data.data
            this.isDataFetched = true;
          },
          (err) => {
            alert(err)
          }
      )
    },
    deleteContent(params) {
      params['table'] = this.table;
      this.$store.dispatch("news/deleteNewsContent", params).then(
          () => {
            this.$router.push(`/news`)
          },
          err => {
            alert(err)
            this.$router.push(`/news`)
          }
      )
    },
  }
}
</script>

<style scoped>

</style>