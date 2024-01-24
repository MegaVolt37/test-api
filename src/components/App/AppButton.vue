<template>
  <component :is="to ? 'router-link' : 'button'" class="app-button" v-bind="props">
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    default: "",
  },
  to: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.app-button {
  cursor: pointer;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
