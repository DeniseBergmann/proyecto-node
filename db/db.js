// Importamos el módulo Mongoose para conectarnos a la base de datos de MongoDB.
const mongoose = require("mongoose");

// Establecemos nuestra URL de la base de datos.
const mongoDBURL = "mongodb+srv://denichabepa:IkZH9bvLZCAPJZ37@cluster0.fmihbhu.mongodb.net/proyect";

// Función para conectarnos a la base de datos.
function connectDB() {
    return new Promise((res, rej) => {
        // Conectar a la base de datos usando la URL proporcionada.
        mongoose.connect(mongoDBURL)
            .then(() => {
                console.log("Conexión a la base de datos establecida correctamente");
                // Si la conexión es exitosa, resolvemos la promesa.
                res();
            })
            .catch((err) => {
                // Si hay un error al conectar, imprimir el error y rechazar la promesa.
                console.error("Error al conectar a la base de datos ", err);
                rej(err);
            });
    });
}

// Exportamos la función de la conexión a la base de datos para poder utilizarla en app.js.
module.exports = connectDB; 