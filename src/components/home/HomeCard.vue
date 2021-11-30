<template>
  <v-row align="center" justify="center" style="width: 100%; height: fit-content;">
    <v-col cols="12" align="center">
      <div class="mb-12">
        <p class="display-1 font-weight-medium">{{title}}</p>
        <p class="subtitle-1 grey--text" v-if="subtitle">{{subtitle}}</p>
      </div>
      <slot name="body"/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HomeCard",
  props: {
    title: {
      type: String,
      default: () => {
        return ''
      }
    },
    subtitle: {
      type: String,
      default: () => {
        return ''
      }
    }
  }
}
</script>

<style scoped>

</style>