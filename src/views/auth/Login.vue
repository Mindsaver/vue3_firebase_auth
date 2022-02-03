<template>
  <div class="row justify-content-md-center">
    <div class="card col-md-5">
      <div class="card-body">
        <h5 class="card-title">Login</h5>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="email"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="password"
          />
        </div>
        <div class="mb-3">
          <button
            type="submit"
            :disabled="isLoading"
            class="btn btn-primary"
            @click="login"
          >
            Login
          </button>
        </div>
        <div class="mb-3">
          <button
            class="btn btn-outline-primary"
            type="submit"
            @click="loginGoogle"
          >
            <i class="bi bi-google"></i>
          </button>
        </div>

        <div class="mb-3">
          <div class="alert alert-danger" v-if="errMsg" role="alert">
            {{ errMsg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const auth = getAuth();
const router = useRouter();
const isLoading = ref(false);
const email = ref("");
const password = ref("");
const errMsg = ref("");
const login = async () => {
  isLoading.value = true;
  await signInWithEmailAndPassword(auth, email.value, password.value)
    .then((user) => {
      isLoading.value = false;
      router.push("/");
    })
    .catch((error) => {
      isLoading.value = false;
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};
const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(() => {
    console.log("User signed in");
    router.push("/");
  }).catch((error) => {
      isLoading.value = false;
      console.log(error);
      switch (error.code) {
        default:
          errMsg.value = "There was a problem loggin in";
          break;
      }
    });
};
</script>
