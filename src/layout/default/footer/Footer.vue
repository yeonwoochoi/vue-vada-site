<template>
  <v-footer
      app
      absolute
      padless
      color="#001229"
      :height="isMobile ? 180 : 280"
  >
    <Mobile v-if="isMobile" />
    <Pc v-if="!isMobile" />
  </v-footer>
</template>

<script>
import Mobile from "./Mobile";
import Pc from "./Default";
export default {
  name: "DefaultFooter",
  components:{
    Mobile, Pc
  },
  computed: {
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    }
  }
}
</script>

<style scoped>

</style>