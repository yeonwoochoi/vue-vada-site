<template>
  <v-sheet
    style="position:relative;"
    height="700"
    color="#171717"
  >
    <v-card-text style="height: 100%; position: absolute;">
      <v-container style="height: 100%;" v-if="!isMobile">
        <v-row align="center" justify="center" style="height: 100%;">
          <v-col cols="11">
            <div v-for="(item, i) in headerStyle.contents" :key="i">
              <p :class="item.style">{{ item.content }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <vue-particles
        style="height: 100%; position: relative;"
        class="particle"
        color="#dedede"
        :particle-opacity="0.7"
        :particles-number="150"
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
  props: ['headerStyle', 'isMobile'],
}
</script>

<style scoped>

</style>