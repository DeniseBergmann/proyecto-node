// Importamos express y creamos un router.
const express = require("express")
const router = express.Router()

// Importamos el controlador de sessionRouter.
const sessionController = require("../controllers/sessionController")
const verifyToken = require("../middleware/verifyToken")


// Ruta protegida para obtener  información sobre el usuario que inicio sesión.

router.get("/currentUser", verifyToken, sessionController.getCurrentUser) // Ruta protegida para obtener información del usuario que esta conectado actualmente.

module.exports = router