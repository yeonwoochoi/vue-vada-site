<template>
  <v-card class="elevation-0 card-flat mb-6 px-12 py-8">
    <v-card-title>
      <p class="font-weight-light my-4" :style="`font-size: ${getHeaderFontSize}px; letter-spacing: -0.5px;`">
        {{ memberData.rank }}
        <v-divider style="width: 80px; background-color:#555555; border-width: 1px !important;" class="my-6"/>
      </p>
    </v-card-title>
    <v-card class="elevation-0 card-flat">
      <v-row align="start" justify="start">
        <v-col v-for="(member, index) in memberData.members" :key="index" cols="12" md="4" lg="3" sm="6" align="start" class="pr-4">
          <member-card :member-data="member"/>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
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
  .card-flat {
    width: 100%;
    height: fit-content;
    background-color: transparent;
  }
</style>