<template>
  <v-card class="card-flat elevation-0 my-6">
    <v-card-title class="py-0 pl-0">
      <p class="subtitle-2 font-weight-bold">
        {{ commentData.author }}
        <span class="content-grey-font caption ml-1 mr-2">{{ commentData.created_at }}</span>
        <v-btn x-small icon v-if="isAuthor" @click="deleteComment">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </p>
    </v-card-title>
    <v-card-text class="pa-0">
      {{ commentData.content }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "BoardCommentCard",
  mounted() {
    this.checkCommentAuthor();
  },
  props: {
    commentData: {
      type: Object,
      default: () => {
        return {
          'idx': -1,
          'author': 'user21',
          'content': 'comment',
          'created_at': '2021-01-01',
        }
      }
    },
    isAdmin: {
      type: Boolean,
      default: () => {return false}
    },
    path: {
      type: String,
      default: () => {return ''}
    }
  },
  data: () => ({
    isAuthor: false,
  }),
  methods: {
    deleteComment() {
      if (this.isAuthor) {
        // 댓글 삭제하는 함수
        let params = {
          "idx" : this.commentData['idx'],
        };
        this.$emit('deleteComment', params)
      }
      else {
        this.$router.go(0);
      }
    },
    checkCommentAuthor() {
      let params = {
        "id" : localStorage.id,
        "idx" : this.commentData['idx'],
      };
      if (!this.isAdmin) {
        this.$store.dispatch(`${this.path}/checkCommentAuthor`, params).then(
            (isAuthor) => {
              this.isAuthor = isAuthor
            },
            () => {
              this.isAuthor = false
            }
        )
      }
      else {
        this.isAuthor = this.isAdmin;
      }
    }
  }
}
</script>

<style scoped>
.card-flat {
  width: 100%;
  height: fit-content;
  background-color: transparent;
}

.content-grey-font {
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  color: rgba(1, 1, 1, 0.55);
  white-space: pre-wrap;
}

</style>