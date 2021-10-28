<template>
  <v-row align="start" justify="space-around" class="mb-6 mx-4" style="width: 100%;">
    <v-col cols="12" lg="1" class="my-2" style="min-height: 100%;">
      <div style="min-width: 200px;">
        <p class="font-weight-regular display-1 my-0">{{ publicationData.year }}</p>
      </div>
    </v-col>
    <v-divider vertical style="min-height: 100%; background-color: #DCDCDC" class="my-4"/>
    <v-col cols="12" lg="10" :class="`${isMobile ? 'ml-4' : ''}`">
      <v-card v-for="(publication, index) in publicationData.data" :key="`publication-${index}`" class="elevation-0 pb-12 card-flat">
        <pre class="font-weight-medium title mb-2">{{ publication.header }}</pre>
        <v-divider style="width: 80px; background-color:rgb(150, 150, 150); border-width: 1px !important;" class="mb-4 mt-1"/>
        <div v-for="(content, i) in publication.content" :key="i" class="my-6">
          <pre class="subtitle-1 font-weight-medium">{{ content.title }}</pre>
          <pre class="content-grey-font my-1">{{ content.content }}</pre>
          <a class="subtitle-2 font-weight-bold elevation-0 black--text" :href="content.link" style="text-decoration: none;" target="_blank">{{ 'link' }}</a>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PublicationCard",
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
                  title: '',
                  content: '',
                  link: ''
                },
              ]
            },
            {
              header: 'Conference',
              content: [
                {
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
                  title: '',
                  content: '',
                  link: ''
                },
              ]
            },
          ]
        }
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
    }
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