<template>
    <div class="profile">
        <!-- Sección de datos del usuario -->
        <div v-if="user && !isEditing">
            <h2>Mi Perfil</h2>
            <p><strong>Nombre de usuario:</strong> {{ user.username }}</p>
            <p><strong>Nombre:</strong> {{ user.name }}</p>
            <p><strong>Apellido:</strong> {{ user.lastname }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Teléfono:</strong> {{ user.phone }}</p>
            <p><strong>Fecha de nacimiento:</strong> {{ user.date }}</p>
            <button @click="startEditing">Editar Perfil</button>
        </div>

        <!-- Formulario de edición del perfil -->
        <div v-if="isEditing">
            <h2>Editar Perfil</h2>
            <form @submit.prevent="saveChanges">
                <div class="form-group">
                    <label for="name">Nombre:</label>
                    <input v-model="editedUser.name" type="text" id="name" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="lastname">Apellido:</label>
                    <input v-model="editedUser.lastname" type="text" id="lastname" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input v-model="editedUser.email" type="email" id="email" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="phone">Teléfono:</label>
                    <input v-model="editedUser.phone" type="text" id="phone" class="form-control" required />
                </div>
                <div class="form-group">
                    <label for="date">Fecha de nacimiento:</label>
                    <input v-model="editedUser.date" type="date" id="date" class="form-control" required />
                </div>
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                <button @click="cancelEditing" class="btn btn-secondary">Cancelar</button>
            </form>
        </div>

        <!-- Sección de citas -->
        <div class="appointments">
            <h2>Mis Citas</h2>
            <button @click="openCreateAppointmentModal">Crear Nueva Cita</button>
            <div v-if="appointments.length">
                <ul>
                    <li v-for="appointment in appointments" :key="appointment._id">
                        <p><strong>Fecha:</strong> {{ appointment.date }}</p>
                        <p><strong>Centro:</strong> {{ appointment.center }}</p>
                        <p><strong>Estado:</strong> {{ appointment.status }}</p>
                        <button @click="cancelAppointment(appointment._id)">Cancelar</button>
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>No tiene ninguna cita pedida.</p>
            </div>
        </div>

        <!-- Modal para crear una nueva cita -->
        <div v-if="isCreatingAppointment">
            <h3>Crear Nueva Cita</h3>
            <form @submit.prevent="createAppointment">
                <div class="form-group">
                    <label for="appointmentDate">Fecha y Hora:</label>
                    <input v-model="newAppointment.date" type="datetime-local" id="appointmentDate" class="form-control"
                        required />
                </div>
                <div class="form-group">
                    <label for="appointmentCenter">Centro:</label>
                    <select v-model="newAppointment.center" id="appointmentCenter" class="form-control" required>
                        <option v-for="center in centers" :key="center.name" :value="center.name">{{ center.name }}
                        </option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Reservar Cita</button>
                <button @click="closeCreateAppointmentModal" class="btn btn-secondary">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const user = ref(null);
        const editedUser = ref({});
        const isEditing = ref(false);
        const appointments = ref([]);
        const isCreatingAppointment = ref(false);
        const newAppointment = ref({ date: '', center: '' });
        const centers = ref([]);
        const authStore = useAuthStore();

        const fetchUserData = async () => {
            try {
                if (!authStore.token) {
                    router.push('/login');
                    return;
                }

                const response = await fetch('http://localhost:5000/profile', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                user.value = data;
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('Error al cargar los datos del usuario. Por favor, inténtalo de nuevo.');
            }
        };

        const fetchAppointments = async () => {
            try {
                if (!authStore.token) {
                    throw new Error('No hay token de autenticación');
                }

                const response = await fetch('http://localhost:5000/date/getByUser', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                // console.log('datos recibidos: ', data);
                appointments.value = data;
            } catch (error) {
                console.error('Error fetching appointments:', error);
                console.error('El error es:', error);
                alert('Error al cargar las citas. Por favor, inténtalo de nuevo.');
            }
        };

        const fetchCenters = async () => {
            try {
                const response = await fetch('http://localhost:5000/centers', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                centers.value = data;
            } catch (error) {
                console.error('Error fetching centers:', error);
                alert('Error al cargar los centros. Por favor, inténtalo de nuevo.');
            }
        };

        const createAppointment = async () => {
            try {
                const response = await fetch('http://localhost:5000/date/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authStore.token}`,
                    },
                    body: JSON.stringify(newAppointment.value),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                appointments.value.push(data);
                closeCreateAppointmentModal();
            } catch (error) {
                console.error('Error creating appointment:', error);
                alert('Error al crear la cita. Por favor, inténtalo de nuevo.');
            }
        };

        const openCreateAppointmentModal = async () => {
            try {
                await fetchCenters();
                isCreatingAppointment.value = true;
            } catch (error) {
                console.error('Error al abrir el modal:', error);
                alert('Error al cargar los centros. Por favor, inténtalo de nuevo.');
            }
        };

        const closeCreateAppointmentModal = () => {
            isCreatingAppointment.value = false;
            newAppointment.value = { date: '', center: '' };
        };

        const cancelAppointment = async (appointmentId) => {
            try {
                const response = await fetch(`http://localhost:5000/date/delete/${appointmentId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }

                // Eliminar la cita de la lista
                appointments.value = appointments.value.filter(a => a._id !== appointmentId);
            } catch (error) {
                console.error('Error canceling appointment:', error);
                alert('Error al cancelar la cita. Por favor, inténtalo de nuevo.');
            }
        };

        const startEditing = () => {
            editedUser.value = { ...user.value };
            isEditing.value = true;
        };

        const cancelEditing = () => {
            isEditing.value = false;
        };

        const saveChanges = async () => {
            try {
                const response = await fetch('http://localhost:5000/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authStore.token}`,
                    },
                    body: JSON.stringify(editedUser.value),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                user.value = data;
                isEditing.value = false;
            } catch (error) {
                console.error('Error updating user data:', error);
                alert('Error al actualizar los datos del usuario. Por favor, inténtalo de nuevo.');
            }
        };

        onMounted(() => {
            fetchUserData();
            fetchAppointments();
        });

        return {
            user,
            editedUser,
            isEditing,
            appointments,
            isCreatingAppointment,
            newAppointment,
            centers,
            startEditing,
            cancelEditing,
            saveChanges,
            openCreateAppointmentModal,
            closeCreateAppointmentModal,
            createAppointment,
            cancelAppointment,
        };
    },
};
</script>

<style scoped>
.profile {
    padding: 20px;
}

.appointments {
    margin-top: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}

button {
    padding: 5px;
    margin-bottom: 10px;
}
</style>