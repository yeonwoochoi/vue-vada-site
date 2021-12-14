<template>
  <v-row align="start" justify="center">
    <div v-for="(professor, index) in professorData" :key="index">
      <v-col cols="12" md="4" lg="3" align="start" class="mx-4">
        <v-img :src="!professor.imgSrc ? errorImg : `http://${professor.imgSrc}`" aspect-ratio="1" style="min-width: 258px; max-width: 258px" contain />
        <p class="font-weight-medium title mt-4">{{ professor.name }}</p>
        <pre class="my-4 content-grey-font">{{ professor.degree }}</pre>
        <pre class="my-4 content-grey-font">{{ `${professor.email}\n${professor.phone}` }}</pre>
        <v-icon
            v-if="isAdmin"
            small
            class="ml-4 mb-1"
            @click="editItem(professor.idx)"
        >
          mdi-pencil
        </v-icon>
        <v-dialog
            v-if="isAdmin"
            v-model="professor.isConfirmOpen"
            max-width="350"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
                small
                class="ml-2 mb-1"
                v-bind="attrs"
                v-on="on"
            >
              mdi-delete
            </v-icon>
          </template>
          <confirmation-dialog-card @close="professor.isConfirmOpen = false" @onClickOkButton="deleteItem(professor.idx)"/>
        </v-dialog>
      </v-col>
      <v-col cols="12" md="7" lg="8" class="mx-4" align="start">
        <div v-if="professor.education.length > 0" class="mb-8">
          <p class="title font-weight-medium mb-4">Education</p>
          <pre class="ma-1 content-grey-font">{{ professor.education }}</pre>
        </div>
        <div v-if="professor.experience.length > 0" class="mb-8">
          <p class="title font-weight-medium mb-4">Experience</p>
          <pre class="ma-1 content-grey-font">{{ professor.experience }}</pre>
        </div>
        <div v-if="professor.affiliation.length > 0" class="my-8">
          <p class="title font-weight-medium mb-4">Affiliation</p>
          <pre class="ma-1 content-grey-font">{{ professor.affiliation }}</pre>
        </div>
      </v-col>
    </div>
  </v-row>
</template>

<script>
import ConfirmationDialogCard from "@/components/dialog/ConfirmationDialogCard";
export default {
  name: "ProfessorCard",
  components: {ConfirmationDialogCard},
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
  computed: {
    getHeaderFontSize() {
      console.log(this.$vuetify.breakpoint.name)
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 37
        case 'sm': return 37
        default: return 40
      }
    },
    errorImg() {
      return require("@/assets/no_thumbnail.png");
    },
  },
  methods: {
    editItem(idx){
      this.$router.push({
        path: "/members/input",
        query: {
          uid: idx,
          target: "professor"
        }
      })
    },
    deleteItem(idx){
      let params = {
        "id" : localStorage.id,
        "idx" : idx,
      };
      this.$store.dispatch("professor/deleteProfessor", params).then(
          () => {
            this.$router.go(this.$router.currentRoute);
          },
          err => {
            alert(err)
            this.$router.go(this.$router.currentRoute);
          }
      )
    },
  }
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