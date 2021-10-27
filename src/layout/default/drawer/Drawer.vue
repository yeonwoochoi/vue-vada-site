<template>
  <v-navigation-drawer
    v-if="isMobile"
    v-model="drawer"
    v-bind="$attrs"
    dark
    :src="require('@/assets/bg_sidebar.png')"
    app
  >
    <template
      #img="props"
    >
      <v-img
        gradient="rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
        v-bind="props"
      />
    </template>

    <drawer-header />

    <v-divider/>

    <drawer-list :items="items" />

    <!--
    <template #append>
      <div class="pa-4 text-center">
        <v-btn
          block
          class="font-weight-black"
          color="red"
          rounded
          large
          target="_blank"
          to="/"
          >
          {{ company }}
        </v-btn>
      </div>
    </template>
    -->
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import DrawerHeader from './Header/DrawerHeader'
import DrawerList from './Content/DrawerList'

export default {
  name: "DefaultDrawer",
  components: {
    DrawerHeader,
    DrawerList
  },
  computed: {
    ...mapState('app', {
      items: 'drawerItems',
      company: 'company'
    }),
    drawer: {
      get () {
        return this.$store.getters['app/getDrawer']
      },
      set (value) {
        return this.$store.commit('app/setDrawer', value)
      }
    },
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