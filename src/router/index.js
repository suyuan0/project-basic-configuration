import Vue from "vue";
import VueRouter from "vue-router";
import Login from "view/user/Login.vue";
import HomeLayout from "lay/HomeLayout.vue";
import store from "store";
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "HomeLayout",
    redirect: "/welcome",
    component: HomeLayout,
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: () => import("view/other/welcome.vue"),
      },
      {
        path: "/users",
        name: "users",
        component: () => import("view/user/list"),
      },
      {
        path: "/roles",
        name: "roles",
        component: () => import("view/rights/roleList"),
      },
      {
        path: "*",
        name: "404",
        component: () => import("view/other/404.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // 如果是登录页，并且有token，那么久进去首页
  if (to.name === "login" && store.getters.getToken) {
    return next({ name: "HomeLayout" });
  }
  // 如果不是登录页，并且没有token，就进入登录页
  if (to.name !== "login" && !store.getters.getToken) {
    return next({ name: "login" });
  }
  next();
});

export default router;
