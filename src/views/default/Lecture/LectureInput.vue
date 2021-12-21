<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <lecture-input-card
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
import LectureInputCard from "@/components/board/BoardInputCard";
import VueCookies from "vue-cookies";

export default {
  name: "LectureInput",
  components: { MainCard, LectureInputCard },
  data: () => ({
    header: 'Lecture',
    path: 'lecture',
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
        table: 'lecture'
      };
      // Update 인 경우
      if (this.$route.query.uid) {
        if (localStorage.id && VueCookies.get("accessToken")) {
          this.$store.dispatch("lecture/checkAuthor", payload).then(
              isAuthor => {
                if(isAuthor) {
                  this.$store.dispatch("user/isAdmin", payload).then(
                      isAdmin => {
                        this.isAdmin = isAdmin
                        this.getLectureContent();
                      },
                      err => {
                        alert(err)
                        this.$router.push('/lecture')
                      }
                  )
                }
                else {
                  alert("접근 권한이 없습니다.")
                  this.$router.push('/lecture')
                }
              },
              err => {
                alert(err)
                this.$router.push('/lecture')
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
    getLectureContent() {
      this.$store.dispatch("lecture/readLectureContent", this.$route.query.uid).then(
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