<template>
  <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
    <v-col cols="12">
      <v-card class="elevation-0 px-12 py-12" style="background-color: #F5F5F5; width: 100%">
        <v-container fluid>
          <v-row align="center" justify="start">
            <v-col cols="2" v-if="!isMobile">
              <v-subheader>Year</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-select
                  v-model="year"
                  :items="yearItems"
                  :rules="[v => !!v || 'Item is required']"
                  label="Type"
                  required
                  menu-props="auto"
                  :single-line="!isMobile"
              />
            </v-col>
            <v-col cols="2" v-if="!isMobile">
              <v-subheader>Type</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-select
                v-model="headerType"
                :items="headerItems"
                :rules="[v => !!v || 'Item is required']"
                label="Type"
                required
                menu-props="auto"
                :single-line="!isMobile"
              />
            </v-col>
            <v-col cols="2" v-if="!isMobile">
              <v-subheader>Title</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field
                  v-model="title"
                  ref="title"
                  label="Title"
                  hide-details
                  outlined
                  dense
                  required
                  :rules="[rules.required]"
                  clearable
              />
            </v-col>
            <v-col cols="2" v-if="!isMobile" style="display: flex; align-self: start" class="pt-1">
              <v-subheader>Content</v-subheader>
            </v-col>
            <v-col cols="12" md="9" class="pb-0">
              <v-textarea
                  v-model="content"
                  ref="content"
                  label="Content"
                  rows="6"
                  outlined
                  no-resize
                  auto-grow
                  counter
                  :rules="[rules.required, rules.counter]"
              />
            </v-col>
            <v-col cols="2" v-if="!isMobile" class="pt-0">
              <v-subheader>Link</v-subheader>
            </v-col>
            <v-col cols="12" md="9" class="pt-0">
              <v-text-field
                  v-model="link"
                  label="Link"
                  ref="link"
                  hide-details
                  outlined
                  dense
                  required
                  :rules="[rules.required]"
                  clearable
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12">
      <div style="display: flex; width: 100%; justify-content: end">
        <v-btn large @click="save" class="mr-4 font-weight-bold elevation-0 button-border-grey" outlined>저장</v-btn>
        <v-btn large @click="cancel" class="font-weight-bold elevation-0 button-border-grey" outlined>취소</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PublicationInputCard",
  props: {
    publicationData: {
      type: Object,
      default: () => {
        return {
          idx: -1,
          year: 2021,
          header: 'arXiv',
          title: "",
          content: "",
          link: ""
        }
      }
    },
    isUpdate: {
      type: Boolean,
      default: () => {
        return false
      }
    },
  },
  data: () => ({
    year: '2021',
    headerType: 'arXiv',
    title: '',
    content: '',
    link: '',
    customToolbar: [
      [{ header: [false, 1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline", "strike"],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" }
      ],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["clean"]
    ],
    headerItems: [
        'arXiv',
        'Conference',
        'Journal'
    ],
    contentLimit: 500,
  }),
  mounted() {
    this.reset();
    if (this.isUpdate) {
      this.fetchData()
    }
  },
  computed: {
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    },
    rules() {
      return {
        required: value => !!value || 'Required.',
        counter: value => value.length <= this.contentLimit || `Max ${this.contentLimit} characters`
      }
    },
    form () {
      return {
        title: this.title,
        content: this.content,
        link: this.link,
      }
    },
    isValid () {
      let hasError = false;
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          hasError = true
        }
        this.$refs[f].validate(true)
      })
      return !hasError
    },
    yearItems() {
      let results = []
      const start = 1990;
      const end = 2040;
      for (let i = start; i <= end; i++) {
        results.push(`${i}`)
      }
      return results;
    }
  },
  methods: {
    async fetchData() {
      if (this.isUpdate) {
        this.year = this.publicationData.year;
        this.headerType = this.publicationData.header;
        this.title = this.publicationData.title;
        this.content = this.publicationData.content;
        this.link = this.publicationData.link;
      }
    },
    reset() {
      this.year = '2021';
      this.headerType = 'arXiv';
      this.title = '';
      this.content = '';
      this.link = '';
    },
    save() {
      if (this.isValid) {
        const params = {
          id: localStorage.id,
          idx: this.$route.query.uid,
          year: this.year,
          header: this.headerType,
          title: this.title,
          content: this.content,
          link: this.link,
        }
        if (this.isUpdate) {
          this.$store.dispatch("publications/updateContent", params).then(
              () => {
                this.$router.push("/publications")
              },
              err => {
                alert(err)
                this.$router.push("/publications")
              }
          )
        }
        else {
          this.$store.dispatch("publications/registerContent", params).then(
              () => {
                this.$router.push("/publications")
              },
              err => {
                alert(err)
                this.$router.push("/publications")
              }
          )
        }
      }
      else {
        alert("Please input valid value.")
      }
    },
    cancel() {
      this.reset();
      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
      this.$router.push("/publications")
    }
  }
}
</script>

<style scoped>
.button-border-grey {
  border: rgb(150, 150, 150) 0.01em solid;
}
</style>