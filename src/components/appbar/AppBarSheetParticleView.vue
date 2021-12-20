<template>
  <v-sheet
    style="position:relative;"
    :height="800"
    color="rgb(25,25,25)"
  >
    <v-card-text style="height: 100%; position: absolute;">
      <v-container fluid style="height: 100%;">
        <v-row align="center" justify="center" style="height: 100%;">
          <v-col cols="10" sm="8" align="start" class="mt-10" v-if="!isMobile">
            <pre class="display-4 font-weight-regular white--text my-6 text-start" style="white-space: pre-wrap; width: fit-content">{{ headerTitle }}</pre>
            <pre class="title font-weight-light white--text my-6 ml-2 text-start" style="white-space: pre-wrap; width: fit-content">{{ headerSubTitle }}</pre>
          </v-col>
          <v-col cols="10" sm="12" align="center" class="mt-10" v-else>
            <pre class="display-3 text-center font-weight-bold white--text" style="white-space: pre-wrap; width: 100%; font-size: 20px; line-height: 120%">{{ headerTitle }}</pre>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <vue-particles
        style="height: 100%; position: relative;"
        class="particle"
        color="#dedede"
        :particle-opacity="0.7"
        :particles-number="120"
        shape-type="circle"
        :particle-size="5"
        lines-color="#dedede"
        :lines-width="1"
        :line-linked="true"
        :line-opacity="0.5"
        :lines-distance="150"
        :move-speed="3"
        :hover-effect="true"
        :click-effect="true"
        click-mode="push">
    </vue-particles>
  </v-sheet>
</template>

<script>
export default {
  name: "AppBarSheetParticleView",
  props: ['isMobile'],
  data: () => ({
    headerTitle: 'Artificial\nIntelligence',
    headerSubTitle: 'Artificial Intelligence Laboratory,\nKunsan National University'
  }),
}
</script>

<style scoped>

</style>