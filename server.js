// Importamos express y la conexión a la db.

const express = require("express")
const connectDb = require("./db/db")

// Importamos las rutas.
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const sessionRoutes = require("./routes/sessionRoutes")

// Creamos una instancia de Express

const app = express()
const PORT = 3010

// Middleware
app.use(express.json()) // Invocamos al middleware para que parsee los datos del body de las solicitudes en formato JSON.

// Rutas de Autenticación

app.use("/api/auth", authRoutes)

// Rutas de Usuarios
app.use("/api/users", userRoutes) // Creamos las rutas de usuario en la ruta /api/users

// Rutas del usuario actual
app.use("/api/session", sessionRoutes)

// Iniciamos la db
connectDb()

// Inicializamos el servidor y lo ponemos en escucha en el puerto que pusimos arriba.
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto: " + PORT);
});
