<template>
  <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
    <v-col cols="12">
      <pre class="title-font title ma-1 font-weight-black">{{ `${tableContent.importance ? `[공지사항]  ${tableContent.title}` : tableContent.title}` }}</pre>
    </v-col>
    <v-col cols="12" style="background-color: #F5F5F5;">
      <div :style="`display: ${isMobile ? 'block' : 'flex'};`">
        <pre class="caption font-weight-bold mx-6 my-1">작성자 <span class="subtitle-2 content-grey-font pl-3">{{ tableContent.author }}</span></pre>
        <pre class="caption font-weight-bold mx-6 my-1">작성일 <span class="subtitle-2 content-grey-font pl-3">{{ tableContent.created_at }}</span></pre>
        <pre class="caption font-weight-bold mx-6 my-1">조회 <span class="subtitle-2 content-grey-font pl-3">{{ tableContent.view_count }}</span></pre>
      </div>
    </v-col>
    <v-col cols="12" class="pa-6">
      <pre class="subtitle-2 content-grey-font card-content" v-html="tableContent.content" />
    </v-col>
    <v-col cols="12">
      <v-divider class="mb-3" v-if="hasAttach" />
      <div style="display: flex; flex-flow: row wrap;" v-if="hasAttach">
        <div v-for="(attach, index) in tableContent.attach" :key="index" style="height: fit-content;">
          <button
              type="button"
              class="download-button mx-2"
              :onclick="`window.open('http://${attach.link}', '_blank')`"
              formtarget="_blank"
              :title="attach.name"
          >
            <pre class="ellipsis content-grey-font" style="max-width: 200px;">{{ attach.name }}</pre>
          </button>
        </div>
      </div>
    </v-col>
    <v-col cols="12" class="py-6" style="background-color: #F5F5F5;" v-if="isCommentUsed">
      <v-card class="card-flat elevation-0 my-2">
        <p class="content-grey-font font-weight-bold caption ml-3">
          전체
          <span class="ml-2 red--text font-weight-medium caption">{{ commentCount }}</span>
        </p>
        <v-divider class="mx-2"/>
        <v-card-text class="py-0">
          <div v-if="commentCount > 0">
            <div v-for="(comment, index) in tableContent.comments" :key="index">
              <board-comment-card :comment-data="comment"/>
              <v-divider />
            </div>
          </div>
          <div class="mt-4" v-if="isLogin">
            <p class="subtitle-2 font-weight-bold">댓글 쓰기</p>
            <v-textarea
                v-model="newComment"
                outlined
                auto-grow
            />
          </div>
          <div>
            <v-spacer />
            <v-btn
              @click="saveComment"
              class="font-weight-bold elevation-0 button-border-grey"
              outlined
            >
              저장
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" align="end" class="mt-6">
      <v-btn :to="getPath" large class="elevation-0 button-border-grey" style="color: #CCCCCC;" outlined>
         <p class="my-0 font-weight-bold grey--text text--darken-4">목록보기</p>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import BoardCommentCard from "@/components/board/BoardCommentCard";
export default {
  name: "BoardContentCard",
  components: {BoardCommentCard},
  props: {
    tableContent: {
      type: Object,
      default: () => {
        return {
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
        }
      }
    },
    isCommentUsed: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  mounted() {
    this.checkLogin();
    this.commentCount = this.tableContent.comments.length;
    this.hasAttach = this.tableContent.attach.length > 0;
  },
  data: () => ({
    commentCount: 0,
    hasAttach: false,
    isLogin: false,
    newComment: '',
  }),
  computed: {
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    },
    getPath () {
      let pathArr = this.$route.path.split('/');
      return `/${pathArr[pathArr.length - 2]}`;
    }
  },
  methods: {
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
    },
    saveComment() {
      if (this.newComment.length > 0) {
        const params = {
          'id': localStorage.id,
          'idx': this.tableContent.idx,
          'comment': this.newComment
        }
        this.$store.dispatch("board/addComment", params).then(
            () => {
              this.newComment = ''
              this.$router.go(0);
            },
            (err) => {
              this.newComment = ''
              alert(err)
            }
        )
      } else {
        alert('Please input comments')
        this.newComment = ''
      }
    }
  }
}
</script>

<style scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-font {
  font-family: "Roboto", sans-serif;
  color: rgba(1, 1, 1, 0.67);
  white-space: pre-wrap;
}

.content-grey-font {
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  color: rgba(1, 1, 1, 0.75);
}

p {
  display: flex;
  align-items: center;
  white-space: pre-wrap;
}

pre {
  white-space: pre-wrap;
  overflow: hidden;
}

v-divider {
  background-color:rgb(150, 150, 150);
  border-width: 1px !important;
}

.download-button {
  margin: 0 0 5px 0;
  padding: 4px 5px;
  font-size: 12px;
  font-weight: normal;
  line-height: 12px;
  text-align: left;
  border: 1px solid #ededed;
  background: white none;
  border-radius: 2px;
  letter-spacing: normal;
  cursor: pointer;
  vertical-align: middle;
  text-shadow: none;
  box-shadow: none;
}

.card-flat {
  width: 100%;
  height: fit-content;
  background-color: transparent;
}

.button-border-grey {
  border: rgb(150, 150, 150) 0.01em solid;
}

.card-content >>> img {
  max-width: 100% !important;
}

.card-content >>> {
  white-space: pre-wrap;
  overflow: hidden;
}
</style>