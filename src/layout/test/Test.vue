<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <rank-card :rank-data="rankData"/>
        <rank-card :rank-data="rankData"/>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import RankCard from "@/components/members/RankCard";
export default {
  name: "Test",
  components: {RankCard},
  data: () => ({
    rankData: {
      rank: 'Principal Investigator',
      imgSrc: '@/assets/members/images/professor.png',
      name: 'Sungroh Yoon, PhD',
      degree: 'Professor of Electrical and Computer Engineering',
      email: 'sryoon@snu.ac.kr',
      phone: '+82-2-880-1406\n',
      education: [
          'PhD in EE, Stanford University, USA',
          'MS in EE, Stanford University, USA',
          'BS in EE, Seoul National University, Korea',
      ],
      experience: [
          'Chairperson, Presidential Committee on the Fourth Industrial Revolution (2020-Present)',
          'Associate Dean, College of Engineering, Seoul National University (2019-Present)',
          'Vice Chair, ECE, Seoul National University (2017-2019)',
          'Visiting Professor, Neuroscience, Stanford University, USA (2016-2017)',
          'Assistant Professor, EE, Korea University, Seoul, Korea (2007-2012)',
          'Senior Engineer, Intel Corporation, USA',
          'Postdoctoral Scholar, Departments of EE and Genetics, Stanford University, USA',
      ],
      affiliation: [
          'Artificial Intelligence Institute',
          'Automation and Systems Research Institute',
          'Department of Biological Sciences',
          'Graduate School of Data Science',
          'Institute of New Media and Communications',
          'Interdisciplinary Program in Artificial Intelligence',
          'Interdisciplinary Program in Bioinformatics',
      ]
    }
  }),
}
</script>

<style scoped>

</style>