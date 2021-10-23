<template>
  <v-app>
    <v-row align="center" justify="center" style="height: 90%;">
      <v-card flat style="height: fit-content" align="center">
        <v-img
            :src="require('@/assets/error/notFoundImg.png')"
            contain
            class="mb-10"
        />
        <button @click="goToMain">
          <v-img
              :src="require('@/assets/error/notFoundBtn.png')"
              contain
              class="mb-12"
          />
        </button>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    goToMain() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>