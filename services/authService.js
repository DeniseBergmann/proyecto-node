const jwt = require("jsonwebtoken")

// Almacenamos nuestra clave secreta
const JWT_SECRET = "0ac76df0addc73fe822f2a1035dbd218167660cc15e235a55f3d580905361c74"

// Creamos una función para generar un token JWT
function generateToken(user) {
    const payload = {
        userId: user._id,
        email: user.email
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })
    return token;
}

module.exports = {
    generateToken
}
