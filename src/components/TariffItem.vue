<template>
  <q-card bordered class="q-pa-none q-ma-none fit">
    <q-card-section :class="'bg-' + color" class="text-white">
      <div class="text-h6">{{ name }}</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <!-- <span -->
      <!--   class="" -->
      <!--   :class="expired ? 'bg-negative' : 'bg-positive'" -->
      <!-- > -->
      <!--   <q-icon -->
      <!--     color="white" -->
      <!--     size="20px" -->
      <!--     :name="expired ? 'dangerous' : 'verified'" -->
      <!--   /> -->
      <!-- </span> -->

      <q-item v-for="item in options" :key="item.name">
        <q-item-section avatar>
          <q-icon color="primary" :name="item.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label> {{ item.value }} </q-item-label>
          <q-item-label caption style="word-break: break-word;">{{ item.title }} </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <!-- <q-separator inset /> -->
    <!-- <q-card-actions vertical> -->
    <!--   <q-btn -->
    <!--     class="q-px-md" -->
    <!--     color="deep-orange" -->
    <!--     icon="more_time" -->
    <!--     :label="$t('extendPlanBtn')" -->
    <!--   ></q-btn> -->
    <!-- </q-card-actions> -->
  </q-card>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TariffItem",
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss"></style>
