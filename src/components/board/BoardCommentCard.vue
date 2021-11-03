<template>
  <v-card class="card-flat elevation-0 my-6">
    <v-card-title class="py-0 pl-0">
      <p class="subtitle-2 font-weight-bold">
        {{ commentData.author }}
        <span class="content-grey-font caption ml-1">{{ commentData.created_at }}</span>
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
  props: {
    commentData: {
      type: Object,
      default: () => {
        return {
          'author': 'user21',
          'content': 'comment',
          'created_at': '2021-01-01',
        }
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