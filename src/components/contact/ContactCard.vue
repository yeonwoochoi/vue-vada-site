<template>
  <v-row align="start" justify="start" class="my-6 mx-4" style="width: 100%; height: fit-content;">
    <v-col cols="12">
      <div style="min-width: 200px;">
        <p class="font-weight-medium title my-0">{{ contactData.header }}</p>
      </div>
      <v-divider style="width: 100px; background-color:#DCDCDC; border-width: 1px !important;" class="mt-4"/>
    </v-col>
    <v-col cols="12" class="ml-2">
      <pre class="font-weight-medium subtitle-1">{{ contactData.content }}</pre>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ContactCard",
  props: {
    contactData: {
      type: Object,
      default: () => {
        {
          return {
            header: '',
            content: ''
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  pre {
    white-space: pre-wrap;
  }
</style>