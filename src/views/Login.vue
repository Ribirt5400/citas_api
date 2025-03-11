<template>
    <div class="container">
        <h2 class="text-center mt-5">Iniciar sesión</h2>
        <form @submit.prevent="login" class="w-50 mx-auto">
            <div class="mb-3">
                <label for="username" class="form-label">Nombre de usuario</label>
                <input v-model="username" type="username" id="username" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input v-model="password" type="password" id="password" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
        </form>
        <p class="mt-3 text-center">
            ¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link>
        </p>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const username = ref('');
        const password = ref('');
        const authStore = useAuthStore();
        const router = useRouter();

        const isLoading = ref(false); // Indicador de carga

        const login = async () => {
            if (!username.value || !password.value) {
                alert('Por favor, completa todos los campos.');
                return;
            }

            authStore.setLoading(true); // Activar el indicador de carga

            try {
                const response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username.value,
                        password: password.value,
                    }),
                });

                const responseText = await response.text();
                console.log('Respuesta del servidor:', responseText);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${responseText}`);
                }

                const data = JSON.parse(responseText);
                authStore.setToken(data.access_token);
                authStore.setUser(data.user);
                router.push('/profile');
            } catch (error) {
                console.error("Error en la autenticación:", error);
                alert(error.message || "Hubo un problema al conectar con el servidor.");
            } finally {
                authStore.setLoading(false); // Desactivar el indicador de carga
            }
        };


        return {
            username,
            password,
            login,
        };
    },
};
</script>

<style scoped></style>