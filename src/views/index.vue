<template>
  <div class="page-home">
    <ul class="page-home__tabs">
      <li
        class="page-home__tab"
        v-for="tab in tabs"
        :key="tab.id"
        @click="aciveTab = tab.id"
      >
        {{ tab.name }}
      </li>
    </ul>
    <AppList
      class="page-home__app-list"
      :url="dataActiveTab?.url"
      :fields="dataActiveTab?.fields"
    />
  </div>
</template>

<script setup>
import AppList from "@/components/App/AppList.vue";
import { ref, computed } from "vue";
const tabs = [
  {
    id: 1,
    name: "Users",
    url: "users",
    fields: [
      { key: "id", title: "id" },
      { key: "firstName", title: "firstName" },
      { key: "lastName", title: "lastName" },
      { key: "email", title: "email" },
    ],
  },
  {
    id: 2,
    name: "Posts",
    url: "posts",
    fields: [
      { key: "id", title: "id" },
      { key: "title", title: "title" },
      { key: "userId", title: "userId" },
    ],
  },
];
const aciveTab = ref(1);
const dataActiveTab = computed(() => {
  return tabs.find((tab) => tab.id === aciveTab.value);
});
</script>

<style lang="scss" scoped>
.page-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 50px;
  display: flex;
  &__tabs {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__tab {
    font-size: 20px;
    cursor: pointer;
  }
  &__app-list {
    margin: 0 auto;
  }
}
</style>
