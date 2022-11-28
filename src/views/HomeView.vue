<script setup>
import Login from "../components/Login.vue";
import headers from "../components/headers.vue";
</script>

<template>
  <headers>
    <header>
      <Transition>
      <h1>Todo</h1>
      </Transition>
    </header>
  </headers>
  <Login> </Login>
</template>

<style scoped>
header {
  /* position: fixed; */
  background: #154EC1;
  width: 100%;
  height: 7vh;
  border: 1px solid #ccc;
}
header h1 {
  text-align: center;
  color: white;
  line-height: 60px;
}
</style>