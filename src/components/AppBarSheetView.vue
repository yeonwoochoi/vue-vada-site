<template>
  <v-img style="position: relative;" height="700" :src="headerStyle.image">
    <v-card-text style="height: 100%; position: absolute;">
      <v-container fluid style="height: 100%;">
        <v-row align="center" justify="center" style="height: 100%;">
          <v-col v-if="!isMobile" ref="scrollTarget" cols="11">
            <div v-for="(item, i) in headerStyle.contents" :key="i">
              <p :class="`text-start ${item.style}`">{{ item.content }}</p>
            </div>
          </v-col>
          <v-col v-else ref="scrollTarget" cols="11">
            <div v-for="(mobileItem, j) in headerStyle.mobileContents" :key="j">
              <p :class="`text-start ${mobileItem.style}`">{{ mobileItem.content }}</p>
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
  props: ['headerStyle', 'isMobile']
}
</script>

<style scoped>

</style>