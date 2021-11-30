<template>
  <v-img style="position: relative;" height="450" :src="require('@/assets/bg_login.jpg')">
    <v-card-text style="height: 100%; position: absolute;">
      <v-container fluid style="height: 100%;">
        <v-row align="center" justify="center" style="height: 100%;">
          <v-col cols="12" align="center" class="mt-4">
            <pre class="font-weight-bold display-2 white--text mt-12 header-anim">{{ headerTitle }}</pre>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-img>
</template>

<script>
import "../../../node_modules/animate.css/animate.css"
export default {
  name: "AppBarSheetView",
  props: ['isMobile'],
  computed: {
    headerTitle() {
      let title = this.$route.name;
      if (this.$route.name.includes("Seminar")) {
        title = "Seminar"
      }
      else if (this.$route.name.includes("Project")) {
        title = "Projects"
      }
      else if (this.$route.name.includes("News")) {
        title = "News"
      }
      return title;
    }
  }
}
</script>

<style scoped>
  .header-anim {
    animation: backInDown;
    animation-duration: 1s;
  }
</style>