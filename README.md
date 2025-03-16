# Proyecto de Gestión de Citas en Vue 3

Este proyecto es una aplicación web desarrollada en **Vue 3** que permite a los usuarios registrarse, iniciar sesión, modificar su información, reservar citas en centros disponibles, ver sus citas y cancelarlas.

## Características Principales

- **Registro e Inicio de Sesión**: Los usuarios pueden registrarse e iniciar sesión para acceder a su perfil.

- **Edición de Perfil**: Los usuarios pueden modificar su información personal (nombre, apellido, email, teléfono, fecha de nacimiento).

- **Reserva de Citas**: Los usuarios pueden reservar citas en uno de los centros disponibles.

- **Visualización de Citas**: Los usuarios pueden ver todas sus citas activas.

- **Cancelación de Citas**: Los usuarios pueden cancelar citas que ya no deseen mantener.

## Tecnologías Utilizadas

- **Vue 3**: Framework de JavaScript para construir la interfaz de usuario.

- **Vue Router**: Para la navegación entre vistas.

- **Fetch API**: Para realizar solicitudes HTTP a la API.

- **LocalStorage**: Para almacenar el token de autenticación y mantener la sesión del usuario.

- **SCSS**: Para estilos personalizados.

## Requisitos del Sistema

- Node.js (v16 o superior)

- npm (v8 o superior)

## Configuración del Proyecto

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1.  **Clona el repositorio**:

    bash

    Copy

    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio

2.  **Instala las dependencias**:

    bash

    Copy

    npm install

3.  **Inicia el servidor de desarrollo**:

    bash

    Copy

    npm run serve

4.  **Accede a la aplicación**:\
    Abre tu navegador y visita `http://localhost:8080`.

## Estructura del Proyecto

Copy

src/
│
├── assets/ # Archivos estáticos (imágenes, estilos globales)
├── components/ # Componentes reutilizables
├── router/ # Configuración de Vue Router
├── stores/ # Almacenamiento global (Pinia o Vuex)
├── views/ # Vistas principales (Login, Profile, etc.)
├── App.vue # Componente principal de la aplicación
└── main.js # Punto de entrada de la aplicación

## Endpoints de la API

- **Registro**: `POST /register`

- **Inicio de Sesión**: `POST /login`

- **Perfil del Usuario**: `GET /profile`

- **Actualizar Perfil**: `PUT /profile`

- **Obtener Citas del Usuario**: `GET /date/getByUser`

- **Crear Cita**: `POST /date/create`

- **Cancelar Cita**: `DELETE /date/delete/:id`
