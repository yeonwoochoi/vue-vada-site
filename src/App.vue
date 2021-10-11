<template>
  <v-fade-transition mode="out-in">
    <router-view/>
  </v-fade-transition>
</template>

<script>
export default {
  name: 'App',
  created() {
    let token = this.$store.getters["user/getToken"];
    if (token.access === null && token.refresh === null) {
      this.$router.push('/authentication/sign-in').catch(() => {})
    }
  }
};
</script>