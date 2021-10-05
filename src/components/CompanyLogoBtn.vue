<template>
  <v-img
      :src="logoSrc"
      style="max-width: 150px;"
      contain
  >
    <v-btn
        style="min-height: 100%; min-width: 100%; background-color: transparent; color: transparent"
        to="/"
        id="no-background-hover"
        :ripple="false"
    />
  </v-img>
</template>

<script>
export default {
  name: "CompanyLogoBtn",
  props: ['logoSrc']
}
</script>

<style scoped>

</style>