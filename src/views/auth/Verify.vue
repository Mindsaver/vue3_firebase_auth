<template>
    <div class="row justify-content-md-center">
        <div class="card col-md-5">
            <div class="card-body">
                <h5 class="card-title">Email needs to be verified</h5>
                <div class="mb-3">
                   We have send you a verification Email.
                </div>
                <div class="mb-3">
                    <button :disabled="isReady" type="submit" class="btn btn-primary" @click="resend">Resend Verification {{compCounter}}</button>
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
    import { computed, ref, onMounted,onUnmounted } from 'vue';
    import { getAuth, sendEmailVerification } from 'firebase/auth'
    const auth = getAuth()
    const resendDisabled = ref('true');
    const counter = ref(60);
    var int = null;
    var compCounter = computed(() =>{ if(resendDisabled.value == false) return ""; else return "(" + counter.value + ")"});
    const errMsg = ref('');
    const isLoading = ref(false);
    const isReady = resendDisabled || isLoading;
    
    onMounted(() => {
        disableButton();
    })
    onUnmounted(() => {
        clearInterval(int);
        int = null;
    })

    let disableButton = () => {
        if(int != null)
            clearInterval(int);
        counter.value = 60;
        resendDisabled.value = true; 
        int = setInterval(()=>
        { 
            if (counter.value <= 0) {
                resendDisabled.value = false; 
                clearInterval(int);
            }
            else  
            {
                counter.value--;
            }
        },1000)
    }
    const resend = async () => {
         isLoading.value = true

             await sendEmailVerification(auth.currentUser)
                .then((user) => {
                    console.log("test1")
                    console.log(user);
                    isLoading.value = false
                })
                .catch((error) => {
                    console.log(error)
                    switch (error.code) {
                        case 'auth/too-many-requests':
                            errMsg.value = 'You made to many requests please wait some time...'
                            break
                        default:
                            errMsg.value = "Resending verification failed..."
                            break
                    }  
                    isLoading.value = false
                
                   // console.log(this.errMsg)
                })
        disableButton();
    }

</script>