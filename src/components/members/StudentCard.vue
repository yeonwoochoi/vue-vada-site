<template>
  <v-row align="start" justify="start">
    <v-col v-for="(member, index) in memberData" :key="`member-${index}`" cols="12" md="4" lg="3" sm="6" align="start" class="pr-4">
      <v-card class="pa-4 card-flat" flat style="min-width: 300px; height: fit-content;">
        <v-img :src="!member.imgSrc ? errorImg : `http://${member.imgSrc}`" contain aspect-ratio="1" style="min-width: 258px; max-width: 258px;"/>
        <p class="font-weight-medium title mt-4">{{ member.name }}</p>
        <pre class="my-4 content-grey-font">{{ `${member.email}\n${member.phone}` }}</pre>
        <div v-if="member.researchArea" class="mt-4">
          <p class="font-weight-medium subtitle-1">Research Area</p>
          <pre class="my-4 content-grey-font">{{ member.researchArea }}</pre>
        </div>
        <v-icon
            v-if="isAdmin"
            small
            class="ml-4 mb-1"
            @click="editItem(member.idx)"
        >
          mdi-pencil
        </v-icon>
        <v-dialog
            v-if="isAdmin"
            v-model="member.isConfirmOpen"
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
          <confirmation-dialog-card @close="member.isConfirmOpen = false" @onClickOkButton="deleteItem(member.idx)"/>
        </v-dialog>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ConfirmationDialogCard from "@/components/dialog/ConfirmationDialogCard";

export default {
  name: "StudentCard",
  components: {ConfirmationDialogCard},
  props: {
    memberData: {
      type: Array,
      default: () => {
        return [];
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
    getHeaderFontSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 37
        case 'sm':
          return 37
        default:
          return 40
      }
    },
    errorImg() {
      return require("@/assets/no_thumbnail.png");
    },
  },
  methods: {
    editItem(idx){
      this.$router.push({
        path: "/members/input",
        query: {
          uid: idx,
          target: "student"
        }
      })
    },
    deleteItem(idx){
      let params = {
        "id" : localStorage.id,
        "idx" : idx,
      };
      this.$store.dispatch("member/deleteMember", params).then(
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
  font-size: 15px;
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  color: rgba(1, 1, 1, 0.55);
  line-height: 22px;
  letter-spacing: 0mm;
  white-space: pre-wrap;
}
</style>