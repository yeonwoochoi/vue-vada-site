<template>
  <v-card
      flat
      style="height: 80px; width: 100%; background-color: transparent"
  >
    <v-row
        align="center"
        justify="center"
        style="height: 100%; width: 100%"
    >
      <v-col cols="2">
        <v-img
          :src="agreementIcon"
          height="50px"
          width="50px"
          contain
          aspect-ratio="1"
        />
      </v-col>
      <v-col cols="1">
        <v-img
          :src="require('@/assets/signup/icon_next.png')"
          height="30px"
          width="30px"
          contain
          aspect-ratio="1"
        />
      </v-col>
      <v-col cols="2">
        <v-img
          :src="userInfoIcon"
          height="50px"
          width="50px"
          contain
          aspect-ratio="1"
        />
      </v-col>
      <v-col cols="1">
        <v-img
            :src="require('@/assets/signup/icon_next.png')"
            height="30px"
            width="30px"
            contain
            aspect-ratio="1"
        />
      </v-col>
      <v-col cols="2">
        <v-img
            :src="completeIcon"
            height="50px"
            width="50px"
            contain
            aspect-ratio="1"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "SignUpHeaderIcons",
  props: ['activeIconIndex'],
  data: () => ({

  }),
  computed: {
    agreementIcon: function (){
      return this.activeIconIndex === 0
          ? require('@/assets/signup/icon_agreement_active.png')
          : require('@/assets/signup/icon_agreement_inactive.png')
    },
    userInfoIcon: function (){
      return this.activeIconIndex === 1
          ? require('@/assets/signup/icon_enter_user_info_active.png')
          : require('@/assets/signup/icon_enter_user_info_inactive.png')
    },
    completeIcon: function (){
      return this.activeIconIndex === 2
          ? require('@/assets/signup/icon_sign_up_complete_active.png')
          : require('@/assets/signup/icon_sign_up_complete_inactive.png')
    }
  }
}
</script>

<style scoped>

</style>