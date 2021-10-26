<template>
  <v-card style="background-color: transparent; width: fit-content; height: fit-content; display: flex; align-items: normal" class="elevation-0">
    <v-img
        :src="logoSrc"
        :style="`max-width: ${logoHeight}px;`"
        contain
    >
      <v-btn
          style="min-height: 100%; min-width: 100%; background-color: transparent; color: transparent"
          to="/"
          id="no-background-hover"
          :ripple="false"
      />
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "CompanyLogoBtn",
  props: ['logoSrc', 'logoHeight']
}
</script>

<style scoped>

</style>