<template>
  <section class="bg-light">
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-4">
            <div class="card-body text-center">
              <img
                :src="user?.photoURL"
                alt="avatar"
                class="rounded-circle img-fluid"
                style="width: 150px"
                v-if="user?.photoURL != null"
              />
              <h5 class="my-3">{{ displayName }}</h5>
              <!-- <p class="text-muted mb-1">Full Stack Developer</p>
              <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>-->
              <div class="d-flex justify-content-center mb-2" v-if="isPasswordUsed">
                <button type="button" class="btn btn-primary" @click="changePassword">
                  Change Password
                </button>
               <!--   <button
                  type="button"
                  class="btn btn-outline-primary ms-1"
                  @click="test"
                >
                  Test
                </button>-->
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Username</p>
                </div>
                <div class="col-sm-9" v-if="editName">
                  <div class="input-group w-50">
                    <input
                      type="text"
                      class="form-control"
                      aria-label=""
                      aria-describedby="basic-addon1"
                      v-model="username"
                    />
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      @click="saveUsername"
                    >
                      <i class="bi bi-check"></i>
                    </span>
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      @click="disableUsernameEdit"
                    >
                      <i class="bi bi-x"></i>
                    </span>
                  </div>
                </div>
                <div class="col-sm-9" v-if="!editName">
                  <p class="text-muted mb-0">
                    {{ user?.displayName }}
                    <a class="btn" @click="enableUsernameEdit"
                      ><i class="bi bi-gear"></i
                    ></a>
                  </p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ user?.email }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import { useStore } from "vuex";
const store = useStore();
const user = computed(() => store.getters["user/user"]);
const displayName = computed(() => store.getters["user/username"]);
const isPasswordUsed= computed(() => store.getters["user/isPasswordUsed"]);
const editName = ref(false);
const username = ref("test");
const swal = inject("$swal");
const auth = getAuth();

const changePassword = async () => {
  await sendPasswordResetEmail(auth, store.getters["user/email"])
    .then(() => {
      swal({
        icon: "success",
        title: "Password reset email send, take a look in your emails inbox",
        showConfirmButton: true,
        timer: 10000,
      });
      //   router.push('/')
    })
    .catch((error) => {
      console.log(error);
      var errMsg = "";
      switch (error.code) {
        case "auth/invalid-email":
          errMsg = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg = "Incorrect password";
          break;
        default:
          errMsg = "Email or password was incorrect";
          break;
      }
      swal({
        icon: "error",
        title: errMsg,
        showConfirmButton: false,
        timer: 1500,
      });
    });
};

const disableUsernameEdit = async () => {
  editName.value = false;
};

const enableUsernameEdit = async () => {
  console.log("-------USER-----");
  console.log(user.value);
  editName.value = true;
  username.value = getAuth().currentUser.displayName;
  console.log();
};

const saveUsername = async () => {
  updateProfile(getAuth().currentUser, { displayName: username.value }).then(
    () => {
      store.commit("user/setUser", getAuth().currentUser);
      swal({
        icon: "success",
        title: "Username changed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
  editName.value = false;
  console.log(username.value);
};
</script>
