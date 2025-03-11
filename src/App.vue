<template>
  <div id="app">
    <!-- Barra de navegación -->
    <NavBar />

    <!-- Contenido de la aplicación -->
    <div class="container mt-5">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from './components/navbar.vue'; // Importar el componente NavBar
import { onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';

export default {
  name: 'App',
  components: {
    NavBar, // Registrar el componente NavBar
  },
  setup() {
    const authStore = useAuthStore();

    // Verificar la autenticación al cargar la aplicación
    onMounted(async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const user = await response.json();
            authStore.setToken(token); // Guardar el token en el store
            authStore.setUser(user); // Guardar los datos del usuario en el store
          } else {
            // Si el token no es válido, limpiar el store
            authStore.logout();
          }
        } catch (error) {
          console.error('Error al cargar el perfil:', error);
          authStore.logout(); // Limpiar el store en caso de error
        }
      }
    });
  },
};
</script>

<style scoped>
/* Estilos globales (opcional) */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>