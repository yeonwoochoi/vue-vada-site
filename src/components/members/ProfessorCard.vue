<template>
  <v-row align="start" justify="start">
    <div v-for="(professor, i) in professorData" :key="`professor-content-${i}`">
      <professor-content-card :professor-content-data="professor" :is-admin="isAdmin"/>
    </div>
  </v-row>
</template>

<script>
import ProfessorContentCard from "@/components/members/ProfessorContentCard";
export default {
  name: "ProfessorCard",
  components: {ProfessorContentCard},
  props: {
    professorData: {
      type: Array,
      default: () => {
        return []
      }
    },
    isAdmin: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
}
</script>

<style scoped>
  .content-grey-font {
    font-size: 15px;
    font-family: "Roboto", sans-serif;
    font-weight: normal;
    color: rgba(1, 1, 1, 0.55);
    line-height: 22px;
    letter-spacing: 0mm;
    white-space: pre-wrap;
  }
</style>