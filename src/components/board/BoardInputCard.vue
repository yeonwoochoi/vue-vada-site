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
        <input type="file" ref="selectFile" @change="previewFile" multiple="multiple">
        <v-row v-if="uploadFiles.length > 0" align="center" justify="start">
          <v-col cols="6" md="3" v-for="(selectFile, index) in uploadFiles" :key="index" class="px-4">
            <p style="display: flex;justify-content: space-between;" class="mb-1 mt-4">
              {{ selectFile.file.name }}
              <v-btn @click="removeFile" class="elevation-0 red--text no-background-hover mr-2" :ripple="false" small style="width: fit-content">X</v-btn>
            </p>
            <img v-if="selectFile.previewImgUrl" :src="selectFile.previewImgUrl" style="max-width: 90%; max-height: 90%"/>
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
    uploadFiles: [],
    isUploading: false,
    response: null
  }),
  mounted() {
    let input = document.querySelector('input');
    input.style.opacity = 0;

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
      console.log("called")
      let isError = false;
      if (this.$refs.selectFile.files.length > 0) {
        let length = this.$refs.selectFile.files.length;
        if (this.uploadFiles.length !== length) {
          this.uploadFiles = []
          for (let i = 0; i < length; i++) {
            console.log(`selectFile ${i} : ${this.$refs.selectFile.files[i]}`)

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

          let limitSize = 1048576 * 20;

          // 이미지 파일
          if (
              ["jpeg", "png", "gif", "bmp"].includes(fileExt) &&
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
            this.uploadFiles[i].previewImgUrl = null;
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
    removeFile(targetIndex) {
      if (this.uploadFiles.length > 0) {
        this.uploadFiles.splice(targetIndex, 1);
      }
    }
  }
}
</script>

<style scoped>
.no-background-hover::before {
  background-color: transparent !important;
}
</style>