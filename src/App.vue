<template>
  <div>
    <div class="container">
      <Navbar />
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb" class="bg-light rounded-3 p-3 mb-4">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item"><a href="#">User</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                User Profile
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <router-view> </router-view>
    </div>
  </div>
</template>

<script setup>
console.log("APP.vue: setup call");
import Navbar from "./components/Navbar.vue";
</script>
