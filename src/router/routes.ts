import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // #region NOT Logged User
  {
    path: "/",
    name: "DefaultLayout",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "LandingView",
        component: () => import("@/views/LandingView.vue"),
      },
      {
        path: "login/",
        name: "LoginView",
        component: () => import("@/views/LoginView.vue"),
      },
      {
        path: "/register",
        name: "RegisterView",
        component: () => import("@/views/RegisterView.vue"),
      },
    ],
  },
  // #endregion
  // #region Logged User
  {
    path: "/app",
    name: "AppDefaultLayout",
    component: () => import("@/layouts/AppDefaultLayout.vue"),
    children: [
      {
        path: "home",
        name: "HomeView",
        component: () => import("@/views/HomeView.vue"),
      },
      {
        path: "calendar",
        name: "CalendarView",
        component: () => import("@/views/CalendarView.vue"),
      },
      {
        path: "discover",
        name: "DiscoverView",
        component: () => import("@/views/DiscoverView.vue"),
      },
      {
        path: "map",
        name: "MapView",
        component: () => import("@/views/MapView.vue"),
      },
      {
        path: "user",
        name: "UserView",
        component: () => import("@/views/UserView.vue"),
      },
    ],
  },
  // #endregion
  // #region Logged User Comes from out
  {
    path: "/app",
    name: "AppDirectLayout",
    component: () => import("@/layouts/AppDirectLayout.vue"),
    children: [
      {
        path: "event-create",
        name: "EventCreateView",
        props: {
          directAccess: {
            headerText: "Etkinlik Oluştur",
          },
        },
        component: () => import("@/views/EventCreateView.vue"),
      },
    ],
  },
  // #endregion
];

export { routes };
