<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <board-input-card
                v-if="isDataFetched"
                :table-content="tableData"
                :path="path"
                :is-admin="isAdmin"
            />
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
import BoardInputCard from "@/components/board/BoardInputCard";
import VueCookies from "vue-cookies";

export default {
  name: "SeminarInput",
  components: { MainCard, BoardInputCard },
  data: () => ({
    header: 'Seminar',
    path: 'seminar',
    tableData: {},
    isDataFetched: false,
    isAdmin: false,
  }),
  mounted() {
    this.checkAccessRight()
  },
  methods: {
    checkAccessRight () {
      const payload = {
        id: localStorage.id,
        idx: this.$route.query.uid,
        table: 'board'
      };
      // Update 인 경우
      if (this.$route.query.uid) {
        if (localStorage.id && VueCookies.get("accessToken")) {
          this.$store.dispatch("board/checkAuthor", payload).then(
              isAuthor => {
                if(isAuthor) {
                  this.$store.dispatch("user/isAdmin", payload).then(
                      isAdmin => {
                        this.isAdmin = isAdmin
                        this.getSeminarContent();
                      },
                      err => {
                        alert(err)
                        this.$router.push('/seminar')
                      }
                  )
                }
                else {
                  alert("접근 권한이 없습니다.")
                  this.$router.push('/seminar')
                }
              },
              err => {
                alert(err)
                this.$router.push('/seminar')
              }
          )
        }
        else {
          alert('접근 권한이 없습니다.')
          this.$router.push(`/${this.path}`)
        }
      }
      // Create 인 경우
      else {
        this.isDataFetched = true;
      }
    },
    getSeminarContent() {
      this.$store.dispatch("board/readSeminarContent", this.$route.query.uid).then(
          (result) => {
            this.tableData = result.data.data
            this.isDataFetched = true;
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