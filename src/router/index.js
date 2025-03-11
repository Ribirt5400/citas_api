import { createRouter, createWebHistory } from "vue-router"; 
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue"; 
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import { useAuthStore } from "../stores/authStore";

const routes = [
  { path: "/", component: HomeView }, // HomeView es la vista por defecto 
  { path: "/login", component: Login }, // Login es la vista de login de usuario
  { path: "/register", component: Register }, // Register es la vista de registro de usuario
  { path: "/profile", component: Profile }, // Profile es la vista de perfil de usuario
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  }
  next();
}
);

export default router;
