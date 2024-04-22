<template>
  <div>
    <h1>회원정보</h1>
    <div v-if="member">
      <p><strong>이름:</strong> {{ member.name }}</p>
      <p><strong>이메일:</strong> {{ member.email }}</p>
      <p><strong>연락처:</strong> {{ member.phone }}</p>
      <p><strong>성별:</strong> {{ member.gender ? "남성" : "여성" }}</p>
      <p><strong>생년월일:</strong> {{ member.birthday }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const member = ref(null);

onMounted(async () => {
  const memberId = route.params.id;
  try {
    const response = await axios.get(`/api/member/${memberId}`);
    member.value = response.data;
  } catch (error) {
    console.error("회원 정보를 불러오는 중 오류가 발생했습니다.");
  }
});
</script>

<style lang="scss" scoped></style>
