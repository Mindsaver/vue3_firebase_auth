import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
      meta: {
        requiresNoAuth: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "register" */ "../views/auth/Register.vue"),
      meta: {
        requiresNoAuth: true,
      },
    },
    {
      path: "/passwordreset",
      name: "passwordreset",
      component: () =>
        import(
          /* webpackChunkName: "register" */ "../views/auth/PasswordReset.vue"
        ),
      meta: {
        requiresNoAuth: true,
      },
    },
    {
      path: "/verify",
      name: "verify",
      component: () =>
        import(/* webpackChunkName: "verify" */ "../views/auth/Verify.vue"),
      meta: {
        requiresVerify: true,
      },
    },
    {
      path: "/crud",
      name: "crud",
      component: () =>
        import(/* webpackChunkName: "feed" */ "../views/CRUD.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () =>
        import(/* webpackChunkName: "feed" */ "../views/Profile.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });

router.beforeEach(async (to, from, next) => {
  let user = await getCurrentUser();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user && !user.emailVerified) {
      next("/verify");
    } else if (user) {
      next();
    } else {
      next("/");
    }
  } else if (to.matched.some((record) => record.meta.requiresNoAuth)) {
    if (!user) {
      next();
    } else {
      next("/");
    }
  } else if (to.matched.some((record) => record.meta.requiresVerify)) {
    if (user && !user.emailVerified) {
      next();
    } else {
      next("/");
    }
  } else {
    console.log("else");
    if (user && !user.emailVerified) {
      next("/verify");
    } else {
      next();
    }
  }
});

export default router;
