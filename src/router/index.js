import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/user/Login.vue";
import HomeLayout from "../layout/HomeLayout.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "HomeLayout",
    component: HomeLayout,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
