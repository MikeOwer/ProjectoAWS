const express = require("express")
const app = express()
app.use(express.json())
app.use(require("./alumno"))
app.use(require("./profesor"))
const db = require("./models")

db.sequelize.sync().then(
    (req) => {
        app.listen(8080, () => {
            console.log('El servidor está inicializando en el puerto 8080')
        })
    }
)



app.get('/', (req,res) => {
    respuesta = {
        error:false,
        codigo:200,
        mensaje:'Punto de inicio'
    }
    res.send(respuesta)
})




/*
app.all('/alumnos/*', (req,res) => {
     res.sendStatus(405)
})
*/




app.use(function(req, res, next) {
    respuesta = {
        mensaje: 'URL no encontrada'
    }
    res.status(404).send(respuesta)
})




