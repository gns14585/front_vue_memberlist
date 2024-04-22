<template>
  <div class="search-box">
    <input type="search" v-model="inputText" placeholder="이름 입력" />
    <button @click="searchMembers">검색</button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Swal from "sweetalert2";

const props = defineProps({
  members: Array,
});

const inputText = ref("");

watch(inputText, (newValue, oldValue) => {
  const findMember = props.members.filter((member) => {
    return member.name.include(newValue);
  });
  console.log(findMember);
});
</script>

<style scoped>
.search-box {
  padding: 10px;
  display: flex;
  justify-content: center;
}

.search-box input {
  padding: 5px 10px;
}

.search-box button {
  margin: 0;
}
</style>
