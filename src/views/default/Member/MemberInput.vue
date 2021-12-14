<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header" v-if="isDataFetched">
          <template v-slot:body>
            <professor-input-card v-if="isProfessorInput" :professor-data="professorData" :is-update="isUpdate"/>
            <student-input-card v-else :student-data="studentData" :is-update="isUpdate"/>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ProfessorInputCard from "@/components/members/ProfessorInputCard";
import StudentInputCard from "@/components/members/StudentInputCard";
import MainCard from "@/components/MainCard";

import VueCookies from "vue-cookies";
export default {
  name: "MemberInput",
  components: {MainCard, StudentInputCard, ProfessorInputCard},
  data: () => ({
    header: 'Member',
    isUpdate: false,
    isProfessorInput: false,
    isDataFetched: false,
    professorData: {},
    studentData: {}
  }),
  mounted() {
    this.isProfessorInput = this.$route.query.target === "professor";
    if (localStorage.id && VueCookies.get("accessToken")) {
      this.$store.dispatch('user/isAdmin', {id: localStorage.id}).then(
          (isAdmin) => {
            if (!isAdmin) {
              alert('접근 권한이 없습니다.')
              this.$router.push('/members')
            }
            else {
              let params = this.$route.query.uid;
              this.isUpdate = params !== undefined;
              if (params !== undefined) {
                if (this.isProfessorInput) {
                  this.$store.dispatch("professor/readProfessorByIdx", params).then(
                      (data) => {
                        this.professorData = data;
                        this.isDataFetched = true;
                      },
                      (err) => {
                        alert(err)
                        this.$router.push("/members")
                      }
                  )
                }
                else {
                  this.$store.dispatch("member/readMemberByIdx", params).then(
                      (data) => {
                        this.studentData = data;
                        this.isDataFetched = true;
                      },
                      (err) => {
                        alert(err)
                        this.$router.push("/members")
                      }
                  )
                }
              }
              else {
                this.isDataFetched = true;
              }
            }
          },
          (err) => {
            alert(err)
            this.$router.push('/members')
          }
      )
    }
    else {
      alert("접근 권한이 없습니다.")
      this.$router.push('/members')
    }
  },
}
</script>

<style scoped>

</style>