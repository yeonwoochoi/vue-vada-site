<template>
  <v-row align="start" justify="start">
    <v-col v-for="(member, index) in memberData.members" :key="index" cols="12" md="4" lg="3" sm="6" align="start" class="pr-4">
      <member-card :member-data="member"/>
    </v-col>
  </v-row>
</template>

<script>
import MemberCard from "@/components/members/MemberCard";
export default {
  name: "RankCard2",
  components: {MemberCard},
  props: {
    memberData: {
      type: Object,
      default: () => {
        return {
          rank: '',
          members: []
        };
      }
    }
  },
  computed: {
    getHeaderFontSize() {
      console.log(this.$vuetify.breakpoint.name)
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 37
        case 'sm':
          return 37
        default:
          return 40
      }
    }
  }
}
</script>

<style scoped>
</style>