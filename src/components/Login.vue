<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed,defineProps,onMounted,onUnmounted,reactive,ref,watchEffect} from "vue";
import { UserDataStore } from "../stores/UserDataStore";
import { vAutofocus } from "../directives/vAutofocus";
import UserDTO from "../models/user"

const userDataStore = UserDataStore();
const router = useRouter();

const user = new UserDTO();

const props = reactive({user})

 onMounted(() =>   
 console.log("mounted"),
 userDataStore.getUserDetail(userDataStore.$state)
 )
onUnmounted(() => {
  console.log("unmounted");
});
/* Computed Field Check*/
const getComputedRec = ref(5);
const myVal = computed(() => {
  return getComputedRec.value + 10;
});
console.log("recorded value: " + myVal.value);


/* watchEffect Check */
const A0 = ref(0);
const A1 = ref(1);
const A2 = ref();

watchEffect(() => {
  A2.value = A0.value + A1.value;
  console.log(A2.value);
});
A0.value = 2;

const userDetails = computed(() => {
  return userDataStore.$state.data;
});

function handleSubmit(username, passwords) {
  if (userDetails.value.findIndex((x) => x.username == username && x.passwords == passwords) != -1)
  {
    localStorage.setItem('UserLoginId',userDetails.value[0].id)
    localStorage.setItem('UserLoginName',userDetails.value[0].username)
    localStorage.setItem('UserLoginRole',userDetails.value[0].Role)
    router.push({ name: "Dashboard" });    
  }
  else 
    alert("Enter correct username or password");
}
</script>   
<template>
  <div class="parentContainer">
    <va-form
      class="login_form"
      style="width: 300px"
      tag="form"
      @submit.prevent="handleSubmit(props.user.username, props.user.passwords)"
    >
      <h1>Login</h1>
      <va-input
        class="mt-3"
        label="Username"
        v-model="props.user.username"
        required
        v-autofocus
        outline
      />
      <va-input
        class="mt-3"
        type="password"
        label="Password"
        v-model="props.user.passwords"
        outline
        required
      />

      <va-button type="submit" class="mt-3"> Login </va-button>
    </va-form>
  </div>
</template>

<style scoped>

.parentContainer {
  width: 300px;
  height: 300px;
  top: 50%;
  margin: 0 auto;
}
.login_form {
  display: flex;
  flex-direction: column;
  margin: 0;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
.login_form > h1 {
  text-align: center;
}
.active {
  color: green;
}
.default {
  color: red;
}

</style>
