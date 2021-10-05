<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
          class="ma-4 white--text"
          cols="12"
      >
        <a
            v-for="(info, i) in footerBtnInfo"
            :key="i"
            class="mr-4 white--text"
            style="text-decoration: none;"
            :href="info.link"
        >
          {{ info.text }}
        </a>
      </v-col>
      <v-col
          class="ma-4 white--text"
          cols="12"
      >
        {{ copyright }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "MobileFooter",
  computed: {
    ...mapState('app', {
      footerBtnInfo: 'footerBtnInfo',
      copyright: 'copyright'
    })
  }
}
</script>

<style scoped>

</style>