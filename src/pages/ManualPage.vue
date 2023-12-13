<template>
  <q-page padding class="flex">
    <div class="fit q-gutter-md">
      <div
        class="fit q-gutter-md"
        v-for="manualItem in manual"
        :key="manualItem.title"
      >
        <q-card v-for="item in manualItem.items" :key="item.title">
          <q-video v-if="item.video" :ratio="16 / 9" :src="item.video" />
          <q-card-section>
            <div class="text-h6">
              {{ manualItem.title }}
            </div>
            <div class="text-subtitle2">
              Операционная система: {{ item.title }}
            </div>
          </q-card-section>

          <q-expansion-item
            expand-separator
            header-class="text-info"
            icon="read_more"
            label="Показать текстовое описание"
            v-if="item.text"
          >
            <component :is="getManual(item.text)"></component>
          </q-expansion-item>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import { manualStore } from "stores/manual.js";

export default defineComponent({
  name: "ManualPage",
  setup() {
    const manual = manualStore();
    const getManual = (text) =>
      defineAsyncComponent(() => import(`components/manuals/${text}.vue`));
    return {
      getManual,
      manual,
    };
  },
});
</script>

<style lang="scss"></style>
