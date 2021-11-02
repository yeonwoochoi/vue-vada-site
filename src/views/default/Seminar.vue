<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <board-card :table-contents="tableData" />
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
  data: () => ({
    tableData: [
      {
        no: 1,
        title: 'Welcome to kunsan univWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univ',
        content: 'To check',
        author: 'user01',
        created_at: '2020-11-11',
        view_count: 5,
        comments: [
          {
            'author': 'user21',
            'content': 'Comment! Comment! Comment! Comment! Comment! ',
            'created_at': '2021-11-01',
          },
          {
            'author': 'user21',
            'content': 'Comment! Comment! Comment! Comment! Comment! ',
            'created_at': '2021-11-01',
          },
        ],
        attach: '',
        importance: false
      },
      {
        no: 2,
        title: 'Welcome to kunsan univ',
        content: 'Content~~~ Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah',
        author: 'user02',
        created_at: '2021-10-31',
        view_count: 4,
        comments: [
          {
            'author': 'user21',
            'content': 'Comment! Comment! Comment! Comment! Comment! ',
            'created_at': '2021-11-01',
          },
          {
            'author': 'user21',
            'content': 'Comment! Comment! Comment! Comment! Comment! ',
            'created_at': '2021-11-01',
          },
        ],
        attach: '',
        importance: false
      },
      {
        no: 3,
        title: 'Welcome to kunsan univ',
        content: 'Content~~~ Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah',
        author: 'David Robert Joseph Beckham',
        created_at: '2020-11-11',
        view_count: 7,
        comments: [],
        attach: '',
        importance: false
      },
      {
        no: 4,
        title: 'Welcome to kunWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univsan univ',
        content: 'Content~~~ Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah',
        author: 'user04',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: '',
        importance: false
      },
      {
        no: 5,
        title: 'Welcome to kunsan unWelcome to kunsan univWelcome to kunsan univWelcome to kunsan univiv',
        content: 'Content~~~ Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah',
        author: 'user05',
        created_at: '2020-04-11',
        view_count: 10,
        comments: [],
        attach: '',
        importance: false
      },
      {
        no: 6,
        title: 'Welcome to korea univ',
        content: 'to check6',
        author: 'user01',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: '',
        importance: false
      },
      {
        no: 7,
        title: 'Welcome to kunsan univ',
        content: 'to check7',
        author: 'user01',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: '',
        importance: true
      },
      {
        no: 8,
        title: 'Welcome to kunsan univ',
        content: 'to check8',
        author: 'user01',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: '',
        importance: false
      },
      {
        no: 9,
        title: 'Welcome to kunsan univ',
        content: 'to check9',
        author: 'user01',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: '',
        importance: false
      },
      {
        no: 10,
        title: 'Welcome to kunsan univ',
        content: 'to check10',
        author: 'user01',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: '',
        importance: true
      },
      {
        no: 11,
        title: 'Welcome to kunsan univ',
        content: 'to check11',
        author: 'user01',
        created_at: '2021-10-31',
        view_count: 0,
        comments: [],
        attach: '',
        importance: false
      },
    ],
    header: 'Seminar',
  }),
  methods: {

  }
}
</script>

<style scoped>

</style>