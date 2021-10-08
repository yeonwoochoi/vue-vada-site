<template>
  <v-img style="position: relative;" height="700" :src="headerStyle.image">
    <v-card-text style="height: 100%; position: absolute;">
      <v-container style="height: 100%;">
        <v-row align="center" justify="start" style="height: 100%;">
          <v-col ref="scrollTarget" cols="12" v-if="!isMobile">
            <div v-for="(item, i) in headerStyle.contents" :key="i">
              <p :class="`${item.style}`">{{ item.content }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-img>
</template>

<script>
import "animate.css"
export default {
  name: "AppBarSheetView",
  props: ['headerStyle', 'isMobile'],
}
</script>

<style scoped>

</style>