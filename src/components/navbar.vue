<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <!-- Logo o nombre de la aplicación -->
            <router-link class="navbar-brand" to="/">Citas App</router-link>

            <!-- Menú de navegación -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <!-- Enlaces comunes -->
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Inicio</router-link>
                    </li>

                    <!-- Enlace "Perfil" (solo visible si el usuario está autenticado) -->
                    <li v-if="authStore.user" class="nav-item">
                        <router-link class="nav-link" to="/profile">Perfil</router-link>
                    </li>

                    <!-- Estado de autenticación -->
                    <li v-if="authStore.user" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            {{ authStore.user.username }}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <button @click="logout" class="dropdown-item">Cerrar sesión</button>
                            </li>
                        </ul>
                    </li>
                    <li v-else class="nav-item">
                        <router-link class="nav-link" to="/login" :disabled="authStore.isLoading">
                            {{ authStore.isLoading ? 'Cargando...' : 'Iniciar sesión' }}
                        </router-link>
                    </li>
                    <li v-if="!authStore.user" class="nav-item">
                        <router-link class="nav-link" to="/register">Registrarse</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();

        // Función para cerrar sesión
        const logout = () => {
            authStore.logout(); // Limpiar el store
            router.push('/login'); // Redirigir al usuario a la página de inicio de sesión
        };

        return {
            authStore,
            logout,
        };
    },
};
</script>

<style scoped>
/* Estilos personalizados (opcional) */
.navbar {
    margin-bottom: 2rem;
}

.dropdown-item {
    cursor: pointer;
}
</style>