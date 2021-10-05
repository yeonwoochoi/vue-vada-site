<template>
  <v-app>
    <default-bar/>
    <default-drawer/>
    <default-view/>
    <Footer/>
  </v-app>
</template>

<script>
import DefaultBar from './bar/AppBar'
import DefaultDrawer from './drawer/Drawer'
import DefaultView from './View'
import Footer from './footer/Footer'
export default {
  name: "DefaultLayout",
  components: {
    DefaultBar,
    DefaultDrawer,
    DefaultView,
    Footer
  }
}
</script>

<style scoped>

</style>