import { createRouter, createWebHistory } from "vue-router";
import MemberCreate from "@/views/MemberCreate.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/", // 메인 페이지, 아마 회원 목록을 표시
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/create", // 생성자 추가 페이지
    name: "MemberCreate",
    component: MemberCreate,
  },
  // 기타 경로...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
