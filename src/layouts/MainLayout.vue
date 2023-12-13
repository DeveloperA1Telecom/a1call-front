<template>
  <q-layout view="hHh Lpr fFf" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          {{ $t("title") }}
        </q-toolbar-title>
        <q-toggle
          color="dark"
          v-model="isDark"
          checked-icon="dark_mode"
          unchecked-icon="light_mode"
          :label="$t('darkMode')"
        />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-scroll-area style="height: calc(100%); border-right: 1px solid #ddd">
        <profile-expansion />
        <q-list paddig>
          <BalanceLink />
          <template v-for="link in essentialLinks" :key="link.title">
            <EssentialLink
              v-if="userGroups.some((r) => link.groups.indexOf(r) >= 0)"
              v-bind="link"
            />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, watch, computed } from "vue";
import { api } from "boot/axios";

import BalanceLink from "components/BalanceLink.vue";
import EssentialLink from "components/EssentialLink.vue";
import ProfileExpansion from "components/ProfileExpansion.vue";

const linksList = [

  {
    title: "Текущий тарифный план",
    caption: "",
    icon: "verified",
    link: "/",
    groups: ["Users", "Administrator"],
  },
  {
    title: "Новый тарифый план",
    caption: "Выбрать новый тарифный план",
    icon: "add_moderator",
    link: "/new-tariff",
    groups: ["Users", "Administrator"],
  },
  {
    title: "Скачать клиент",
    caption: "Скачайте приложения для ваших устройств",
    icon: "download",
    link: "/download",
    groups: ["Users", "Administrator"],
  },
  {
    title: "Инструкции",
    caption: "установка и настройка приложений на ваших устройствах",
    icon: "checklist_rtl",
    link: "/manual",
    groups: ["Users", "Administrator"],
  },
  {
    title: "Панель менеджера",
    caption: "Проверка транзакций пользователей",
    icon: "admin_panel_settings",
    link: "/manager-panel",
    groups: ["Managers", "Administrator"],
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    ProfileExpansion,
    BalanceLink
},

  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const isDark = ref($q.dark.isActive);
    watch(isDark, (v) => {
      $q.dark.set(v);
    });

    const userGroups = ref([]);
    api
      .get("/auth.php")
      .then((res) => {
        // console.log("MainLayout then raw res: ", res);
        userGroups.value = res?.data || [];
        // console.log("MainLayout userGroups: ", userGroups.value);
        // console.log(
        //   "Router.beforeEach auth then resData.access: ",
        //   resData?.access
        // );
      })
      .catch((err) => {
        console.log("MainLayout catch: ", err.message);
      });

    return {
      userGroups,
      essentialLinks: linksList,
      isDark,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  data() {
    return {};
  },
});
</script>
