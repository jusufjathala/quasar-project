import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { LocalStorage, SessionStorage } from "quasar";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store /*ssrContext*/ }) {
  let key = "token";
  let value = LocalStorage.getItem(key);
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
  Router.beforeEach((to, from, next) => {
    // if (to.meta.requiresAuth && !value) {
    if (to.matched.some((record) => record.meta.requiresAuth) && !value) {
      // return {
      //   path: "/auth",
      //   // save the location we were at to come back later
      //   query: { redirect: to.fullPath },
      // };
      next({ path: "/auth" });
      // next();
    } else {
      if (to == { path: "/auth" } && value) {
        next({ path: "/" });
      }
      next();
    }
  });
  // Router.beforeEach((to, from) => {
  //   // instead of having to check every route record with
  //   // to.matched.some(record => record.meta.requiresAuth)
  //   if (to.meta.requiresAuth && !auth.isLoggedIn()) {
  //     // this route requires auth, check if logged in
  //     // if not, redirect to login page.
  //     return {
  //       path: "/auth",
  //       // save the location we were at to come back later
  //       query: { redirect: to.fullPath },
  //     };
  //   }
  // });

  return Router;
});
