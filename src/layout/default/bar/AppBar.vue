<template>
  <v-card class="rounded-0" style="color: transparent" height="700" flat>
    <v-app-bar
        app
        flat
        fixed
        :color="isScrolled ? 'rgba(255, 255, 255, 255)' : 'rgba(255, 255, 255, 0)'"
        v-scroll="onScroll"
        height="80px"
    >
      <v-container fluid>
        <v-row
            v-if="!isMobile"
            align="center"
            justify="center"
        >
          <v-col cols="3" align="left">
            <CompanyLogoBtn v-if="!isScrolled" :logo-src="companyWhiteLogo"/>
            <CompanyLogoBtn v-if="isScrolled" :logo-src="companyDefaultLogo"/>
          </v-col>

          <v-col cols="8" align="right">
            <v-btn
                id="no-background-hover"
                v-for="(content, i) in toolbarItems"
                :key="i"
                :class="`elevation-0 title ${isScrolled ? 'indigo--text' : 'white--text'} font-weight-light`"
                active-class="font-weight-bold"
                :ripple="false"
                :to="content.link"
                height="100%"
                text
            >
              {{content.title}}
            </v-btn>
          </v-col>
        </v-row>
        <v-row
            v-if="isMobile"
        >
          <v-app-bar-nav-icon @click="drawer = !drawer"  style="color: white"/>
        </v-row>
      </v-container>
    </v-app-bar>
    <app-bar-sheet-view :header-style="getHeader()" :is-mobile="isMobile"/>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import CompanyLogoBtn from "@/components/CompanyLogoBtn";
import AppBarSheetView from "@/components/AppBarSheetView";

export default {
  name: "DefaultBar",
  components: {
    AppBarSheetView,
    CompanyLogoBtn
  },
  data: () => ({
    isScrolled: false,
  }),
  computed: {
    ...mapState('app', {
      toolbarItems: 'toolbarItems',
      headerStyle: 'headerStyle',
      companyDefaultLogo: 'companyDefaultLogo',
      companyWhiteLogo: 'companyWhiteLogo'
    }),
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    },
    drawer: {
      get () {
        return this.$store.getters['app/getDrawer']
      },
      set (value) {
        return this.$store.commit('app/setDrawer', value)
      }
    }
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.isScrolled = top > 0
    },
    getHeader () {
      switch (this.$route.path.split('/')[1]) {
        case 'about':
          return this.headerStyle.about
        case 'service':
          return this.headerStyle.service
        case 'support':
          return this.headerStyle.support
        default:
          return this.headerStyle.home
      }
    }
  }
}
</script>

<style scoped>
  #no-background-hover::before {
    background-color: transparent !important;
  }
</style>