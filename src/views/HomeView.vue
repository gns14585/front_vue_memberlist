<template>
  <div>
    <div class="container_m">
      <h1>회원 목록</h1>
    </div>
    <div class="button_m">
      <button class="btn btn-primary mt-5" @click="moveToCreate">
        생성자 추가
      </button>
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
          v-for="row in members"
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
    <SearchBar :members="members" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";
import MemberView from "@/views/MemberView.vue";
import SearchBar from "@/components/SearchBar.vue";

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
</script>

<style scoped>
.container_m {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hover_m:hover {
  cursor: pointer;
}

.button_m {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
