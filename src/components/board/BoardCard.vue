<template>
  <v-row align="center" justify="center" class="mb-6 mx-4" style="width: 100%;">
    <v-col cols="6" align="start" class="py-0 my-0">
      <p class="subtitle-2">전체 {{ contentLength }}</p>
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
    <v-col cols="12">
      <v-data-table
          :headers="headers"
          :items="pseudoTableData"
          :search="search"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :page.sync="currentPage"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
      >
        <template v-slot:item="{ item }">
          <tr :style="`background-color: ${item.importance ? 'rgb(230, 230, 230)' : 'transparent'};`">
            <td :class="`text-center ${isMobile ? 'ellipsis' : ''}`" style="min-width: 80px; max-width: 80px; height: 38px; font-size: 11px;">
              {{ `${item.importance ? '공지사항' : item.no }` }}
            </td>
            <td class="text-start ellipsis" @click="onClickContent" :style="`cursor: pointer; ${isMobile ? 'max-width: 90px' : 'max-width: 400px' }; height: 38px; font-size: 11px;`">
              <div class="ellipsis">
                {{ item.title }}
                <span v-if="item.comments.length > 0" class="blue--text">{{ ` (${item.comments.length})` }}</span>
              </div>
            </td>
            <td class="text-center ellipsis" style="min-width: 80px; max-width: 80px; height: 38px; font-size: 11px;">
              {{ item.author }}
            </td>
            <td :class="`text-center ${isMobile ? 'ellipsis' : ''}`" style="min-width: 80px; max-width: 80px; height: 38px; font-size: 11px;">
              {{ `${item.importance ? getRealTableData(item).created_at : item.created_at}` }}
            </td>
            <td :class="`text-center ${isMobile ? 'ellipsis' : ''}`" style="min-width: 10px; max-width: 10px; height: 38px; font-size: 11px;">
              {{ `${item.importance ? getRealTableData(item).view_count : item.view_count}` }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="2"/>
    <v-col cols="7" sm="8" class="py-0">
      <v-pagination
          v-model="currentPage"
          :length="pageCount"
          total-visible="10"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
      />
    </v-col>
    <v-col cols="2" align="end">
      <v-btn
          color="rgb(40, 40, 40)"
          dark
          v-if="isLogin"
      >
        글쓰기
      </v-btn>
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
            color="rgb(238, 238, 238)"
            class="elevation-0 ml-3"
            @click="onClickSearchBtn"
        >
          {{'검색'}}
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
        return [
          {
            no: 1,
            title: 'Title',
            content: 'Content',
            author: 'user01',
            created_at: '2020-11-11',
            view_count: 0,
            comments: [
              {
                'author': 'user21',
                'content': 'Comment',
                'created_at': '2021-11-01',
              },
            ],
            attach: '',
            importance: false
          },
        ]
      }
    }
  },
  data: () => ({
    search: '',
    searchInput: '',
    sortBy: 'no',
    searchBy: '전체',
    sortDesc: true,
    currentPage: 1,
    pageCount: 0,
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
    tableData: [],
    pseudoTableData: [],
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
    isLogin: false,
    contentLength: 0
  }),
  mounted() {
    this.tableData = this.tableContents;
    this.setIndex();
    this.checkLogin();
    this.setSortableItems();
    this.setSearchableItems();
    this.setPseudoTableData();
    this.contentLength = this.tableData.length
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
  },

  methods: {
    onClickSearchBtn () {
      this.search = this.searchInput
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
    },

    changeSearchBy(searchBy) {
      this.searchBy = searchBy;
      for (let i = 0; i < this.headers.length; i++) {
        this.headers[i].filterable = false;
      }
      let targets = [];
      if (searchBy === '전체') {
        for (let i = 0; i < this.searchableItemsRef.length; i++) {
          targets.push(this.searchableItemsRef[i].value)
        }
      } else {
        targets.push(this.searchableItemsRef.find(v => v.view === searchBy).value);
      }
      for (let i = 0; i < this.headers.length; i++) {
        for (let j = 0; j < targets.length; j++) {
          if (this.headers[i].value === targets[j]) {
            this.headers[i].filterable = true;
          }
        }
      }
    },

    setNoticeItemsSort(){
      this.tableData.sort((a,b) => b.importance - a.importance)
    },

    onClickContent(){
      this.$router.push('/')
    },

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

    setSearchableItems () {
      let result = [];
      result.push('전체')
      for (let i = 0; i < this.searchableItemsRef.length; i++) {
        result.push(this.searchableItemsRef[i].view)
      }
      this.searchableItems = result;
      this.searchBy = this.searchableItems[0];
    },

    setPseudoTableData () {
      let result = JSON.parse(JSON.stringify(this.tableData));
      for (let i = 0; i < result.length; i++) {
        if (result[i].importance) {
          result[i].no = 1000000000;
          result[i].created_at = '3000-01-01';
          result[i].view_count = 100000000;
        }
      }
      this.pseudoTableData = result;
    },

    setIndex() {
      let result = JSON.parse(JSON.stringify(this.tableData));
      for (let i = 0; i < result.length; i++) {
        result[i].index = i;
      }
      this.tableData = result;
    },

    getRealTableData (target) {
      return this.tableData.find(v => v.index === target.index);
    },

    checkLogin () {
      let params = {
        "id" : localStorage.id
      };
      if (!params.id) {
        this.isLogin = false;
        return;
      }
      this.$store.dispatch('user/requestRefreshToken', params).then(
          () => {
            this.isLogin = true;
          },
          () => {
            this.isLogin = false;
          }
      )
    }
  },
}
</script>

<style scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>