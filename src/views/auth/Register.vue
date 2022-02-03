<template>
    <div class="row justify-content-md-center">
        <div class="card col-md-5">
            <div class="card-body">
                <h5 class="card-title">Register</h5>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        v-model="email">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
                </div>
                <div class="mb-3">
                    <button type="submit" :disabled="isLoading" class="btn btn-primary" @click="register">Submit</button>
                </div>
                <div class="alert alert-danger" v-if="errMsg" role="alert">
                    {{errMsg}}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { computed, ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
    const router = useRouter();
    const auth = getAuth();
    const isLoading = ref(false);
    const email = ref('');
    const password = ref('');
    const errMsg = ref('')
    const debug = process.env.NODE_ENV !== 'production'
    if(!debug){
        router.push('/login')
    }
    const register = async () => {
         isLoading.value = true
            await createUserWithEmailAndPassword(auth, email.value, password.value)
                .then((user) => {
                    if (user) {
                        updateProfile(auth.currentUser, {
                            displayName: '',
                            photoURL: ''
                        })
                        sendEmailVerification(auth.currentUser)
                        isLoading.value = false
                        router.push('/verify')
                    }
                })
                .catch((error) => {
                    console.log(error);
                    isLoading.value = false
                     switch (error.code) {
                        case 'auth/invalid-email':
                            errMsg.value = 'The email address is badly formatted.'
                            break
                        case 'auth/email-already-exists':
                            errMsg.value = 'The email address is already in use by another account.'
                            break
                        case 'auth/weak-password':
                            errMsg.value = 'The password must be 6 characters long or more.'
                            break
                        default:
                            errMsg.value = 'There was a problem creating the account.'
                            break
                    }
                })
    }
</script>