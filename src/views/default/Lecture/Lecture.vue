<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height: fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-row
                class="mx-6 pa-0"
                justify="space-between"
            >
              <v-col cols="12" md="3" style="height: fit-content">
                <div style="display: flex; justify-content: end">
                  <v-btn icon v-if="isAdmin" @click="goToLectureInput">
                    <v-icon color="grey">mdi-plus</v-icon>
                  </v-btn>
                </div>
                <v-treeview
                    item-key="id"
                    :active.sync="active"
                    :items="items"
                    :load-children="fetchTabData"
                    :open.sync="open"
                    activatable
                    color="warning"
                    open-on-click
                    transition
                    class="subtitle-2"
                    @update:active="resetSearchInput"
                >
                  <template v-slot:prepend="{ item }">
                    <v-icon v-if="!item.children" class="mr-1">
                      mdi-book-open-page-variant
                    </v-icon>
                  </template>
                </v-treeview>
              </v-col>

              <v-divider v-if="!isMobile" vertical class="mb-4 mt-2"></v-divider>

              <v-col cols="12" md="9">
                <v-divider v-if="isMobile" class="mx-4 mb-12"/>
                <v-scroll-y-transition mode="out-in">
                  <v-container fluid class="mt-2 px-0 py-0">
                    <div
                        v-if="!selected"
                        class="ml-4 text-h6 grey--text text--lighten-1 font-weight-light"
                    >
                      Select a Lecture
                    </div>
                    <lecture-card
                        v-if="isDataFetched && !!selected && isAuthDataFetched"
                        :table-contents="tableData"
                        :total-page="totalPage"
                        :total-data-length="totalDataLength"
                        :current-path="path"
                        :is-login="isLogin"
                        :is-admin="isAdmin"
                        @goToInput="goToLectureBoardInput"
                    />
                  </v-container>
                </v-scroll-y-transition>
              </v-col>
            </v-row>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
import LectureCard from "@/components/board/BoardCard";
import _ from 'lodash'
import VueCookies from "vue-cookies";

//const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

export default {
  name: "Lecture",
  components: {MainCard, LectureCard},
  mounted() {
    this.checkAuth()
  },
  data: () => ({
    totalPage: 1,
    totalDataLength: 1,
    header: 'Lecture',
    active: [],
    open: [],
    lectureTabData: [],
    lectureDataRef: [],
    tableData: [],
    isTabDataFetched: false,
    isDataFetched: false,
    isAuthDataFetched: false,
    isLogin: false,
    isAdmin: false,
    path: 'lecture',
  }),
  computed: {
    items () {
      return [
        {
          name: 'Lectures',
          children: this.lectureTabData,
        },
      ]
    },
    selected () {
      if (!this.active.length) return undefined

      const id = this.active[0]

      return this.lectureDataRef.find(data => data.id === id)
    },
    getYear() {
      if (!this.isTabDataFetched) return '';
      return this.selected.year.split('-')[0];
    },
    getSemester() {
      if (!this.isTabDataFetched) return '';
      return this.selected.year.split('-')[1];
    },
    getLecture() {
      if (!this.isTabDataFetched) return '';
      return this.selected.name;
    },
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    },
  },

  watch: {
    selected: 'fetchBoardData',
    '$route': 'fetchBoardData',
  },

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
      if (localStorage.id && VueCookies.get("accessToken")) {
        this.$store.dispatch('user/isAdmin', {id: localStorage.id}).then(
            (isAdmin) => {
              this.isAdmin = isAdmin;
              this.isAuthDataFetched = true;
            },
            (err) => {
              alert(err)
            }
        )
      }
      else {
        this.isAuthDataFetched = true;
      }
    },

    async fetchTabData() {
      //await pause(1500)
      return this.$store.dispatch('lecture/readAllLecture').then(
          (lectures) => {
            this.setLectureTab(lectures)
            this.isTabDataFetched = true;
          },
          (err) => {
            alert(err)
          }
      )
    },
    fetchBoardData() {
      this.isDataFetched = false;
      const currentPage = this.$route.query.page;
      if (!currentPage) {
        this.$router.push({
          path: 'lecture',
          query: {
            page: 1,
            board_list_sort: 'no',
            items_per_page: 10,
          }
        }).catch(err => {
          // Ignore the vuex err regarding  navigating to the page they are already on.
          if (
              err.name !== 'NavigationDuplicated' &&
              !err.message.includes('Avoided redundant navigation to current location')
          ) { throw err }
        });
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
        keyword: keyword,
        year: this.getYear,
        semester: this.getSemester,
        name: this.getLecture
      }

      this.$store.dispatch('lecture/readTotalPage', payload).then(
          (res) => {
            this.totalPage = res.data.data.totalPage
            this.totalDataLength = res.data.data.totalDataLength
            this.$store.dispatch('lecture/readLectureContentsByPage', payload).then(
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
    setLectureTab(lectures) {
      let itemTemp = [];
      lectures.forEach(element => {
        let yearTemp = `${element['year']}-${element['semester']}`;
        itemTemp.push({
          id: yearTemp,
          name: yearTemp,
          children: []
        })
        let lectureTemp = element['name']
        lectureTemp.forEach(lecture => {
          let temp = {
            id: `${yearTemp}&${lecture}`,
            name: lecture,
            year: yearTemp
          }
          itemTemp[itemTemp.length - 1].children.push(temp)
          if (!this.lectureDataRef.includes(temp)) {
            this.lectureDataRef.push(temp)
          }
        })
      })
      this.lectureTabData = itemTemp;
    },
    resetSearchInput(){
      let newRouteQuery = _.omit(this.$route.query, ['keyword', 'page']);
      this.$router.replace( { query: newRouteQuery } ).catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
        ) { throw err }
      });
    },
    goToLectureBoardInput() {
      this.$router.push({
        path: 'lecture/input/board',
        query: {
          year: this.getYear,
          semester: this.getSemester,
          name: this.getLecture
        }
      })
    },
    goToLectureInput() {
      this.$router.push('/lecture/input')
    }
  },
}
</script>

<style scoped>
</style>