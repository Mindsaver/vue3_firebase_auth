
# vue3_firebase_auth

This is a template for creating vue3 login/register via firebase-auth and using firestore to store some custom data.
It´s using the newest firebase version. Also Vue 3 [SFC `<script setup>`](https://v3.vuejs.org/api/sfc-script-setup.html) syntax

# setup

You need to create a file called **firebase-config.js** inside **src** folder.
And copy in your firebase config.
Example:

    export  const  firebaseConfig = {
	    apiKey:  "xxxx",
	    authDomain:  "xxx.firebaseapp.com",
	    projectId:  "xxx",
	    storageBucket:  "xxx.appspot.com",
	    messagingSenderId:  "xxx",
	    appId:  "1:xxx:web:xxx"
    }

You also need to create a file in the main folder called **.firebaserc**

    {
	    "projects":{ 
		    "default" : "<yourprojectid>"
	    }
    }
