<template>
  <v-card class="rounded-0" style="color: transparent" height="700" flat>
    <v-app-bar
        app
        flat
        fixed
        :color="isActive ? 'rgba(255, 255, 255, 255)' : 'rgba(255, 255, 255, 0)'"
        style="transition: all 0.6s ease;"
        v-scroll="onScroll"
        height="90px"
    >
      <v-container fluid>
        <v-row
            v-if="!isMobile"
            align="center"
            justify="center"
        >
          <v-col cols="3" align="left">
            <CompanyLogoBtn v-if="!isActive" :logo-src="companyWhiteLogo"/>
            <CompanyLogoBtn v-else :logo-src="companyDefaultLogo"/>
          </v-col>

          <v-col cols="8" align="right">
            <v-menu
              open-on-hover
              bottom
              tile
              offset-y
              v-for="(content, i) in toolbarItems"
              :key="i"
              content-class="elevation-0 tab-content"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    id="no-background-hover"
                    :class="`elevation-0 title ${isActive ? 'black--text' : 'white--text'} font-weight-light`"
                    :active-class="`font-weight-bold ${isActive ? 'tab-selected-content1' : 'tab-selected-content2'}`"
                    :ripple="false"
                    :to="content.link"
                    v-bind="attrs"
                    v-on="on"
                    style="height: 90px;"
                    text
                    tile
                    @mouseenter="setIsHovered(true)"
                    @mouseleave="setIsHovered(false)"
                >
                  {{content.title}}
                </v-btn>
              </template>

              <v-list-item
                v-for="(item, index) in content.items"
                :key="index"
                style="background-color: white;"
                @mouseenter="setIsHovered(true)"
                @mouseleave="setIsHovered(false)"
              >
                <v-btn
                    id="no-background-hover"
                    :class="`elevation-0 title font-weight-light`"
                    active-class="font-weight-bold"
                    :ripple="false"
                    :to="item.link"
                    height="100%"
                    text
                >
                  {{item.title}}
                </v-btn>
              </v-list-item>
            </v-menu>
            <v-btn
                id="no-background-hover"
                :class="`elevation-0 title ${isActive ? 'black--text' : 'white--text'} font-weight-light`"
                :ripple="false"
                @click="onClickLogIn"
                style="width: 100px;"
                text
                tile
                @mouseenter="setIsHovered(true)"
                @mouseleave="setIsHovered(false)"
            >
              <v-divider class="mr-6" vertical :style="`border-width: 1px; background-color: ${isActive ? 'black' : 'white'};`"/>
              {{ loginBtnText }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row
            v-if="isMobile"
            align="center"
            justify="space-between"
        >
          <v-app-bar-nav-icon @click="drawer = !drawer"  :style="`${isActive ? 'color: black' : 'color: white'}`"/>
          <v-btn
              id="no-background-hover"
              :class="`elevation-0 title ${isActive ? 'black--text' : 'white--text'} font-weight-light`"
              :ripple="false"
              @click="onClickLogIn"
              style="border-width: 1px; background-color: transparent; width: 100px;"
              text
              tile
          >
            {{ loginBtnText }}
          </v-btn>
        </v-row>
      </v-container>
    </v-app-bar>
    <app-bar-sheet-view v-if="this.$route.path !== '/'" :header-style="getHeader()" :is-mobile="isMobile"/>
    <app-bar-sheet-particle-view v-else :header-style="getHeader()" :is-mobile="isMobile"/>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import CompanyLogoBtn from "@/components/CompanyLogoBtn";
import AppBarSheetView from "@/components/AppBarSheetView";
import AppBarSheetParticleView from "@/components/AppBarSheetParticleView";
import VueCookies from "vue-cookies";

export default {
  name: "DefaultBar",
  components: {
    AppBarSheetView,
    AppBarSheetParticleView,
    CompanyLogoBtn
  },
  data: () => ({
    isScrolled: false,
    isHovered: false,
    loginBtnText: "LOGIN",
    isLogin: false
  }),
  mounted() {
    this.isLogin = VueCookies.get('accessToken') !== null;
    this.loginBtnText = this.isLogin ? "LOGOUT" : "LOGIN";
  },
  beforeUpdate() {
    this.isLogin = VueCookies.get('accessToken') !== null;
    this.loginBtnText = this.isLogin ? "LOGOUT" : "LOGIN";
  },
  computed: {
    ...mapState('app', {
      toolbarItems: 'toolbarItems',
      headerStyle: 'headerStyle',
      companyDefaultLogo: 'companyDefaultLogo',
      companyWhiteLogo: 'companyWhiteLogo'
    }),
    isActive () {
      return this.isScrolled || this.isHovered;
    },
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
    },
    setIsHovered (flag) {
      this.isHovered = flag
    },
    onClickLogIn(){
      if (this.isLogin) {
        this.isLogin = false;
        this.$store.dispatch("user/logout").then(
            () => {
              if (this.$router.currentRoute.path === '/') {
                this.$router.go(this.$router.currentRoute);
              } else {
                this.$router.push('/')
              }
            }
        );
      }
      else {
        this.$router.push('/authentication/sign-in')
      }
    }
  }
}
</script>

<style scoped>
  #no-background-hover::before {
    background-color: transparent !important;
  }
  .tab-selected-content1 {
    border-bottom-style: solid;
    border-bottom-color: black;
    border-bottom-width: thin;
  }
  .tab-selected-content2 {
    border-bottom-style: solid;
    border-bottom-color: white;
    border-bottom-width: thin;
  }
  .tab-content {
    border-style: solid;
    border-color: #DCDCDC;
    border-width: thin;
  }
</style>