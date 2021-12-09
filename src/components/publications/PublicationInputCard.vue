<template>
  <div>
    <p>{{this.publicationData.idx}}</p>
    <p>{{this.publicationData.year}}</p>
    <p>{{this.publicationData.header}}</p>
    <p>{{this.publicationData.title}}</p>
    <p>{{this.publicationData.content}}</p>
    <p>{{this.publicationData.link}}</p>
  </div>
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
    year: '',
    headerType: 'arXiv',
    title: '',
    content: '',
    link: ''
  }),
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.isUpdate) {
        this.year = this.publicationData.year;
        this.headerType = this.publicationData.header;
        this.title = this.publicationData.title;
        this.content = this.publicationData.content;
        this.link = this.publicationData.link;
      }
    },
    reset() {
      this.year = '';
      this.headerType = 'arXiv';
      this.title = '';
      this.content = '';
      this.link = '';
    }
  }
}
</script>

<style scoped>

</style>