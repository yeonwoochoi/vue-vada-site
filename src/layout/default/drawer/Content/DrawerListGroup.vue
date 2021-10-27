<template>
  <v-list-group
    :prepend-icon="item.icon"
    eager
    v-bind="$attrs"
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </template>
    <template v-for="(child, i) in item.items">
      <default-list-group
        v-if="child.items"
        :key="`sub-group-${i}`"
        :item="child"
      />
      <default-list-item
        v-else
        class="pl-6"
        :key="`child-${i}`"
        :item="child"
      />
    </template>
  </v-list-group>
</template>

<script>
import DefaultListItem from './DrawerListItem'
export default {
  name: "DrawerListGroup",
  components: {
    DefaultListItem
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>

</style>