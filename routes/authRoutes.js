// Importamos express y creamos un router.
const express = require("express")
const router = express.Router()

// Importamos el controlador de authRoutes.
const authController = require("../controllers/authController")

// Importamos el middleware de Seguridad.
const verifyToken = require("../middleware/verifyToken")

// Rutas para Auth del User.
router.post("/login", authController.login)

// Ruta para cerrar Sesión.
router.post("/logout", verifyToken, authController.logout)

module.exports = router