import { createRouter, createWebHistory } from "vue-router";
import MemberCreate from "@/views/MemberCreate.vue";
import HomeView from "@/views/HomeView.vue";
import MemberView from "@/views/MemberView.vue";
import MemberUpdate from "@/views/MemberUpdate.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView, // 홈으로 이동
  },
  {
    path: "/create",
    name: "MemberCreate",
    component: MemberCreate, // 멤버 생성 페이지
  },
  {
    path: "/view/:id",
    name: "MemberView",
    component: MemberView, // 멤버 상세 페이지
  },
  {
    path: "/view/:id/update",
    name: "MemberUpdate",
    component: MemberUpdate, // 멤버 수정 페이지
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
