<template>
  <v-card>
    <v-card-title class="text-h5">
      Delete Confirmation
    </v-card-title>
    <v-card-text>Are you sure you want to delete this item?</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="green darken-1"
          text
          @click="closeDialog"
      >
        Cancel
      </v-btn>
      <v-btn
          color="green darken-1"
          text
          @click="onClickOkBtn"
      >
        OK
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ConfirmationDialogCard",
  methods: {
    onClickOkBtn() {
      this.$emit("onClickOkButton")
      this.closeDialog()
    },
    closeDialog() {
      this.$emit("close")
    }
  }
}
</script>

<style scoped>

</style>