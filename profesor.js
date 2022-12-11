const {Router} = require('express')
const app = Router()

//let profesores = []

const {profesores} = require('./models') 

let Profesor = {
    id:'',
    numeroEmpleado:'',
    nombres:'',
    apellidos:'',
    horasClase:''
}

app.get('/profesores/', (req,res) => {
    profesores.findAll().then((users) => {res.status(200).send(users)})
})

app.get('/profesores/:id', (req,res) => {
    profesores.findOne({where:{id:req.params.id}}).then((user) => {
        if(!user){ 
            res.sendStatus(404)
        } else{
            res.status(200).send(user)
        }
    })
})

app.post('/profesores/', (req,res) => {
    if((!isNaN(req.body.numeroEmpleado) && req.body.numeroEmpleado > 0) && validarTexto(req.body.nombres) && validarTexto(req.body.apellidos) && (!isNaN(req.body.horasClase) && req.body.horasClase > 0)){
        profesores.create({
            numeroEmpleado : req.body.numeroEmpleado,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            horasClase: req.body.horasClase,
        }).then((profesores) => {res.status(201).send(profesores)})
    } else {
        res.status(400).json({})
    }
})

app.put('/profesores/:id', (req,res) => {
    if((!isNaN(req.body.numeroEmpleado) && req.body.numeroEmpleado > 0) && validarTexto(req.body.nombres) && validarTexto(req.body.apellidos) && (!isNaN(req.body.horasClase) && req.body.horasClase > 0)){
        profesores.findOne({where:{id:req.params.id}}).then((user) => {
            if(!user){ 
                res.sendStatus(404)
            } else{
                user.update({
                    numeroEmpleado : req.body.numeroEmpleado,
                    nombres: req.body.nombres,
                    apellidos: req.body.apellidos,
                    horasClase: req.body.horasClase,
                }).then(() => res.status(200).json({}))
            }
        })
    } else {
        res.status(400).json({})
    }
    
})

app.delete('/profesores/:id', (req,res) => {
    profesores.findOne({where:{id:req.params.id}}).then((user) => {
        if(!user){ 
            res.sendStatus(404)
        } else{
            user.destroy().then(() => {res.status(200).send(user)}) 
        }
    })
})

app.put('/profesores/', (req,res) => {
    res.sendStatus(405)
})
app.delete('/profesores/', (req,res) => {
    res.sendStatus(405)
})
app.post('/profesores/:id', (req,res) => {
    res.sendStatus(405)
})

//Validaciones
function validarId(data){
    const regex = new RegExp(/^[0-9]+/)
    return regex.test(data) && data > 0 ? true : false
}

function validarTexto(data){
    const regex = new RegExp(/^[a-zA-Z]+/)
    return regex.test(data) ? true : false
}

function validarMatrícula(data){
    const regex = new RegExp(/^A[0-9]+/)
    return regex.test(data) ? true : false
}

module.exports = app