import { createRouter, createWebHistory } from "vue-router";
import MemberCreate from "@/views/MemberCreate.vue";
import HomeView from "@/views/HomeView.vue";
import MemberView from "@/views/MemberView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/create",
    name: "MemberCreate",
    component: MemberCreate,
  },
  {
    path: "/view/:id",
    name: "MemberView",
    component: MemberView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
