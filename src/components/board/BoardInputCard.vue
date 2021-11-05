<template>
  <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
    <v-card class="elevation-0 px-12 py-12" style="background-color: #F5F5F5; width: 100%">
      <v-text-field
          v-model="title"
          outlined
          dense
      />
      <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
      <form @submit.prevent="save" method="post" class="my-6" enctype="multipart/form-data">
        <input type="file" ref="selectFile" multiple="multiple">
        <v-row v-if="uploadFiles.length > 0" align="center" justify="start">
          <v-col cols="12" sm="6" md="3" v-for="(selectFile, index) in uploadFiles" :key="index" class="px-4">
            <span style="display: flex;justify-content: space-between; " class="mb-1 mt-4">
              <p class="ellipsis">{{ selectFile.file.name }}</p>
              <v-btn @click="removeFile(selectFile.file)" class="elevation-0 red--text no-background-hover mr-2" :ripple="false" small style="width: fit-content">X</v-btn>
            </span>
            <img v-if="selectFile.previewImgUrl" :src="selectFile.previewImgUrl" style="width: 205px; height: 128px;"/>
          </v-col>
        </v-row>
      </form>
      <v-btn :disabled="isUploading" @click="save">저장</v-btn>
    </v-card>
  </v-row>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "BoardInputCard",
  components: {VueEditor},
  data: () => ({
    title: '',
    content: '',
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
    existingFiles: null,
    uploadFiles: [],
    isUploading: false,
    response: null
  }),
  mounted() {
    this.$refs.selectFile.addEventListener('change', this.handleFileSelect, false)
  },
  methods: {
    async save() {
      if (!this.title) {
        alert('제목을 입력해주세요');
      }
      else if (!this.content) {
        alert('내용을 입력해주세요')
      }
      else {
        let form = new FormData();
        form.append("id", localStorage.id)
        form.append("title", this.title)
        form.append("content", this.content)
        form.append("attach", this.uploadFiles)

        this.isUploading = true;

        //TODO (업로드 to 서버)
      }
    },
    previewFile() {
      let isError = false;
      if (this.$refs.selectFile.files.length > 0) {
        let length = this.$refs.selectFile.files.length;
        if (this.uploadFiles.length !== length) {
          this.uploadFiles = []
          for (let i = 0; i < length; i++) {
            this.uploadFiles.push({
              file: null,
              previewImgUrl: null
            });
          }
        }
        for (let i = 0; i < length; i++) {
          let selectFile = this.$refs.selectFile.files[i];
          this.uploadFiles[i].file = selectFile;

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
              this.uploadFiles[i].previewImgUrl = e.target.result;
            }
            reader.readAsDataURL(selectFile)
          }
          // 이미지 외 파일
          else if (selectFile.size <= limitSize) {
            this.uploadFiles[i].previewImgUrl = require('@/assets/no_thumbnail.png');
          }
          else {
            isError = true;
          }
        }
      }
      else {
        this.uploadFiles = []
      }
      if (isError) {
        alert("파일을 다시 선택해 주세요.")
      }
    },
    removeFile(target) {
      if (this.uploadFiles.length > 0) {
        let targetIndex = this.uploadFiles.findIndex(i => i.file === target)
        this.uploadFiles.splice(targetIndex, 1);
        const dataTransfer = new DataTransfer();
        const files = this.$refs.selectFile.files;
        Array.from(files)
            .filter(file => file !== target)
            .forEach(file => {
              dataTransfer.items.add(file);
            });
        console.log(files)
        this.$refs.selectFile.files = dataTransfer.files;
        this.existingFiles = this.$refs.selectFile.files;
      }
    },

    handleFileSelect(e) {
      if (!e.target.files) return;
      e.preventDefault();

      let files = this.$refs.selectFile.files;
      let existingFiles = this.existingFiles;


      const dataTransfer = new DataTransfer();
      if (existingFiles) {
        Array.from(existingFiles)
            .forEach(existingFile => {
              dataTransfer.items.add(existingFile);
            });
      }

      Array.from(files)
          .forEach(file => {
            dataTransfer.items.add(file);
          });

      this.$refs.selectFile.files = dataTransfer.files;
      this.existingFiles = this.$refs.selectFile.files;

      this.previewFile()
    }
  }
}
</script>

<style scoped>
.no-background-hover::before {
  background-color: transparent !important;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>