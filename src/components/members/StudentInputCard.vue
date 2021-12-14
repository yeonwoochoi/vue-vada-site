<template>
  <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
    <v-col cols="12">
      <v-card class="elevation-0 px-12 py-12" style="background-color: #F5F5F5; width: 100%">
        <v-container fluid>
          <v-row align="center" justify="start">
            <v-col cols="2" v-if="!isMobile">
              <v-subheader>Rank</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-select
                  v-model="rank"
                  :items="headerItems"
                  :rules="[v => !!v || 'Item is required']"
                  label="Type"
                  required
                  menu-props="auto"
                  :single-line="!isMobile"
              />
            </v-col>
            <v-col cols="2" v-if="!isMobile">
              <v-subheader >Name</v-subheader>
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field
                  v-model="name"
                  ref="name"
                  label="Name"
                  hide-details
                  outlined
                  dense
                  required
                  :rules="[rules.required]"
                  clearable
              />
            </v-col>
            <v-col cols="2" v-if="!isMobile" style="display: flex; align-self: start" class="pt-1">
              <v-subheader>Email</v-subheader>
            </v-col>
            <v-col cols="12" md="9" class="pt-0">
              <v-text-field
                  v-model="email"
                  label="Email"
                  ref="email"
                  hide-details
                  outlined
                  dense
                  required
                  :rules="[rules.required, rules.email]"
                  clearable
              />
            </v-col>
            <v-col cols="2" v-if="!isMobile" class="pt-0">
              <v-subheader>Phone</v-subheader>
            </v-col>
            <v-col cols="12" md="9" class="pt-0">
              <v-text-field
                  v-model="phone"
                  label="Phone"
                  ref="phone"
                  hide-details
                  outlined
                  dense
                  clearable
              />
            </v-col>
            <v-col cols="2" v-if="!isMobile" style="display: flex; align-self: start" class="pt-1">
              <v-subheader>Research Area</v-subheader>
            </v-col>
            <v-col cols="12" md="9" class="pb-0">
              <v-textarea
                  v-model="researchArea"
                  label="ResearchArea"
                  ref="researchArea"
                  rows="6"
                  outlined
                  no-resize
                  auto-grow
                  counter
              />
            </v-col>
            <v-col cols="2" v-if="!isMobile" class="pt-0">
              <v-subheader>Image</v-subheader>
            </v-col>
            <v-col cols="12" md="9" class="pt-0" align="start">
              <input
                  ref="selectedImage"
                  id="input"
                  type="file"
                  name="image"
                  accept="image/*"
                  class="hidden my-6"
                  @change="setImageFile"
              >
              <v-row align="start" justify="start" v-if="previewImgUrl">
                <v-col cols="12">
                  <img :src="previewImgUrl" style="min-height: 128px; max-height: 200px;" alt="student"/>
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
export default {
  name: "StudentInputCard",
  props: {
    studentData: {
      type: Object,
      default: () => {
        return {
          idx: -1,
          rank: "",
          name: "",
          email: "",
          phone: "",
          researchArea: "",
          imgSrc: "",
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
    rank: 'Master Students',
    name: '',
    email: '',
    phone: '',
    researchArea: '',
    imgSrc: '',
    headerItems: [
      'Administrative Assistants',
      'Postdoctoral Students',
      'PhD Students',
      'Master Students',
      'Alumni'
    ],
    isUploading: false,
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
    rules() {
      return {
        required: value => !!value || 'Required.',
        email: value => /.+@.+/.test(value) || 'E-mail must be valid'
      }
    },
    form () {
      return {
        name: this.name,
        email: this.email,
      }
    },
    isValid () {
      let hasError = false;
      Object.keys(this.form).forEach(f => {
        if (!this.$refs[f].validate(true)) {
          hasError = true
        }
        this.$refs[f].validate(true)
      })
      return !hasError
    },
  },
  methods: {
    async fetchData() {
      if (this.isUpdate) {
        this.isUploading = true;

        this.rank = this.studentData.rank;
        this.name = this.studentData.name;
        this.email = this.studentData.email;
        this.phone = this.studentData.phone;
        this.researchArea = this.studentData.researchArea;

        if (this.studentData.imgSrc) {
          let dataTransfer = new DataTransfer();

          await fetch(`http://${this.studentData.imgSrc}`)
              .then(res => res.blob())
              .then(blob => {
                let file = new File([blob], this.studentData.name, {type: 'image/*', lastModified: Date.now()});
                dataTransfer.items.add(file);
              })

          this.$refs.selectedImage.files = dataTransfer.files;
          this.imgSrc = this.$refs.selectedImage.files[0];
          console.log(this.$refs.selectedImage.files[0]);
        }
      }
      this.isUploading = false;
    },
    setImageFile() {
      this.imgSrc = this.$refs.selectedImage.files[0]
    },
    reset() {
      this.rank = 'Master Students';
      this.name = '';
      this.email = '';
      this.phone = '';
      this.researchArea = '';
      this.imgSrc = '';
    },
    save() {
      if (this.isValid) {
        let form = new FormData();
        form.append("id", localStorage.id)
        form.append("idx", this.$route.query.uid)
        form.append("rank", this.rank)
        form.append("name", this.name)
        form.append("email", this.email)
        form.append("phone", this.phone)
        form.append("researchArea", this.researchArea)

        form.append('file', this.$refs.selectedImage.files[0]);

        this.isUploading = true;

        if (this.isUpdate) {
          this.$store.dispatch('member/updateMember', form).then(
              () => {
                this.$router.push('/members');
              },
              (err) => {
                alert(err)
              }
          )
        }
        else {
          this.$store.dispatch('member/registerMember', form).then(
              () => {
                this.$router.push('/members');
              },
              (err) => {
                alert(err)
              }
          )
        }
      }
      else {
        alert("Please input valid name and email value.")
      }
    },
    cancel() {
      this.reset();
      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
      this.$router.push("/members")
    },
    handleImageFileSelect(e) {
      if (!e.target.files) return;
      e.preventDefault();
      this.previewImg();
    },
    previewImg() {
      if (this.$refs.selectedImage.files.length > 0) {
        let selectFile = this.$refs.selectedImage.files[0];
        //this.uploadFiles[i].file = selectFile;

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
        }
      }
      else {
        this.previewImgUrl = null;
      }
    }
  }
}
</script>

<style scoped>
.button-border-grey {
  border: rgb(150, 150, 150) 0.01em solid;
}
</style>