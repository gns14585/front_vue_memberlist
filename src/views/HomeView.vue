<template>
  <div class="main_container">
    <div class="sub_container">
      <div class="container_m">
        <h1>회원 목록</h1>
      </div>
      <div class="button_container">
        <div class="button_container2">
          <button class="btn btn-primary mt-5 button_m" @click="moveToCreate">
            생성자 추가
          </button>
        </div>
      </div>
      <table class="table table-hover container hover_m">
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">이름</th>
            <th scope="col">이메일</th>
            <th scope="col">연락처</th>
            <th scope="col">성별</th>
            <th scope="col">생년월일</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="row in paginatedMembers"
            :key="members.id"
            @click="viewMember(row.id)"
          >
            <th>{{ row.id }}</th>
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.phone }}</td>
            <td>{{ row.gender ? "남성" : "여성" }}</td>
            <td>{{ row.birthday }}</td>
          </tr>
        </tbody>
      </table>

      <SearchBarComponent :members="members" />

      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)">
              이전
            </button>
          </li>
          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="changePage(page)">
              {{ page }}
            </button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <button class="page-link" @click="changePage(currentPage + 1)">
              다음
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";
import MemberView from "@/views/MemberView.vue";
import SearchBarComponent from "@/components/SearchBarComponent.vue";
import { computed } from "vue";

const router = useRouter();
const members = ref([]);

onMounted(async () => {
  const response = await axios.get("/api/member/list");
  members.value = response.data;
});

function moveToCreate() {
  router.push({
    name: "MemberCreate",
  });
}

function viewMember(memberId) {
  router.push({
    name: "MemberView",
    params: {
      id: memberId,
    },
  });
}

// ----------------------- 페이징 -----------------------
// 컴포넌트 파일로 분리시키려고 했지만 무슨이유에서인지 자꾸 오류발생
const currentPage = ref(1); // 현재 페이지
const pageSize = 5; // 페이지 당 항목 수

const totalPages = computed(() => {
  return Math.ceil(members.value.length / pageSize);
});

// 현재 페이지에 맞는 멤버 데이터를 계산합니다.
const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return members.value.slice(start, end);
});

// 페이지 번호를 변경하는 함수
function changePage(page) {
  if (page < 1 || page > totalPages.value) {
    return;
  }
  currentPage.value = page;
}
</script>

<style scoped>
.main_container {
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sub_container {
  width: 80%;
}
.container_m {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hover_m {
  border: 1px solid #eee;
}

.hover_m:hover {
  cursor: pointer;
}

.button_container {
  display: flex;
  justify-content: start;
  align-items: center;
}

.button_container2 {
  margin-bottom: 20px;
}

.button_m {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
