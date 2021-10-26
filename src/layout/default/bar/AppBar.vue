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
        @mouseenter="setIsHovered(true)"
        @mouseleave="setIsHovered(false)"
    >
      <v-container fluid>
        <v-row
            v-if="!isMobile"
            align="center"
            justify="center"
        >
          <v-col cols="4" align="left" style="display: flex; justify-content: right; align-items: center; cursor:pointer;" @click="goToMain">
            <CompanyLogoBtn v-if="!isActive" :logo-src="companyWhiteLogo" :logo-height="70" :is-white="true" class="mr-3"/>
            <CompanyLogoBtn v-else :logo-src="companyDefaultLogo" :logo-height="70" :is-white="false" class="mr-3"/>
            <div :class="!isActive ? 'white--text' : 'black--text'" class="display-1 font-weight-bold pa-0 ma-0" style="height: 100%">
              AI-LAB
              <p class="body-2 font-weight-bold pa-0 ma-0">
                Artificial Intelligence Laboratory
              </p>
            </div>
          </v-col>

          <v-col cols="8" align="center" style="width: fit-content;">
            <v-menu
              open-on-hover
              bottom
              tile
              offset-y
              v-for="(content, i) in toolbarItems"
              :key="i"
              content-class="elevation-0"
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    id="no-background-hover"
                    :class="`elevation-0 subtitle-2 ${isActive ? 'black--text' : 'white--text'} font-weight-medium menu-button left`"
                    :active-class="`font-weight-bold menu-button ${isActive ? 'active-black' : 'active-white'}`"
                    :ripple="false"
                    :href="content.link"
                    v-bind="attrs"
                    v-on="on"
                    style="height: 90px;"
                    text
                    tile
                >
                  {{ content.title }}
                </v-btn>
              </template>

              <v-list-item
                v-for="(item, index) in content.items"
                :key="index"
                style="background-color: white;"
              >
                <v-btn
                    id="no-background-hover"
                    :class="`elevation-0 subtitle-2 font-weight-medium`"
                    active-class="font-weight-bold"
                    :ripple="false"
                    :href="item.link"
                    height="100%"
                    text
                >
                  {{item.title}}
                </v-btn>
              </v-list-item>
            </v-menu>
            <v-btn
                id="no-background-hover"
                :class="`elevation-0 subtitle-1 ${isActive ? 'black--text' : 'white--text'} font-weight-medium`"
                :ripple="false"
                @click="onClickLogIn"
                style="width: 100px;"
                text
                tile
            >
              <v-divider class="mr-6" vertical :style="`border-width: 1px; background-color: ${isActive ? 'black' : 'white'};`"/>
              {{ loginBtnText }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row
            v-else
            align="center"
            justify="space-between"
        >
          <v-app-bar-nav-icon @click="drawer = !drawer"  :style="`${isActive ? 'color: black' : 'color: white'}`"/>
          <v-btn
              id="no-background-hover"
              :class="`elevation-0 subtitle-1 ${isActive ? 'black--text' : 'white--text'} font-weight-medium`"
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
    <app-bar-sheet-view v-if="this.$route.path !== '/'" :is-mobile="isMobile"/>
    <app-bar-sheet-particle-view v-else :is-mobile="isMobile"/>
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
      companyDefaultLogo: 'companyDefaultEmblem',
      companyWhiteLogo: 'companyWhiteEmblem'
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
    setIsHovered (flag) {
      this.isHovered = flag
    },
    onClickLogIn(){
      if (this.isLogin) {
        this.isLogin = false;
        this.$store.dispatch("user/logout", { "id": localStorage.id }).then(
            () => {
              if (this.$router.currentRoute.path === '/') {
                this.$router.go(this.$router.currentRoute);
              } else {
                this.$router.push('/')
              }
            },
            () => {
                this.$router.go(this.$router.currentRoute);
            }
        );
      }
      else {
        this.$router.push('/authentication')
      }
    },
    goToMain() {
      if (this.$router.currentRoute.path === '/') {
        this.$router.go(this.$router.currentRoute);
      } else {
        this.$router.push('/')
      }
    },
    goTo(path) {
      if (this.$router.currentRoute.path === path) {
        this.$router.go(this.$router.currentRoute);
      } else {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style scoped>
  #no-background-hover::before {
    background-color: transparent !important;
  }

  .menu-button {
    background: linear-gradient(currentColor, currentColor) bottom / 0 .1em no-repeat;
    transition: 1s background-size;
  }

  .menu-button:hover {
    background-size: 100% .1em;
  }

  /* Variations */
  .menu-button.left {
    background-position: left bottom;
  }

  .menu-button:active {
    background-size: 100% .1em;
  }

  .menu-button.active-black {
    transition: none;
    border-bottom-style: solid;
    border-bottom-color: black;
    border-bottom-width: thin;
  }

  .menu-button.active-white {
    transition: none;
    border-bottom-style: solid;
    border-bottom-color: white;
    border-bottom-width: thin;
  }
</style>