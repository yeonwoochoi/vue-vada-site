<template>
  <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
    <v-col cols="12" lg="1" class="my-2">
      <div style="min-width: 200px;">
        <p class="font-weight-regular display-1 my-0">{{ publicationData.year }}</p>
      </div>
    </v-col>
    <v-divider vertical style="min-height: 100%; background-color: #DCDCDC" class="my-4"/>
    <v-col cols="12" lg="10" :class="`${isMobile ? 'ml-4' : ''}`">
      <v-card v-for="(publication, index) in publicationData.data" :key="`publication-${index}`" class="elevation-0 pb-12 card-flat">
        <div v-if="publication.content.length > 0">
          <pre class="font-weight-medium title mb-2">{{ publication.header }}</pre>
          <v-divider style="width: 80px; background-color:rgb(150, 150, 150); border-width: 1px !important;" class="mb-4 mt-1"/>
          <div v-for="(content, i) in publication.content" :key="i" class="my-6">
            <pre class="subtitle-1 font-weight-medium">{{ content.title }}</pre>
            <pre class="content-grey-font my-1">{{ content.content }}</pre>
            <a class="subtitle-2 font-weight-bold elevation-0 black--text" :href="content.link" style="text-decoration: none;" target="_blank">{{ 'link' }}</a>
            <v-icon
                v-if="isAdmin"
                small
                class="ml-4 mb-1"
                @click="editItem(content.idx)"
            >
              mdi-pencil
            </v-icon>
            <v-dialog
                v-if="isAdmin"
                v-model="content.isConfirmOpen"
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
              <confirmation-dialog-card @close="content.isConfirmOpen = false" @onClickOkButton="deleteItem(content.idx)"/>
            </v-dialog>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ConfirmationDialogCard from "@/components/dialog/ConfirmationDialogCard";

export default {
  name: "PublicationCard",
  components: {ConfirmationDialogCard},
  props: {
    publicationData: {
      type: Object,
      default: () => {
        return {
          year: '',
          data: [
            {
              header: 'arXiv',
              content: [
                {
                  idx: -1,
                  title: '',
                  content: '',
                  link: '',
                },
              ]
            },
            {
              header: 'Conference',
              content: [
                {
                  idx: -1,
                  title: '',
                  content: '',
                  link: ''
                },
              ]
            },
            {
              header: 'Journal',
              content: [
                {
                  idx: -1,
                  title: '',
                  content: '',
                  link: ''
                },
              ]
            },
          ]
        }
      }
    },
    path: {
      type: String,
      default: () => {
        return 'publications'
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
    isMobile() {
      const breakpoint = this.$vuetify.breakpoint.name;
      switch (breakpoint) {
        case "sm":
          return true;
        case "xs":
          return true;
        case "md":
          return true;
        default:
          return false;
      }
    },
  },
  methods:{
    editItem(idx){
      this.$router.push({
        path: `/${this.path}/input`,
        query: {
          uid: idx
        }
      })
    },
    deleteItem(idx){
      let params = {
        "id" : localStorage.id,
        "idx" : idx,
      };
      this.$store.dispatch("publications/deleteContent", params).then(
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
  .card-flat {
    width: 100%;
    height: fit-content;
    background-color: transparent;
  }

  .content-grey-font {
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: normal;
    color: rgba(1, 1, 1, 0.55);
    line-height: 22px;
    letter-spacing: 0mm;
    white-space: pre-wrap;
  }

  pre {
    white-space: pre-wrap;
  }
</style>