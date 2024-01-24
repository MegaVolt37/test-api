<template>
  <input class="app-input" v-bind="props" v-model="valueField" />
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    default: "",
  },
  id: {
    type: String || Number,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String || Number,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);
const valueField = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>

<style lang="scss" scoped>
.app-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
