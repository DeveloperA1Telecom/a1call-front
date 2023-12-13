<template>
  <q-expansion-item class="q-my-md" v-if="isLoaded">
    <template v-slot:header>
      <q-item-section avatar v-if="profile.avatar">
        <q-avatar>
          <img :src="profile.avatar" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ profile.name }}</q-item-label>
        <q-item-label caption lines="1">{{ profile.email }}</q-item-label>
      </q-item-section>
    </template>

    <q-card>
      <q-card-section class="row justify-around">
        <q-btn color="accent" :label="$t('edit')" :href="profile.edit" />
        <q-btn color="negative" :label="$t('logout')" :href="profile.logout" />
      </q-card-section>
    </q-card>
  </q-expansion-item>
  <q-item v-else class="q-my-md">
    <q-item-section avatar>
      <q-skeleton type="QAvatar" />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        <q-skeleton type="text" />
      </q-item-label>
      <q-item-label caption>
        <q-skeleton type="text" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
import { defineComponent, ref, computed} from "vue";

import { profileStore } from "stores/profile.js";
import { useLoaderStore } from "stores/loader.js";

export default defineComponent({
  name: "ProfileExpansion",
  setup() {
    const loader = useLoaderStore();
    const profile = profileStore();
    const isLoaded = computed(() => !loader.isLoading);
    loader.on();
    profile.fetch().finally(loader.off);
    return {
      isLoaded,
      profile,
    };
  },
});
</script>
