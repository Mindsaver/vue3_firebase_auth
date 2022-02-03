<template>
    <div class="row justify-content-md-center">
        <div class="card col-md-5">
            <div class="card-body">
                <h5 class="card-title">Login</h5>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Reset Password</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        v-model="email">
                </div>
                <div class="mb-3">
                <button type="submit" :disabled="isLoading" class="btn btn-primary" @click="login">Reset Password</button>
                </div>
                <div class="mb-3">
                 <div class="alert alert-danger" v-if="errMsg" role="alert">
                    {{errMsg}}
                </div>
                 </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

    const auth = getAuth()
    const router = useRouter()
    const isLoading = ref(false)
    const email = ref('')
    const errMsg = ref('')
    const login = async () => {
            isLoading.value = true
            await sendPasswordResetEmail(auth, email.value)
                .then(() => {
                    isLoading.value = false;
                    alert("PasswordReset Send")
                 //   router.push('/')
                })
                .catch((error) => {
                    isLoading.value = false
                    switch (error.code) {
                        case 'auth/invalid-email':
                            errMsg.value = 'Invalid email'
                            break
                        case 'auth/user-not-found':
                            errMsg.value = 'No account with that email was found'
                            break
                        case 'auth/wrong-password':
                            errMsg.value = 'Incorrect password'
                            break
                        default:
                            errMsg.value = 'Email or password was incorrect'
                            break
                    }
                })
       
    }
</script>