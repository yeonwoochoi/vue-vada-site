<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0" v-if="isDataFetched">
        <v-card-actions v-if="isAdmin">
          <v-btn @click="onClickCreateProfessor">+</v-btn>
        </v-card-actions>
        <div v-for="(professor, index) in professors" :key="index">
          <main-card :header="professor.rank">
            <template v-slot:body>
              <professor-card :professor-data="professor.professors" :is-admin="isAdmin"/>
            </template>
          </main-card>
        </div>
        <v-card-actions v-if="isAdmin">
          <v-btn @click="onClickCreateStudent">+</v-btn>
        </v-card-actions>
        <div v-for="(student, index) in students" :key="index">
          <main-card :header="student.rank">
            <template v-slot:body>
              <student-card :member-data="student.members" :is-admin="isAdmin"/>
            </template>
          </main-card>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ProfessorCard from "@/components/members/ProfessorCard";
import StudentCard from "@/components/members/StudentCard";
import MainCard from "@/components/MainCard";
import VueCookies from "vue-cookies";

export default {
  name: "Members",
  components: {MainCard, ProfessorCard, StudentCard},
  data: () => ({
    isDataFetched: false,
    professors: [],
    students: [],
    isAdmin: false
  }),
  mounted() {
    this.$store.dispatch("professor/readProfessorAll").then(
        (professorData) => {
          this.professors = professorData;
          this.$store.dispatch("member/readMemberAll").then(
              (studentData) => {
                this.students = studentData
                if (VueCookies.get("accessToken") && localStorage.id) {
                  this.$store.dispatch('user/isAdmin', {id: localStorage.id}).then(
                      (isAdmin) => {
                        this.isAdmin = isAdmin;
                        this.isDataFetched = true;
                      },
                      (err) => {
                        alert(err)
                        this.$router.push("/")
                      }
                  )
                }
                else {
                  this.isAdmin = false;
                  this.isDataFetched = true;
                }
              },
              err => {
                alert(err);
                this.$router.push("/")
              }
          )
        },
        err => {
          alert(err);
          this.$router.push("/")
        }
    )
  },
  methods: {
    onClickCreateProfessor() {
      this.$router.push({
        path: '/members/input',
        query: {
          target: "professor"
        }
      })
    },
    onClickCreateStudent() {
      this.$router.push({
        path: '/members/input',
        query: {
          target: "student"
        }
      })
    }
  }
}
</script>

<style scoped>

</style>