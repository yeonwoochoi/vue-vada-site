<template>
  <v-fade-transition mode="out-in" id="app">
    <router-view/>
  </v-fade-transition>
</template>

<script>
export default {
  name: 'App',
};
</script>