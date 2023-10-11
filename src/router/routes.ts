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
        path: "user-profile",
        name: "UserProfileView",
        component: () => import("@/views/UserProfileView.vue"),
      },
      {
        path: "messages",
        name: "MessagesView",
        component: () => import("@/views/MessagesView.vue"),
      },
      {
        path: "notifications",
        name: "NotificationsView",
        component: () => import("@/views/NotificationsView.vue"),
      },
    ],
  },
  // #endregion
  // #region Logged User Comes from out
  {
    path: "/app",
    name: "AppDirectLayout",
    component: () => import("@/layouts/AppDirectLayout.vue"),
    // To use direcet Acces props in pages, there should be props: ["directAccess"] in the pages
    children: [
      {
        path: "event-detail",
        name: "EventDetailView",
        props: {
          directAccess: {
            headerText: "Etkinlik Detay",
            buttonText: "Etkinliğe Katıl",
          },
        },
        component: () => import("@/views/EventDetailView.vue"),
      },
      {
        path: "event-create",
        name: "EventCreateView",
        props: {
          directAccess: {
            headerText: "Etkinlik Oluştur",
            buttonText: "Oluştur",
          },
        },
        component: () => import("@/views/EventCreateView.vue"),
      },
      {
        path: "messages",
        name: "MessageView",
        props: {
          directAccess: {
            headerText: "Etkinlik Oluştur",
            buttonText: "Oluştur",
          },
        },
        component: () => import("@/views/MessageView.vue"),
      },
    ],
  },
  // #endregion
  {
    name: "test",
    path: "/test",
    component: () => import("@/views/TestView.vue"),
  },
  {
    name: "TestLayout",
    path: "/tests",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        name: "DatabaseUpdate",
        path: "database-update",
        component: () => import("@/tests/DatabaseUpdate.vue"),
      },
    ],
  },
];

export { routes };
