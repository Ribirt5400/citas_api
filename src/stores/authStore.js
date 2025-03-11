// stores/authStore.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null, // token de autenticación
    user: null, // información del usuario
    isLoading: false, // indica si se está cargando la información del usuario
  }),
  actions: {
    setToken(token) {
      this.token = token; // asigna el token al estado
      localStorage.setItem("token", token); // guarda el token en el localStorage
    },
    setUser(user) {
      this.user = user; // asigna la información al estado
    },
    setLoading(isLoading) {
      this.isLoading = isLoading; // asigna el estado de carga
    },
    logout() {
      this.user = null; // elimina la información del usuario
      this.token = null; // elimina el token
      localStorage.removeItem("token"); // elimina el token del localStorage
    },
  },
});
