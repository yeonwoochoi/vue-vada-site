<template>
  <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
    <v-col cols="12">
      <v-card class="elevation-0 px-12 py-12" style="background-color: #F5F5F5; width: 100%">
        <v-container fluid>
          <v-row align="center" justify="start">
            <v-col cols="2" v-if="!isMobile">
              <v-subheader>Title</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field
                  v-model="title"
                  label="Title"
                  hide-details
                  outlined
                  dense
              />
            </v-col>
            <v-col cols="2" v-if="!isMobile">
              <v-subheader>Sponsor</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field
                  v-model="sponsor"
                  label="Sponsor"
                  hide-details
                  outlined
                  dense
              />
            </v-col>
            <v-col cols="2" v-if="!isMobile">
              <v-subheader>Date</v-subheader>
            </v-col>
            <v-col cols="5" md="3">
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
            <v-col cols="5" md="3">
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
                  class="hidden my-6"
                  @change="setImageFile"
              />
              <v-row align="start" justify="start" v-if="previewImgUrl">
                <v-col cols="12">
                  <img :src="previewImgUrl" style="min-height: 128px; max-height: 200px;" alt="project"/>
                </v-col>
              </v-row>
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
  props: {
    projectData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isUpdate: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
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
    previewImgUrl: null
  }),
  mounted() {
    this.reset();
    this.$refs.selectedImage.addEventListener('change', this.handleImageFileSelect, false)
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
        form.append("idx", this.$route.query.uid)
        form.append("title", this.title)
        form.append("content", this.content)
        form.append("sponsor", this.sponsor)
        form.append("from", this.from)
        form.append("to", this.to)

        form.append('file', this.$refs.selectedImage.files[0]);

        this.isUploading = true;

        if (this.isUpdate) {
          this.$store.dispatch('project/updateProject', form).then(
              () => {
                this.$router.push('/projects');
              },
              (err) => {
                alert(err)
              }
          )
        }
        else {
          this.$store.dispatch('project/registerProject', form).then(
              () => {
                this.$router.push('/projects');
              },
              (err) => {
                alert(err)
              }
          )
        }
      }
    },
    reset () {
      this.title = '';
      this.content = '';
      this.sponsor = '';
      this.from = new Date().toISOString().substr(0, 7);
      this.to = '';
    },
    cancel () {
      this.reset();
      this.isUploading = false;
      this.$router.push('/projects')
    },
    setImageFile() {
      this.imgSrc = this.$refs.selectedImage.files[0]
    },
    async fetchData() {
      this.title = this.projectData.title;
      this.content = this.projectData.content;
      this.sponsor = this.projectData.sponsor;
      this.from = this.projectData.from;
      this.to = this.projectData.to;

      if (this.projectData.src) {
        let dataTransfer = new DataTransfer();

        await fetch(`http://${this.projectData.src}`)
            .then(res => res.blob())
            .then(blob => {
              let file = new File([blob], this.getFileName(this.projectData.src), {type: 'image/*', lastModified: Date.now()});
              dataTransfer.items.add(file);
            })

        this.$refs.selectedImage.files = dataTransfer.files;
        this.imgSrc = this.$refs.selectedImage.files[0];
        this.previewImg();
      }

      this.isUploading = false;
    },
    handleImageFileSelect(e) {
      if (!e.target.files) return;
      e.preventDefault();
      this.previewImg();
    },
    previewImg() {
      if (this.$refs.selectedImage.files.length > 0) {
        let selectFile = this.$refs.selectedImage.files[0];

        //확장자명 가져오기 (ex. .png .jpg .pdf)
        let fileExt = selectFile.name.substring(
            selectFile.name.lastIndexOf(".") + 1
        );
        fileExt = fileExt.toLowerCase();

        // 20MB
        let limitSize = 1048576 * 20;

        // 이미지 파일
        if (
            ["jpeg", "jpg", "png", "gif", "bmp"].includes(fileExt) &&
            selectFile.size <= limitSize
        ) {
          let reader = new FileReader();
          reader.onload = e => {
            this.previewImgUrl = e.target.result;
          }
          reader.readAsDataURL(selectFile)
        }
        // 이미지 외 파일
        else if (selectFile.size <= limitSize) {
          this.previewImgUrl = require('@/assets/no_thumbnail.png');
        }
        else {
          alert("Invalid File")
          this.previewImgUrl = null;
          this.resetFile()
        }
      }
      else {
        this.previewImgUrl = null;
      }
    },
    resetFile() {
      if (this.$refs.selectedImage.size > 0) {
        const dataTransfer = new DataTransfer();
        this.$refs.selectedImage.files = dataTransfer.files;
      }
    },
    getFileName(name) {
      let temp = name.split('/');
      return temp[temp.length-1];
    }
  },
}
</script>

<style scoped>
.button-border-grey {
  border: rgb(200, 200, 200) 0.01em solid;
}
</style>