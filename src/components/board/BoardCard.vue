<template>
  <v-row align="center" justify="center" class="mb-6 pl-6" style="width: 100%;">
    <v-col cols="6" align="start" class="py-0 pl-4">
      <p class="subtitle-2 my-0">전체 {{ totalDataLength }}</p>
    </v-col>
    <v-col cols="6" align="end" class="py-0">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              small
              outlined
              v-bind="attrs"
              v-on="on"
              class="elevation-0"
              style="max-width: 110px; max-height: 30px; border: rgb(200, 200, 200) 0.01em solid; background-color: transparent"
          >
            {{ currentSortBy }}
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
              v-for="(item, index) in sortableItems"
              :key="index"
              @click="changeSortBy(item)"
          >
            <v-list-item-title class="caption">{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
    <v-col cols="12" class="py-0s">
      <v-data-table
          :headers="headers"
          :items="tableContents"
          :items-per-page="itemsPerPage"
          hide-default-footer
          :mobile-breakpoint="960"
      >
        <template v-slot:item="{ item }">
          <tr v-if="!isMobile" :style="`background-color: ${item.importance ? 'rgb(230, 230, 230)' : 'transparent'};`">
            <td class="text-center content-grey-font table-row" style="min-width: 80px; max-width: 80px;">
              {{ `${item.importance ? '공지사항' : item.no }` }}
            </td>
            <td class="text-start ellipsis" @click="onClickContent(item.no)" style="cursor: pointer; max-width: 400px; height: 38px; font-size: 13px;">
              <div class="ellipsis font-weight-medium">
                {{ item.title }}
                <span v-if="item.comments.length > 0" class="blue--text ml-1">{{ `(${item.comments.length})` }}</span>
              </div>
            </td>
            <td class="text-center table-row" style="min-width: 80px; max-width: 80px; height: 38px; font-size: 13px;">
              <p class="my-0 ellipsis content-grey-font" style="white-space: nowrap;">{{ item.author }}</p>
            </td>
            <td class="text-center content-grey-font table-row" style="min-width: 80px; max-width: 80px; height: 38px; font-size: 13px;">
              {{ item.created_at }}
            </td>
            <td class="text-center content-grey-font table-row" style="min-width: 10px; max-width: 10px; height: 38px; font-size: 13px;">
              {{ item.view_count }}
            </td>
          </tr>
          <tr v-else :style="`background-color: ${item.importance ? 'rgb(230, 230, 230)' : 'transparent'};`">
            <div class="pa-4" @click="onClickContent(item.no)" style="cursor:pointer;">
              <p class="font-weight-bold subtitle-1" style="width: 100%">
                {{ item.title }}
                <span v-if="item.comments.length > 0" class="blue--text pl-1">{{ `(${item.comments.length})` }}</span>
              </p>
              <div style="display: flex; height: fit-content; overflow-x: hidden; text-overflow: ellipsis" class="content-grey-font caption">
                <p class="my-0 mr-2 ellipsis" style="white-space: nowrap; max-width: 130px;">{{ item.author }}</p>
                <p class="my-0 mr-2"><v-divider vertical/></p>
                <p class="my-0 mr-2" style="white-space: nowrap">{{ item.created_at }}</p>
                <p class="my-0 mr-2"><v-divider vertical/></p>
                <p class="my-0 mr-2" style="white-space: nowrap">{{ item.view_count }}</p>
              </div>
            </div>
            <v-divider/>
          </tr>
        </template>
        <template v-slot:footer>
          <div style="display: flex; align-items: center; justify-content: space-between" class="pt-6">
            <v-spacer/>
            <v-pagination
                v-model="currentPage"
                :length="totalPage"
                total-visible="10"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                @input="changePage"
            />
            <v-spacer/>
            <v-btn
                color="rgb(40, 40, 40)"
                dark
                v-if="hasInputControl"
                @click="goToBoardInput"
            >
              글쓰기
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="12" sm="10" md="8" xl="6" class="mt-4 mb-12">
      <div style="display: flex; justify-content: center; height: 30px;">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                small
                v-bind="attrs"
                v-on="on"
                class="elevation-0 mr-4 mt-1 text-start"
                style="min-width: 80px; height: 100%; border: rgb(200, 200, 200) 0.05em solid; background-color: transparent"
            >
              {{ searchBy }}
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
                v-for="(item, index) in searchableItems"
                :key="index"
                @click="changeSearchBy(item)"
            >
              <v-list-item-title class="caption">{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-text-field
            v-model="searchInput"
            label="Search"
            single-line
            hide-details
            clearable
            class="pt-0 mt-0"
        >
        </v-text-field>
        <v-btn
            class="elevation-0 ml-3 button-border-grey"
            style="background-color: #F5F5F5"
            outlined
            @click="onClickSearchBtn"
        >
          검색
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "BoardCard",
  props: {
    tableContents: {
      type: Array,
      default: () => {
        return []
      }
    },
    totalPage: {
      type: Number,
      default: () => {
        return 1
      }
    },
    totalDataLength: {
      type: Number,
      default: () => {
        return 0
      }
    },
    currentPath: {
      type: String,
      default: () => {
        return 'seminar'
      }
    },
    isLogin: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isAdmin: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    canAdminInput: {
      type: Boolean,
      default: () => {
        return true
      }
    },
  },
  data: () => ({
    search: '',
    searchInput: '',
    sortBy: 'no',
    searchBy: '전체',
    sortDesc: true,
    currentPage: 1,
    itemsPerPage: 10,
    headers: [
      {
        text: 'No',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'no',
      },
      {
        text: 'Title',
        align: 'start',
        sortable: false,
        filterable: false,
        value: 'title',
      },
      {
        text: 'Content',
        align: ' d-none',
        sortable: false,
        filterable: true,
        value: 'content',
      },
      {
        text: 'Writer',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'author',
      },
      {
        text: 'Date',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'created_at',
      },
      {
        text: 'Views',
        align: 'center',
        sortable: false,
        filterable: false,
        value: 'view_count',
      },
    ],
    sortableItems: [],
    sortableItemsRef: [
      {
        view: '최신순',
        value: 'no'
      },
      {
        view: '업데이트순',
        value: 'created_at'
      },
      {
        view: '조회순',
        value: 'view_count'
      },
    ],
    searchableItems: [],
    searchableItemsRef: [
      {
        view: '제목',
        value: 'title'
      },
      {
        view: '내용',
        value: 'content'
      },
      {
        view: '작성자',
        value: 'author'
      },
    ],
    path: '',
  }),
  mounted() {
    this.setSortableItems();
    this.setSearchableItems();
    this.init();
  },
  computed: {
    currentSortBy() {
      return this.sortableItemsRef.find(v => v.value === this.sortBy).view;
    },
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    },
    hasInputControl() {
      if (this.canAdminInput) {
        return this.isAdmin && this.isLogin
      }
      else {
        return this.isLogin
      }
    }
  },
  methods: {
    init() {
      this.currentPage = parseInt(this.$route.query.page)
      this.sortBy = this.$route.query.board_list_sort
      this.itemsPerPage = parseInt(this.$route.query.items_per_page)

      if (this.$route.query.keyword) {
        this.search = this.$route.query.keyword
        let searchBy = this.$route.query.target;
        if (searchBy === 'total') {
          this.searchBy = '전체'
        } else {
          this.searchBy = this.searchableItemsRef.find(v => v.view === this.searchBy).value;
        }
        this.searchInput = this.search
      } else {
        this.search = '';
        this.searchInput = this.search;
        this.searchBy = '전체';
      }
    },

    changePage(){
      let searchBy = this.searchBy === '전체' ? 'total' : this.searchableItemsRef.find(v => v.view === this.searchBy).value
      this.$router.push({
        path: this.currentPath,
        query: {
          page: this.currentPage,
          board_list_sort: this.sortBy,
          items_per_page: this.itemsPerPage,
          keyword: this.search,
          target: searchBy
        }
      }).catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
        ) { throw err }
      });
    },

    changeSortBy (sortBy) {
      let targetVal = this.sortableItemsRef.find(v => v.view === sortBy).value
      let target = this.headers.find(h => h.value === targetVal);

      if (!target) {
        this.sortBy = 'no'
      }
      else {
        this.sortBy = targetVal
      }

      this.$router.push({
        path: this.currentPath,
        query: {
          page: 1,
          board_list_sort: this.sortBy,
          items_per_page: this.itemsPerPage
        }
      }).catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
        ) { throw err }
      });
    },

    // sort by 눌렀을 때 (v-menu)
    changeSearchBy(searchBy) {
      this.searchBy = searchBy;
    },

    // 검색 범위 v-menu 눌렀을때
    onClickContent(no){
      let content_id = this.tableContents.find(v => v.no === no).idx;
      this.$router.push({
        path: `${this.currentPath}/content`,
        query: {
          uid: content_id
        }
      }).catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
        ) { throw err }
      });
    },

    // board content 클릭시
    onClickSearchBtn () {
      this.search = this.searchInput
      let searchBy = this.searchBy === '전체' ? 'total' : this.searchableItemsRef.find(v => v.view === this.searchBy).value
      this.currentPage = 1;
      this.$router.push({
        path: this.currentPath,
        query: {
          page: this.currentPage,
          board_list_sort: this.sortBy,
          items_per_page: this.itemsPerPage,
          keyword: this.search,
          target: searchBy
        }
      }).catch(err => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
        ) { throw err }
      });
    },

    // v-menu 에서 sortBy 되는 Header만 추려서 v-menu list에 등록하는 과정
    // 최신순 (no) 업데이트순 (created_at) 조회순 (view_count)
    // 초기 설정
    setSortableItems () {
      let result = [];
      if (this.headers) {
        for (let i = 0; i < this.headers.length; i++) {
          let sortableItem = this.sortableItemsRef.find(v => v.value === this.headers[i].value);
          if (sortableItem) {
            result.push(sortableItem.view);
          }
        }
      }
      this.sortableItems = result;
    },

    // 검색 범위 설정할 때, 검색 가능한 Header만 추려서 설정
    // 초기 설정
    setSearchableItems () {
      let result = [];
      result.push('전체')
      for (let i = 0; i < this.searchableItemsRef.length; i++) {
        result.push(this.searchableItemsRef[i].view)
      }
      this.searchableItems = result;
      this.searchBy = this.searchableItems[0];
    },

    goToBoardInput() {
      this.$emit('goToInput')
    },
  },
}
</script>

<style scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content-grey-font {
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  color: rgba(1, 1, 1, 0.55);
  white-space: pre-wrap;
}

.table-row {
  height: 38px;
  font-size: 13px;
}

.button-border-grey {
  border: rgb(150, 150, 150) 0.01em solid;
}
</style>