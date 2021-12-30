<template>
  <v-form v-model="valid" ref="form">
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
              <v-col cols="12">
                <v-card class="elevation-0 px-12 py-12" style="background-color: #F5F5F5; width: 100%">
                  <v-container fluid>
                    <v-row align="center" justify="start">
                      <v-col cols="2" v-if="!isMobile">
                        <v-subheader>연도</v-subheader>
                      </v-col>
                      <v-col cols="12" md="9">
                        <v-select
                            v-model="year"
                            :items="yearItems"
                            :rules="[rules.required]"
                            label="Type"
                            required
                            menu-props="auto"
                            :single-line="!isMobile"
                        />
                      </v-col>
                      <v-col cols="2" v-if="!isMobile">
                        <v-subheader>학기</v-subheader>
                      </v-col>
                      <v-col cols="12" md="9">
                        <v-select
                            v-model="semester"
                            :items="semesterItems"
                            :rules="[rules.required]"
                            label="Type"
                            required
                            menu-props="auto"
                            :single-line="!isMobile"
                        />
                      </v-col>
                      <v-col cols="2" v-if="!isMobile" class="pt-3">
                        <v-subheader>강의 이름</v-subheader>
                      </v-col>
                      <v-col cols="12" md="9">
                        <v-text-field
                            v-model="name"
                            ref="name"
                            label="강의 이름"
                            outlined
                            dense
                            required
                            :rules="[rules.required]"
                            clearable
                            class="pt-6"
                        />
                      </v-col>
                      <v-col cols="12" align="end">
                        <div style="display: flex; width: 100%; justify-content: end">
                          <v-btn large @click="save" class="mr-4 font-weight-bold elevation-0 button-border-grey" outlined>저장</v-btn>
                          <v-btn large @click="cancel" class="font-weight-bold elevation-0 button-border-grey" outlined>취소</v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-form>
</template>

<script>
import MainCard from "@/components/MainCard";
import VueCookies from "vue-cookies";


export default {
  name: "LectureInput",
  components: { MainCard },
  mounted() {
    this.checkAccessRight();
    this.reset()
  },
  data: () => ({
    header: 'Lecture',
    year: '',
    semester: '',
    name: '',
    valid: false
  }),
  computed: {
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    },
    yearItems() {
      let years = [];
      const endYear = parseInt(new Date().getFullYear());
      const startYear = endYear - 10;
      for (let i = startYear; i <= endYear; i++) {
        years.push(i);
      }
      return years;
    },
    semesterItems() {
      return [1, 2]
    },
    rules() {
      return {
        required: value => !!value || 'Required',
      }
    },
  },
  methods: {
    save() {
      if (this.valid) {
        const params = {
          year: this.year,
          semester: this.semester,
          name: this.name,
          id: localStorage.id
        }
        this.$store.dispatch('lecture/registerLecture', params).then(
            () => {
              this.goToMain();
            },
            (err) => {
              alert(err)
              this.goToMain();
            }
        )
      }
      else {
        alert('모든 값을 입력해주세요.')
      }
    },
    cancel() {
      this.reset();
      this.goToMain();
    },
    goToMain() {
      this.$router.push('/lecture');
    },
    reset() {
      this.year = this.yearItems[this.yearItems.length-1]
      this.semester = this.semesterItems[0]
      this.name = ''
    },
    checkAccessRight () {
      if (localStorage.id && VueCookies.get("accessToken")) {
        this.$store.dispatch('user/isAdmin', {id: localStorage.id}).then(
            (isAdmin) => {
              if (!isAdmin) {
                alert('접근 권한이 없습니다.')
                this.goToMain()
              }
            },
            (err) => {
              alert(err)
              this.goToMain()
            }
        )
      }
      else {
        alert('접근 권한이 없습니다.')
        this.goToMain()
      }
    },
  }
}
</script>

<style scoped>

</style>