<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0 mb-12">
        <main-card :header="header" v-if="isDataFetched">
          <template v-slot:body>
            <v-img :src="`http://${projectData.src}`" :aspect-ratio="16/9" contain style="width: 100%" />
            <div class="ma-6">
              <p class="text-start ma-2 headline grey--text font-weight-medium text--darken-3">
                {{ projectData.title }}
              </p>
              <p class="text-start mx-2 mb-4 subtitle-2 grey--text font-weight-regular">
                {{ `${projectData.from}-${projectData.to} | ${projectData.sponsor}` }}
                <v-icon
                    v-if="isAdmin"
                    small
                    class="ml-6"
                    @click="editItem"
                >
                  mdi-pencil
                </v-icon>
                <v-dialog
                    v-if="isAdmin"
                    v-model="isConfirmOpen"
                    max-width="350"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        small
                        class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                  <confirmation-dialog-card @close="isConfirmOpen = false" @onClickOkButton="deleteItem"/>
                </v-dialog>
              </p>
              <pre class="subtitle-1 content-grey-font ml-3 card-content" v-html="projectData.content"/>
            </div>
            <div class="ma-6">
              <v-spacer/>
              <v-btn @click="goToProject" large class="elevation-0 button-border-grey">
                목록보기
              </v-btn>
            </div>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "@/components/MainCard";
import ConfirmationDialogCard from "@/components/dialog/ConfirmationDialogCard";
export default {
  name: "ProjectContent",
  components: {
    MainCard, ConfirmationDialogCard
  },
  mounted() {
    this.init()
  },
  data: () => ({
    header: 'Projects',
    projectData: {},
    isDataFetched: false,
    isAdmin: false,
    isConfirmOpen: false
  }),
  methods: {
    init() {
      this.$store.dispatch("project/readProjectByIdx", this.$route.query.uid).then(
          (result) => {
            this.projectData = result.data.data
            this.isDataFetched = true;
          },
          (err) => {
            alert(err)
            this.goToProject()
          }
      )
      this.$store.dispatch("user/isAdmin", {id: localStorage.id}).then(
          isAdmin => {
            this.isAdmin = isAdmin
          },
          () => {
            this.isAdmin = false
          }
      )
    },
    editItem() {
      this.$router.push({
        path: `/projects/input`,
        query: {
          uid: this.$route.query.uid
        }
      })
    },
    deleteItem() {
      let params = {
        "id" : localStorage.id,
        "idx" : this.$route.query.uid,
      };
      this.$store.dispatch("project/deleteProject", params).then(
          () => {
            this.goToProject();
          },
          (err) => {
            alert(err);
            this.goToProject();
          }
      )
    },
    goToProject() {
      this.$router.push('/projects')
    },
  }
}
</script>

<style scoped>
.content-grey-font {
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  color: rgba(1, 1, 1, 0.75);
}

.card-content >>> {
  max-width: 95% !important;
  white-space: pre-wrap;
  overflow: hidden;
}

.button-border-grey {
  border: rgb(150, 150, 150) 0.01em solid;
}
</style>