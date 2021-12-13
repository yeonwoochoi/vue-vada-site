<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="professorData1.rank">
          <template v-slot:body>
            <professor-card :rank-data="professorData1"/>
          </template>
        </main-card>
        <main-card :header="professorData2.rank">
          <template v-slot:body>
            <professor-card :rank-data="professorData2"/>
          </template>
        </main-card>
        <main-card :header="phdData.rank">
          <template v-slot:body>
            <student-card :member-data="phdData.members"/>
          </template>
        </main-card>
        <main-card :header="masterData.rank">
          <template v-slot:body>
            <student-card :member-data="masterData.members"/>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ProfessorCard from "@/components/members/ProfessorCard";
import StudentCard from "@/components/members/StudentCard";
import MainCard from "@/components/MainCard";
export default {
  name: "Members",
  components: {MainCard, ProfessorCard, StudentCard},
  data: () => ({
    professorData1: {
      rank: 'Principal Investigator',
      imgSrc: '@/assets/members/images/professor_1.png',
      name: 'Sungroh Yoon, PhD',
      degree: 'Professor of Electrical and Computer Engineering',
      email: 'sryoon@snu.ac.kr',
      phone: '+82-2-880-1406',
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
    },
    professorData2: {
      rank: 'Research Professor',
      imgSrc: '@/assets/members/images/professor_2.png',
      name: 'Daehyung Cho, PhD',
      degree: 'Research Professor of Electrical and Computer Engineering',
      email: 'dhcho97@snu.ac.kr',
      phone: '+82-10-5317-1471',
      education: [
        'PhD in ECE, University of Illinois at Urbana-Champaign, USA',
        'MS in Electronic Eng., Hanyang University, Korea',
        'BS in Electronic Eng., Hanyang University, Korea',
      ],
      experience: [
        'Research Professor, ECE, Yonsei University (2017-2020)',
        'Senior Advisor, The Swiss Federal Institute of Technology, Lausanne (EPFL), Switzerland (2012-2016)',
        'Representative, Analog Bits, Inc., USA (2007-2012)',
        'Founder & CEO, Ubeacon Technologies, Inc., Korea (2006-2009)',
        'Senior Director, Samsung Electronics, Korea (2002-2005)',
        'Director, Hyundai Electronics (SKHynix), Korea (1995-1997)',
        'Engineer, Samsung Electronics, Korea (1983-1990)',
      ],
      affiliation: []
    },
    phdData: {
      rank: 'PhD Students',
      members: [
        {
          imgSrc: '@/assets/members/images/phd_1.png',
          name: 'Byunggook Na',
          email: 'byunggook.na@gmail.com',
          phone: '+82-2-880-1406',
          researchArea: 'Neural architecture search, parallel and distributed deep learning',
        },
        {
          imgSrc: '@/assets/members/images/phd_2.png',
          name: 'Heonseok Ha',
          email: 'heonseok.ha@snu.ac.kr',
          phone: '+82-2-880-1406',
          researchArea: 'Deep learning, privacy-preserving models',
        },
        {
          imgSrc: '@/assets/members/images/phd_3.png',
          name: 'Hyeokjun Choe',
          email: 'hyeokjun.choe@gmail.com',
          phone: '+82-2-880-1406',
          researchArea: 'Automated machine learning, neural architecture search, in-storage processing',
        },
        {
          imgSrc: '@/assets/members/images/phd_4.png',
          name: 'Jangho Lee',
          email: 'ubuntu@snu.ac.kr',
          phone: '+82-2-880-1406',
          researchArea: 'Audio-visual correspondence, representation learning',
        },
        {
          imgSrc: '@/assets/members/images/phd_5.png',
          name: 'Jaehee Jang',
          email: 'hukla@snu.ac.kr',
          phone: '+82-2-880-1406',
          researchArea: 'Privacy-preserving deep learning, federated learning',
        },
        {
          imgSrc: '@/assets/members/images/phd_6.png',
          name: 'Jaeyoon Yoo',
          email: 'yjy765@snu.ac.kr',
          phone: '+82-2-880-1406',
          researchArea: 'Machine Learning',
        },
      ]
    },
    masterData: {
      rank: 'Master Students',
      members: [
        {
          imgSrc: '@/assets/members/images/master_1.png',
          name: 'Jongwan Kim',
          email: 'ggusg0317@gmail.com',
          phone: '+82-2-880-1406',
          researchArea: 'Spiking neural network (SNN), dynamic vision sensor, DNN compression',
        },
        {
          imgSrc: '@/assets/members/images/master_2.png',
          name: 'Che Hyun Lee',
          email: 'saga1214@snu.ac.kr',
          phone: '+82-2-880-1406',
          researchArea: 'Natural language processing, representation learning, vision language multimodal tasks',
        }
      ]
    },
    isDataFetched: false,
    professors: [],
    students: [],
  }),
}
</script>

<style scoped>

</style>