<template>
  <v-card class="elevation-0 card-flat mb-6 px-12 py-8">
    <v-card-title>
      <p class="font-weight-light my-4" style="font-size: 40px; letter-spacing: -0.5px;">
        {{ header }}
        <v-divider style="width: 80px; background-color:#555555; border-width: 1px !important;" class="my-6"/>
      </p>
    </v-card-title>
    <slot name="body">
    </slot>
  </v-card>
</template>

<script>
export default {
  name: "MainCard",
  props: ['header']
}
</script>

<style scoped>
  .card-flat {
    width: 100%;
    height: fit-content;
    background-color: transparent;
  }
</style>