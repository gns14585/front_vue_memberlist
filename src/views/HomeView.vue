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
    <table class="table container">
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
        <tr v-for="row in members" :key="members.id">
          <th>{{ row.id }}</th>
          <td>{{ row.name }}</td>
          <td>{{ row.email }}</td>
          <td>{{ row.phone }}</td>
          <td>{{ row.gender ? "남성" : "여성" }}</td>
          <td>{{ row.birthday }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";

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
</script>

<style scoped>
.container_m {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button_m {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
