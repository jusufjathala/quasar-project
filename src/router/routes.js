const routes = [
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: () => import("pages/HomePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "help",
        component: () => import("pages/HelpPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "users",
        component: () => import("pages/UsersPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "android",
        component: () => import("pages/AndroidPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "ios",
        component: () => import("pages/IosPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "desktop",
        component: () => import("pages/DesktopPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "perusahaan",
        component: () => import("pages/PerusahaanPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];
// routes.beforeEach((to, from) => {
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

export default routes;
