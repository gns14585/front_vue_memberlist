<template>
  <div class="search-box">
    <input type="search" v-model="inputText" placeholder="검색어 입력" />
    <button @click="triggerSearch" class="btn btn-info">검색</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import _ from "lodash";
import Swal from "sweetalert2"; // lodash 라이브러리 임포트

const props = defineProps({
  members: Array,
});

const inputText = ref("");

// 검색 로직을 디바운스 함수로 감싸기
const debouncedSearch = _.debounce((newValue) => {
  const findMember = props.members.filter((member) =>
    member.name.toLowerCase().includes(newValue.toLowerCase()),
  );
  if (findMember.length > 0) {
    console.log(findMember);
  } else {
    Swal.fire({
      title: "검색 결과 없음",
      text: "해당 이름을 가진 회원이 없습니다.",
      icon: "info",
    });
  }
});

// 버튼 클릭시 검색 실행
function triggerSearch() {
  debouncedSearch(inputText.value);
}
</script>

<style scoped>
.search-box {
  padding: 10px;
  display: flex;
  justify-content: center;
}

.search-box input {
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px solid gray;
}

.search-box button {
  border-radius: 10px;
  margin-left: 5px;
  font-weight: bold;
}
</style>
