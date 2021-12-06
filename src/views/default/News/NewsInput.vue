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
                :is-news="true"
                :is-admin="false"
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
  name: "NewsInput",
  components: { MainCard, BoardInputCard },
  data: () => ({
    header: 'News',
    path: 'news',
    tableData: {},
    isDataFetched: false,
  }),
  mounted() {
    this.checkAccessRight()
  },
  methods: {
    checkAccessRight () {
      if (localStorage.id && VueCookies.get("accessToken")) {
        this.$store.dispatch('user/isAdmin', {id: localStorage.id}).then(
            (isAdmin) => {
              if (isAdmin) {
                // Update 인 경우
                if (this.$route.query.uid) {
                  this.$store.dispatch("news/readNewsContent", this.$route.query.uid).then(
                      (result) => {
                        this.tableData = result.data.data
                        this.isDataFetched = true;
                      },
                      (err) => {
                        alert(err)
                      }
                  )
                }
                // Create 인 경우
                else {
                  this.isDataFetched = true;
                }
              }
              else {
                alert('접근 권한이 없습니다.')
                this.$router.push(`/${this.path}`)
              }
            },
            (err) => {
              alert(err)
              this.$router.push(`/${this.path}`)
            }
        )
      }
      else {
        alert('접근 권한이 없습니다.')
        this.$router.push(`/${this.path}`)
      }
    },
  }
}
</script>

<style scoped>

</style>