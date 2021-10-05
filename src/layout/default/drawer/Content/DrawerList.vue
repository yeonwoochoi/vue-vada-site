<template>
  <v-list
    dense
    expand
    nav
  >
    <template
      v-for="(item, index) in items"
    >
      <default-list-group
        v-if="item.items"
        :key="`group-${index}`"
        :item="item"
      />
      <default-list-item
        v-else
        :key="`item-${index}`"
        :item="item"
      />
    </template>
  </v-list>
</template>

<script>
import DefaultListItem from './DrawerListItem'
import DefaultListGroup from './DrawerListGroup'

export default {
  name: "DrawerList",
  components: {
    DefaultListGroup,
    DefaultListItem
  },
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style scoped>

</style>