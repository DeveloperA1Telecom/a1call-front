import { route } from "quasar/wrappers";

import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import routes from "./routes";
import { api } from "boot/axios";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeResolve(async (to, from, next) => {
    // console.log({ groups: to.meta.groups });
    const isAccess = await api
      .post("/auth.php", { groups: to.meta.groups })
      .then((res) => {
        // console.log("Router.beforeEach auth then res: ", res);
        const resData = res?.data || null;
        // console.log("Router.beforeEach auth then resData: ", resData);
        // console.log(
        //   "Router.beforeEach auth then resData.access: ",
        //   resData?.access
        // );
        const isBoolean = (val) => "boolean" === typeof val;
        if (!resData || !isBoolean(resData?.access)) {
          const msg = "[ Router auth.php ] Ошибка получения данных с сервера";
          // console.log(msg);
          return Promise.reject(msg);
        }
        if (
          !resData.access &&
          // ❗️ Avoid an infinite redirect
          to.name !== resData.toName
        ) {
          // redirect the user to the login page
          return { access: false, redirect: resData.toName };
        } else if (resData.access) {
          return { access: true };
        }
      })
      .catch((err) => {
        // console.log("manager catch: ", err.message);
        if (
          // ❗️ Avoid an infinite redirect
          to.name !== "main"
        ) {
          // redirect the user to the login page
          return { access: false, redirect: "main" };
        }
      });
    // console.log("isAccess: ", isAccess);
    if (isAccess?.access) {
      // console.log("isAccess: next()");
      next();
    } else {
      const obj = { name: isAccess?.redirect };
      // console.log("isAccess: next()", obj);
      next(obj);
    }
  });

  return Router;
});
