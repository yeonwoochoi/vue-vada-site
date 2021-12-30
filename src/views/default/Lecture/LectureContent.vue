<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <lecture-content-card
                v-if="isDataFetched && isAuthDataFetched"
                :table-content="tableData"
                :is-comment-used="true"
                :path="path"
                :is-login="isLogin"
                :is-admin="isAdmin"
                :is-author="isAdmin"
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
import LectureContentCard from "@/components/board/BoardContentCard";

export default {
  name: "LectureContent",
  components: { MainCard, LectureContentCard },
  mounted() {
    this.checkAuth();
    this.fetchData();
    this.$store.dispatch("lecture/addViewCount", this.$route.query.uid).then(
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
    path: 'lecture',
    header: 'Lecture',
    table: 'lecture',
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
      this.$store.dispatch("lecture/readLectureContent", this.$route.query.uid).then(
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
      this.$store.dispatch("lecture/deleteLectureBoardContent", params).then(
          () => {
            this.$router.push(`/lecture`)
          },
          err => {
            alert(err)
            this.$router.push(`/lecture`)
          }
      )
    },
    addComment(params) {
      this.$store.dispatch("lecture/addComment", params).then(
          () => {
            this.$router.go(0);
          },
          (err) => {
            alert(err)
          }
      )
    },
    deleteComment(params) {
      this.$store.dispatch(`lecture/deleteCommentContent`, params).then(
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