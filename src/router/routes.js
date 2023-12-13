const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "main",
        path: "/",
        meta: { groups: ["Users"] },
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/balance",
        meta: { groups: ["Users"] },
        component: () => import("pages/BalancePage.vue"),
      },
      {
        path: "/new-tariff",
        meta: { groups: ["Users"] },
        component: () => import("pages/SelectTariff.vue"),
      },
      {
        path: "/download",
        meta: { groups: ["Users"] },
        component: () => import("pages/DownloadProg.vue"),
      },
      {
        path: "/manual",
        meta: { groups: ["Users"] },
        component: () => import("pages/ManualPage.vue"),
      },
      {
        name: "manager",
        meta: { groups: ["Managers"] },
        path: "/manager-panel",
        component: () => import("pages/ManagerPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
]

// if (process.env.KW_DEBUG) {
//   routes[0].children.push({});
// }
export default routes
