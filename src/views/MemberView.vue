<template>
  <div class="container_m">
    <h1>회원 정보</h1>
  </div>
  <div class="content_n">
    <div class="content_sub shadow-lg">
      <div>
        <p class="text_m">이름</p>
        <input type="text" class="input_n" v-model="member.name" readonly />
      </div>

      <div>
        <p class="text_m">이메일</p>
        <input type="text" class="input_n" v-model="member.email" readonly />
      </div>

      <div>
        <p class="text_m">연락처</p>
        <input type="text" class="input_n" v-model="member.phone" readonly />
      </div>

      <div class="flex-container">
        <label class="text_m">성별 :</label>
        <div class="radio-group">
          <input
            type="radio"
            id="male"
            value="true"
            v-model="member.gender"
            disabled
          />
          <label for="male" style="margin-left: -7px">남성</label>
          <input
            type="radio"
            id="female"
            value="false"
            v-model="member.gender"
            disabled
          />
          <label for="female" style="margin-left: -7px">여성</label>
        </div>
      </div>

      <div>
        <p class="text_m">생년월일</p>
        <input type="text" class="input_n" v-model="member.birthday" readonly />
      </div>

      <div class="mt-5 d-flex justify-content-center gap-4">
        <button class="btn btn-primary w-25 shadow-lg" @click="moveToUpdate">
          수정
        </button>
        <button class="btn btn-danger w-25" @click="moveToList">취소</button>
        <button class="btn btn-danger w-25" @click="handleClickDelete">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

const route = useRoute(); // URL, 쿼리매개변수, URL파라미터 등 포함한 정보 가져옴
const router = useRouter(); // 페이지 전환 또는 히스토리 조작용
const member = ref({
  name: "",
  email: "",
  phone: "",
  gender: true,
  birthday: "",
});

// ---------------- 상세 회원 정보 가져오기 ----------------
onMounted(async () => {
  const memberId = route.params.id;
  try {
    const response = await axios.get(`/api/member/${memberId}`);
    member.value = response.data;
  } catch (error) {
    console.error("회원 정보를 불러오는 중 오류가 발생했습니다.");
  }
});

// ---------------- 취소 클릭시 회원리스트로 이동 ----------------
function moveToList() {
  router.push({
    name: "HomeView",
  });
}

function moveToUpdate() {
  router.push({
    name: "MemberUpdate",
  });
}

// ---------------- 삭제 클릭시 회원정보 삭제 ----------------
function handleClickDelete() {
  Swal.fire({
    title: "정말로 삭제하시겠습니까?",
    text: "삭제하면 되돌릴 수 없습니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "네.",
    cancelButtonText: "아니요.",
  }).then((res) => {
    if (res.isConfirmed) {
      axios
        .delete(`/api/member/delete/${member.value.id}`)
        .then(() => {
          Swal.fire({
            title: "삭제 완료",
            text: "회원 정보가 삭제되었습니다.",
            icon: "success",
          });
          router.push({
            name: "HomeView",
          });
        })
        .catch(() => {
          Swal.fire({
            title: "오류",
            text: "회원 정보를 삭제하는 과정에서 오류가 발생하였습니다.",
            icon: "error",
          });
        });
    }
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
  padding: 10px;
}
</style>
