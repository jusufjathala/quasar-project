const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/HomePage.vue") },
      { path: "help", component: () => import("pages/HelpPage.vue") },
      { path: "users", component: () => import("pages/UsersPage.vue") },
      { path: "android", component: () => import("pages/AndroidPage.vue") },
      { path: "ios", component: () => import("pages/IosPage.vue") },
      { path: "desktop", component: () => import("pages/DesktopPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
