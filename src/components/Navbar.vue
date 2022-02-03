<template>
  <div>
    <div
      class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom"
    >
      <router-link
        to="/"
        class="d-flex align-items-center text-dark text-decoration-none"
        ><span class="fs-4">Test</span></router-link
      >

      <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto" v-if="loggedIn">
        <router-link to="/notes" class="me-3 py-2 text-dark text-decoration-none"
          >Notes</router-link
        >
        <!--  <router-link to="/profile" class="me-3 py-2 text-dark text-decoration-none">Profile</router-link>-->
        <a
          class="me-3 py-2 text-dark text-decoration-none"
          href="#"
          @click="handleSignOut"
          >Logout</a
        >
        <router-link
          to="/profile"
          class="me-3 py-2 text-dark text-decoration-none"
        >
          {{ user?.email }}
          <img
            :src="user?.photoURL"
            class="img-fluid"
            style="height: 20px"
            alt="profileImage"
            v-if="user?.photoURL != null"
          />
        </router-link>
      </nav>
      <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto" v-if="!loggedIn">
        <router-link
          to="/login"
          class="me-3 py-2 text-dark text-decoration-none"
          >Login</router-link
        >
        <router-link
          to="/register"
          class="me-3 py-2 text-dark text-decoration-none"
          >Register</router-link
        >
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const user = computed(() => store.getters["user/user"]);
const loggedIn = computed(() => store.getters["user/loggedIn"]);

const router = useRouter();
let auth = getAuth();

onMounted(() => {});
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>
