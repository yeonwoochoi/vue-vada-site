<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <board-content-card
                v-if="isDataFetched && isAuthDataFetched"
                :table-content="tableData"
                :is-comment-used="true"
                :path="path"
                :is-login="isLogin"
                :is-admin="isAdmin"
                :is-author="isAuthor"
                @delete="deleteContent"
                @addComment="addComment"
                @deleteComment="deleteComment"
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
    this.checkAuth();
    this.fetchData();
    this.$store.dispatch("seminar/addViewCount", this.$route.query.uid).then(
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
    path: 'seminar',
    header: 'Seminar',
    table: 'board',
    isLogin: false,
    isAdmin: false,
    isAuthor: false,
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
          (err) => {
            alert(err)
            this.isAuthDataFetched = true;
          }
      )
    },
    checkAdmin() {
      let params = {
        "id" : localStorage.id
      };
      this.$store.dispatch('user/isAdmin', params).then(
          (isAdmin) => {
            this.isAdmin = isAdmin
            this.checkAuthor();
          },
          (err) => {
            alert(err)
            this.isAuthDataFetched = true;
          }
      )
    },
    checkAuthor() {
      const payload = {
        id: localStorage.id,
        idx: this.$route.query.uid,
        table: this.table
      };
      this.$store.dispatch('seminar/checkAuthor', payload).then(
          (isAuthor) => {
            this.isAuthor= isAuthor
            this.isAuthDataFetched = true;
          },
          (err) => {
            alert(err)
            this.isAuthDataFetched = true;
          }
      )
    },
    fetchData() {
      this.$store.dispatch("seminar/readSeminarContent", this.$route.query.uid).then(
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
      this.$store.dispatch("seminar/deleteBoardContent", params).then(
          () => {
            this.$router.push(`/seminar`)
          },
          err => {
            alert(err)
            this.$router.push(`/seminar`)
          }
      )
    },
    addComment(params) {
      this.$store.dispatch("seminar/addComment", params).then(
          () => {
            this.$router.go(0);
          },
          (err) => {
            alert(err)
          }
      )
    },
    deleteComment(params) {
      this.$store.dispatch(`seminar/deleteCommentContent`, params).then(
          () => {
            this.$router.go(0);
          },
          err => {
            this.$router.go(0);
            alert(err)
          }
      )
    }
  }
}
</script>

<style scoped>

</style>