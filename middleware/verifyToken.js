const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization

        if (!token) {
            reject({ status: 401, message: "Token de autenticación no proporcionado" })
        }

        jwt.verify(token.split(" ")[1],
            "0ac76df0addc73fe822f2a1035dbd218167660cc15e235a55f3d580905361c74",
            (error, decodedToken) => {
                if (error) {
                    reject({ status: 401, message: "Token de autenticación no valido" })
                } else {
                    req.userId = decodedToken.userId //Agregamos el ID de usuario decodificado para su posterior uso
                    resolve()
                }
            }
        )
    })
        .then(() => next()) //Continua el seguimiento del siguiente middleware o del siguiente controlador
        .catch(error =>
            res.status(error.status || 500).json({ message: error.message })
        )
}

module.exports = verifyToken 