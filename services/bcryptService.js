const bcrypt = require("bcrypt")

// Función para Hashear una contraseña

function hashPassword(plainPassword) {
    return new Promise((resolve, reject) => {
        const saltRounds = 10;
        bcrypt.hash(plainPassword, saltRounds, (error, hashedPassword) => {
            if (error) {
                reject(new Error("Error al hashear la contraseña"))
            }
            else {
                resolve(hashedPassword)
            }
        })
    })
}

// Función para comparar una contraseña con su contraseña encryptada

function comparePassword(plainPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hashedPassword, (error, match) => {
            if (error) {
                reject(new Error("Error al comparar contraseñas"))
            }
            else {
                resolve(match)
            }
        })
    })
}

module.exports = {
    hashPassword,
    comparePassword
}
