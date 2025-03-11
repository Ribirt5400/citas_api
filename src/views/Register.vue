<template>
    <div class="container">
        <h2 class="text-center mt-5">Registro</h2>
        <form @submit.prevent="register" class="w-50 mx-auto">
            <!-- Nombre -->
            <div class="mb-3">
                <label for="name" class="form-label">Nombre</label>
                <input v-model="name" type="text" id="name" class="form-control" required />
            </div>

            <!-- Apellido -->
            <div class="mb-3">
                <label for="lastname" class="form-label">Apellido</label>
                <input v-model="lastname" type="text" id="lastname" class="form-control" required />
            </div>

            <!-- Nombre de usuario -->
            <div class="mb-3">
                <label for="username" class="form-label">Nombre de usuario</label>
                <input v-model="username" type="text" id="username" class="form-control" required />
            </div>

            <!-- Email -->
            <div class="mb-3">
                <label for="email" class="form-label">Correo electrónico</label>
                <input v-model="email" type="email" id="email" class="form-control" required />
            </div>

            <!-- Contraseña -->
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input v-model="password" type="password" id="password" class="form-control" required />
            </div>

            <!-- Confirmar Contraseña -->
            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Repetir contraseña</label>
                <input v-model="confirmPassword" type="password" id="confirmPassword" class="form-control" required />
            </div>

            <!-- Número de teléfono -->
            <div class="mb-3">
                <label for="phone" class="form-label">Número de teléfono</label>
                <input v-model="phone" type="tel" id="phone" class="form-control" required />
            </div>

            <!-- Botón de registro -->
            <button type="submit" class="btn btn-success w-100">Registrarse</button>
        </form>

        <!-- Enlace a inicio de sesión -->
        <p class="mt-3 text-center">
            ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión aquí</router-link>
        </p>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const name = ref('');
        const lastname = ref('');
        const username = ref('');
        const email = ref('');
        const password = ref('');
        const confirmPassword = ref('');
        const phone = ref('');
        const date = ref('');
        const router = useRouter();

        const register = async () => {
            if (password.value !== confirmPassword.value) { // Validar que las contraseñas coincidan
                alert('Las contraseñas no coinciden');
                return;
            }

            const newUser = { // Crear el objeto con los datos del nuevo usuario
                username: username.value,
                password: password.value,
                name: name.value,
                email: email.value,
                lastname: lastname.value,
                phone: phone.value,
                date: "10/03/2025"
            };

            try {
                const response = await fetch('http://localhost:5000/register', { // Enviar la petición al servidor
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                });

                if (!response.ok) {
                    throw new Error('Error en el registro');
                }

                const data = await response.json();
                alert('Registro exitoso, ahora puedes iniciar sesión');
                router.push('/login');
            } catch (error) {
                console.error(error);
                alert('Hubo un error en el registro');
            }
        };

        return {
            name,
            lastname,
            username,
            email,
            password,
            confirmPassword,
            phone,
            date,
            register
        };
    }
};
</script>

<style scoped></style>