<template>
  <div class="container_m">
    <h1>회원 생성</h1>
  </div>

  <div class="content_n">
    <div class="content_sub shadow-lg">
      <div>
        <p class="text_m">이름</p>
        <input type="text" class="input_n" v-model="member.name" />
        <p v-if="!member.name" class="alert-text">이름을 입력해야 합니다.</p>
      </div>

      <div>
        <p class="text_m">이메일</p>
        <input type="text" class="input_n" v-model="member.email" />
        <p v-if="!member.email" class="alert-text">이메일을 입력해야 합니다.</p>
      </div>

      <div>
        <p class="text_m">연락처</p>
        <input type="text" class="input_n" v-model="member.phone" />
        <p v-if="!member.phone" class="alert-text">연락처를 입력해야 합니다.</p>
      </div>

      <div class="flex-container">
        <label class="text_m">성별 :</label>
        <div class="radio-group">
          <input type="radio" id="male" value="true" v-model="member.gender" />
          <label for="male" style="margin-left: -7px">남성</label>
          <input
            type="radio"
            id="female"
            value="false"
            v-model="member.gender"
          />
          <label for="female" style="margin-left: -7px">여성</label>
        </div>
      </div>

      <div>
        <p class="text_m">생년월일</p>
        <input type="text" class="input_n" v-model="member.birthday" />
      </div>

      <div class="mt-5 d-flex justify-content-center gap-4">
        <button
          class="btn btn-primary w-25 shadow-lg"
          @click="handleAddClick"
          :disabled="!member.name || !member.email || !member.phone"
        >
          저장
        </button>
        <button class="btn btn-danger w-25" @click="moveToList">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import axios from "axios";
import { ref } from "vue";
import Swal from "sweetalert2";

const router = useRouter();
const member = ref({
  name: "",
  email: "",
  phone: "",
  gender: true,
  birthday: "",
});

function moveToList() {
  router.push({
    name: "HomeView",
  });
}

function handleAddClick() {
  if (member.name === "") {
    console.log("사용자 이름을 입력해주세요");
    return;
  }
  axios
    .post("/api/member/add", member.value)
    .then(() => {
      Swal.fire("회원이 생성되었습니다.");
      moveToList();
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "문제가 발생하였습니다.",
        text: "잠시 후 다시 시도해주시기 바랍니다.",
      });
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
.content_n {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content_sub {
  width: 500px;
  padding: 40px;
}

.text_m {
  margin-top: 25px;
  margin-bottom: 5px;
  font-weight: bold;
  color: black;
}

.flex-container {
  display: flex;
  align-items: center;
}

.radio-group {
  width: 50%;
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
  gap: 10px;
}

.input_n {
  width: 100%;
  border-radius: 10px;
  border: 1px solid #eee;
  padding: 5px;
}

.alert-text {
  color: red;
  font-size: 0.8em;
}
</style>
