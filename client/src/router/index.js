import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import { store } from "../store/index";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../components/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated !== false) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/map",
    name: "Map",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "map" */ "../components/Map.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated === false) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/profile",
    name: "Profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "map" */ "../components/Profile.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
