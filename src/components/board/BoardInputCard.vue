<template>
  <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
    <v-card class="elevation-0 px-12 py-12" style="background-color: #F5F5F5; width: 100%">
      <v-card-title class="px-0 pt-0 pb-8" style="">
        <v-text-field
            v-model="title"
            hide-details
            outlined
            dense
        />
        <v-checkbox
            class="pl-4"
            v-model="isNotice"
            v-if="isAdmin && !isNews"
            label="공지사항"
        >
          isAdmin
        </v-checkbox>
      </v-card-title>
      <vue-editor v-model="content" :editorToolbar="customToolbar" />
      <form @submit.prevent="save" method="post" class="mt-8 mb-6" enctype="multipart/form-data">
        <input type="file" name="files" ref="selectFile" multiple="multiple">
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
      <div style="display: flex; width: 100%; justify-content: end">
        <v-btn large :disabled="isUploading" @click="save" class="mr-4 font-weight-bold elevation-0 button-border-grey" outlined>저장</v-btn>
        <v-btn large :disabled="isUploading" @click="cancel" class="font-weight-bold elevation-0 button-border-grey" outlined>취소</v-btn>
      </div>
    </v-card>
  </v-row>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "BoardInputCard",
  components: {VueEditor},
  props: {
    // news 는 모두 공지사항이기 때문에.. 이거 외에는 다 공지사항일수도 있고 아닐수도 있음
    isNews: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    path: {
      type: String,
      default: () => {
        return ''
      }
    },
    tableContent: {
      type: Object,
      default: () => {
        return {
          no: 1,
          title: 'Title',
          content: 'Content',
          author: 'user01',
          created_at: '2020-11-11',
          view_count: 0,
          comments: [
            {
              'author': 'user21',
              'content': 'Comment',
              'created_at': '2021-11-01',
            },
          ],
          attach: '',
          importance: false
        }
      }
    },
    isAdmin: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data: () => ({
    title: '',
    content: '',
    isNotice: false,
    isUpdate: false,
    existingFiles: null,
    uploadFiles: [],
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
    this.$refs.selectFile.addEventListener('change', this.handleFileSelect, false)
    this.init();
  },
  methods: {
    async init () {
      this.isUpdate = this.$route.query.uid !== undefined
      if (this.isUpdate) {
        this.title = this.tableContent.title;
        this.content = this.tableContent.content;
        this.isNotice = this.tableContent.importance

        if (this.tableContent.attach) {
          this.existingFiles = this.$refs.selectFile.files;
          let dataTransfer = new DataTransfer();
          for (let i = 0; i < this.tableContent.attach.length; i++) {
            await fetch(`http://${this.tableContent.attach[i].link}`)
                .then(res => res.blob())
                .then(blob => {
                  let file = new File([blob], this.tableContent.attach[i].name, {type: '', lastModified: Date.now()});
                  dataTransfer.items.add(file);
                })
          }
          this.$refs.selectFile.files = dataTransfer.files;
          this.existingFiles = this.$refs.selectFile.files;
          this.previewFile()
        }

        this.isUploading = false;
      }
    },
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
        if (this.isNews) {
          this.isNotice = false
        }
        form.append("importance", this.isNotice)
        if (this.isUpdate) {
          form.append("idx", this.$route.query.uid)
        }
        let files = this.$refs.selectFile.files;
        for(let i = 0; i < files.length; i++) {
          let file = files[i];
          form.append('files', file);
        }

        this.isUploading = true;

        //TODO: seminar news 만 할거 아니니까 정확히 set 하기
        if (this.isUpdate) {
          if (this.path.includes('seminar')) {
            this.$store.dispatch('board/updateSeminarContent', form).then(
                () => {
                  this.$router.push(`/${this.path}`);
                },
                (err) => {
                  alert(err)
                  this.$router.push(`/${this.path}`);
                }
            )
          }
          else if (this.path.includes('news')) {
            this.$store.dispatch('news/updateNewsContent', form).then(
                () => {
                  this.$router.push(`/${this.path}`);
                },
                (err) => {
                  alert(err)
                  this.$router.push(`/${this.path}`);
                }
            )
          }
        }
        else {
          if (this.path.includes('seminar')) {
            this.$store.dispatch('board/registerSeminarContent', form).then(
                () => {
                  this.$router.push(`/${this.path}`);
                },
                (err) => {
                  alert(err)
                }
            )
          }
          else if (this.path.includes('news')) {
            this.$store.dispatch('news/registerNewsContent', form).then(
                () => {
                  this.$router.push(`/${this.path}`);
                },
                (err) => {
                  alert(err)
                }
            )
          }
        }
      }
    },
    reset () {
      this.title = '';
      this.content = '';
      this.existingFiles = null;
      this.uploadFiles = [];
      this.isUploading = false;
    },
    cancel () {
      this.reset();
      this.$router.push(`/${this.path}`)
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
        this.$refs.selectFile.files = dataTransfer.files;
        this.existingFiles = this.$refs.selectFile.files;
      }
    },

    // 아마도 selectFile 에 들어있는 file이 추가되거나 삭제될때 호출되는 event 함수
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

.button-border-grey {
  border: rgb(200, 200, 200) 0.01em solid;
}
</style>