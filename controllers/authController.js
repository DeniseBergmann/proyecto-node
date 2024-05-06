const authService = require("../services/authService")
const AuthToken = require("../models/AuthToken")
const bcrypt = require("../services/bcryptService")
const User = require("../models/User")

// Controlador para manejar la Autenticacion de Usuarios.

function login(req, res) {
    const { email, contraseña } = req.body

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: "Credenciales Invalidas" })
            }

            // Comparar la contraseña ingresada por el usuario con la contraseña almacenada en la base de datos
            bcrypt.comparePassword(contraseña, user.contraseña)
                .then((match) => {
                    if (!match) {
                        return res.status(401).json({ message: "Credenciales Invalidas" })
                    }

                    // Si las credenciales son válidas, es decir si la contraseña ingresada por el usuario es la misma que la contraseña almacenada en la base de datos (Es decir la contraseña con la cual se registro vamos a crearle el Token.)
                    const token = authService.generateToken(user)

                    //Guardar el token en la base de datos
                    AuthToken.create({ userId: user._id, token })
                        .then(() => {
                            res.json({ token })
                        })
                        .catch((error) => {
                            console.error(error)
                            res.status(500).json({ message: "Error al iniciar seción" })
                        })
                })
                .catch((error) => {
                    console.error(error)
                    res.status(500).json({ message: "Error al iniciar seción" })
                })
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json({ message: "Error al iniciar seción" })
        })
}

// Controlador para cerrar la sesión
function logout(req, res) {
    const token = req.headers.authorization.split(" ")[1]

    // Buscamos el token en la base de datos y lo eliminamos
    AuthToken.findOneAndDelete({ token })
        .then(() => {
            res.status(200).json({ message: "Sesión cerrada exitosamente" })
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json({ message: "Error al cerrar sesión" })
        })
}

module.exports = {
    login,
    logout
}
