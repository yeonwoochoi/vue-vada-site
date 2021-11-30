<template>
  <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
    <v-col cols="12">
      <v-card class="elevation-0 px-12 py-12" style="background-color: #F5F5F5; width: 100%">
        <v-container fluid>
          <v-row align="center" justify="start">
            <v-col cols="2">
              <v-subheader>Title</v-subheader>
            </v-col>
            <v-col cols="9">
              <v-text-field
                  v-model="title"
                  label="Title"
                  hide-details
                  outlined
                  dense
              />
            </v-col>
            <v-col cols="2">
              <v-subheader>Sponsor</v-subheader>
            </v-col>
            <v-col cols="9">
              <v-text-field
                  v-model="sponsor"
                  label="Sponsor"
                  hide-details
                  outlined
                  dense
              />
            </v-col>
            <v-col cols="2">
              <v-subheader>Date</v-subheader>
            </v-col>
            <v-col cols="3">
              <v-menu
                  ref="fromDateMenu"
                  v-model="isFromOpen"
                  :close-on-content-click="false"
                  :return-value.sync="from"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="from"
                      label="From"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  />
                </template>
                <v-date-picker
                    v-model="from"
                    type="month"
                    no-title
                    scrollable
                >
                  <v-spacer/>
                  <v-btn
                      text
                      color="primary"
                      @click="isFromOpen = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.fromDateMenu.save(from)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="1" align="center">
              <p class="mb-1">~</p>
            </v-col>
            <v-col cols="3">
              <v-menu
                  ref="toDateMenu"
                  v-model="isToOpen"
                  :close-on-content-click="false"
                  :return-value.sync="to"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="to"
                      label="To"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="to"
                    type="month"
                    no-title
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="isToOpen = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.toDateMenu.save(to)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <vue-editor v-model="content" :editorToolbar="customToolbar" />
            </v-col>
            <v-col cols="6">
              <input
                  ref="selectedImage"
                  id="input"
                  type="file"
                  name="image"
                  accept="image/*"
                  class="hidden mt-6"
                  @change="setImageFile"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12">
      <div style="display: flex; width: 100%; justify-content: end">
        <v-btn large :disabled="isUploading" @click="save" class="mr-4 font-weight-bold elevation-0 button-border-grey" outlined>저장</v-btn>
        <v-btn large :disabled="isUploading" @click="cancel" class="font-weight-bold elevation-0 button-border-grey" outlined>취소</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "ProjectInputCard",
  components: {VueEditor},
  data: () => ({
    menu: false,
    title: '',
    content: '',
    sponsor: '',
    from: '',
    to: '',
    imgSrc: '',
    isFromOpen: false,
    isToOpen: false,
    isAdmin: false,
    isUploading: false,
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
  }),
  mounted() {
    this.reset();
    this.from = new Date().toISOString().substr(0, 7);
    this.to = '';
  },
  methods: {
    async save() {
      if (!this.title) {
        alert('제목을 입력해주세요');
      }
      else if (!this.content) {
        alert('내용을 입력해주세요')
      }
      else if (!this.sponsor) {
        alert('후원자를 입력해주세요')
      }
      else if (!this.from) {
        alert('Project 시작일을 입력해주세요')
      }
      else {
        let form = new FormData();
        form.append("id", localStorage.id)
        form.append("title", this.title)
        form.append("content", this.content)
        form.append("sponsor", this.sponsor)
        form.append("from", this.from)
        form.append("to", this.to)

        form.append('file', this.$refs.selectedImage.files[0]);

        //this.isUploading = true;

        this.$store.dispatch('project/registerProject', form).then(
            () => {
              this.$router.push('/projects');
            },
            (err) => {
              alert(err)
            }
        )
      }
    },
    reset () {
      this.title = '';
      this.content = '';
      this.sponsor = '';
      this.from = '';
      this.to = '';
      this.isUploading = false;
    },
    cancel () {
      this.reset();
      this.$router.push('/projects')
    },
    setImageFile() {
      this.imgSrc = this.$refs.selectedImage.files[0]
    }
  }
}
</script>

<style scoped>
.button-border-grey {
  border: rgb(200, 200, 200) 0.01em solid;
}
</style>