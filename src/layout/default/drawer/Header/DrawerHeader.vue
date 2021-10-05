<template>
  <v-list-item>
    <v-list-item-avatar size="80">
      <v-img contain :src="companyLogo" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="text-h7 font-weight-medium my-1">
        {{ company.toUpperCase() }}
      </v-list-item-title>
      <v-list-item-subtitle>
        Vuetify v2.4.0
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DefaultDrawerHeader",
  computed: {
    ...mapState('app', {
      company: "company",
      companyLogo: "companyWhiteLogo"
    })
  }
}
</script>

<style scoped>

</style>