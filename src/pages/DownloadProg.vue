<template>
  <q-page padding class="flex">
    <div class="fit">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-icon flat round dense size="sm" name="download" />
        <q-toolbar-title
          >Скачайте приложения для компьютеров и ноутбуков</q-toolbar-title
        >
      </q-toolbar>
      <q-list bordered>
        <q-item
          v-for="item in download.desktop"
          :key="item.title"
          class="q-my-sm"
          clickable
          v-ripple
          :href="item.link"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon :name="item.iconDownload" color="green" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-icon flat round dense size="sm" name="download" />
        <q-toolbar-title
          >Скачайте приложения для телефонов и планшетов</q-toolbar-title
        >
      </q-toolbar>
      <q-list bordered>
        <q-item
          v-for="item in download.mobile"
          :key="item.title"
          class="q-my-sm"
          clickable
          v-ripple
          :href="item.link"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon :name="item.iconDownload" color="green" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-icon flat round dense size="sm" name="download" />
        <q-toolbar-title
          >Установите в Linux-дистрибутивы и другие ОС</q-toolbar-title
        >
      </q-toolbar>
      <q-list bordered>
        <q-item
          v-for="item in download.linux"
          :key="item.title"
          class="q-my-sm"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label overline>{{ item.title }}</q-item-label>
            <q-banner class="bg-grey-3">
              {{ item.cmd }}
            </q-banner>
          </q-item-section>

          <q-item-section side>
            <q-icon :name="item.iconDownload" color="green" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { downloadStore } from "stores/download.js";

export default defineComponent({
  name: "DownloadProg",
  setup() {
    const download = downloadStore();
    return {
      download,
    };
  },
});
</script>

<style lang="scss"></style>
