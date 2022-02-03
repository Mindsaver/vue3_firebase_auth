import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap"
import store from './stores'
import VueSweetalert2 from 'vue-sweetalert2';

//import 'sweetalert2/dist/sweetalert2.min.css';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss';
// firebase
import { initializeApp } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from './firebase-config'

console.log("main: initializeApp");
const firebase = initializeApp(firebaseConfig)
const firestoreSettings = {
    timestampsInSnapshots: true
}
getAuth().onAuthStateChanged((user) => {
    console.log("onAuthStateChanged")
    if (user) {
        console.log(user)

        store.commit("user/setUser",user)
    } else {
        store.commit("user/setUser",null)
    }
});

//getStorage(firebase)
//initializeFirestore(firebase, firestoreSettings)

const app = createApp(App);
app.use(store)
app.use(router);
app.use(VueSweetalert2)
app.mount("#app");

//https://github.com/leighayanid/firekit-template