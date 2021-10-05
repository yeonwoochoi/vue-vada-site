<template>
  <v-main>
    <v-container
        fluid
        class="overflow-y-auto"
    >
      <router-view/>
    </v-container>
    <v-btn
        v-show="isScrolled"
        v-scroll="onScroll"
        fab
        dark
        fixed
        bottom
        right
        @click="goTop"
    >
      <v-icon>mdi-menu-up</v-icon>
    </v-btn>
  </v-main>
</template>

<script>
export default {
  name: "DefaultView",
  data: () => ({
    isScrolled: false
  }),
  methods: {
    onScroll(e){
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.isScrolled = top > 20
    },
    goTop(){
      this.$vuetify.goTo(0);
    }
  }
}
</script>

<style scoped>

</style>