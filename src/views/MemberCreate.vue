<template>
  <div class="container_m">
    <h1>회원 생성</h1>
  </div>

  <div class="content_n">
    <div class="content_sub shadow-lg">
      <div>
        <p class="text_m">이름</p>
        <input type="text" class="input_n" v-model="name" />
      </div>

      <div>
        <p class="text_m">이메일</p>
        <input type="text" class="input_n" v-model="email" />
      </div>

      <div>
        <p class="text_m">연락처</p>
        <input type="text" class="input_n" v-model="phone" />
      </div>

      <div class="flex-container">
        <label class="text_m">성별 :</label>
        <div class="radio-group">
          <input type="radio" id="male" value="true" v-model="gender" />
          <label for="male" style="margin-left: -7px">남성</label>
          <input type="radio" id="female" value="false" v-model="gender" />
          <label for="female" style="margin-left: -7px">여성</label>
        </div>
      </div>

      <div>
        <p class="text_m">생년월일</p>
        <input type="text" class="input_n" v-model="birthday" />
      </div>

      <div class="mt-5 d-flex justify-content-center gap-4">
        <button class="btn btn-primary w-25 shadow-lg" @click="handleAddClick">
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
let name = ref("");
let email = ref("");
let phone = ref("");
let gender = ref(true);
let birthday = ref("");

function moveToList() {
  router.push({
    name: "HomeView",
  });
}

function handleAddClick() {
  console.log("저장버튼");
  axios
    .post("/api/member/add", {
      name: name.value,
      email: email.value,
      phone: phone.value,
      gender: gender.value,
      birthday: birthday.value,
    })
    .then((response) => {
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
</style>
