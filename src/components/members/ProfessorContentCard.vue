<template>
  <v-row align="start" justify="start">
    <v-col cols="12" md="3" align="start" class="mx-6">
      <v-img :src="!professorContentData.imgSrc ? errorImg : `http://${professorContentData.imgSrc}`" aspect-ratio="1" style="min-width: 258px; max-width: 258px" contain />
      <p class="font-weight-medium title mt-4">{{ professorContentData.name }}</p>
      <pre class="my-4 content-grey-font">{{ professorContentData.degree }}</pre>
      <pre class="my-4 content-grey-font">{{ `${professorContentData.email}\n${professorContentData.phone}` }}</pre>
      <div v-if="!isMobile">
        <v-icon
            v-if="isAdmin"
            small
            class="mb-1"
            @click="editItem(professorContentData.idx)"
        >
          mdi-pencil
        </v-icon>
        <v-dialog
            v-if="isAdmin"
            v-model="professorContentData.isConfirmOpen"
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
          <confirmation-dialog-card @close="professorContentData.isConfirmOpen = false" @onClickOkButton="deleteItem(professorContentData.idx)"/>
        </v-dialog>
      </div>
    </v-col>
    <v-col cols="12" md="8" class="mx-4" align="start">
      <div v-if="professorContentData.education.length > 0" class="mb-8">
        <p class="title font-weight-medium mb-4">Education</p>
        <pre class="ma-1 content-grey-font">{{ professorContentData.education }}</pre>
      </div>
      <div v-if="professorContentData.experience.length > 0" class="mb-8">
        <p class="title font-weight-medium mb-4">Experience</p>
        <pre class="ma-1 content-grey-font">{{ professorContentData.experience }}</pre>
      </div>
      <div v-if="professorContentData.affiliation.length > 0" class="my-8">
        <p class="title font-weight-medium mb-4">Affiliation</p>
        <pre class="ma-1 content-grey-font">{{ professorContentData.affiliation }}</pre>
      </div>
    </v-col>
    <v-col cols="12" v-if="isMobile">
      <v-icon
          v-if="isAdmin"
          small
          class="ml-4 mb-1"
          @click="editItem(professorContentData.idx)"
      >
        mdi-pencil
      </v-icon>
      <v-dialog
          v-if="isAdmin"
          v-model="professorContentData.isConfirmOpen"
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
        <confirmation-dialog-card @close="professorContentData.isConfirmOpen = false" @onClickOkButton="deleteItem(professorContentData.idx)"/>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import ConfirmationDialogCard from "@/components/dialog/ConfirmationDialogCard";

export default {
  name: "ProfessorContentCard",
  components: {ConfirmationDialogCard},
  props: {
    professorContentData: {
      type: Object,
      default: () => {
        return {}
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
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 37
        case 'sm': return 37
        default: return 40
      }
    },
    errorImg() {
      return require("@/assets/no_thumbnail.png");
    },
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    }
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