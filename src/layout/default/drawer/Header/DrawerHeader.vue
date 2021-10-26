<template>
  <v-list-item>
    <v-list-item-avatar size="70" class="my-5">
      <v-img contain :src="companyLogo"/>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="text-h7 font-weight-medium my-1">
        {{ company.toUpperCase() }}
      </v-list-item-title>
      <v-list-item-subtitle>
        AI-LAB
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
      companyLogo: "companyWhiteEmblem"
    })
  }
}
</script>

<style scoped>

</style>