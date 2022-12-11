const {Router} = require('express')
const app = Router()
const aws = require('aws-sdk')

const {alumnos} = require('./models') 

let Alumno = {
    id:'',
    nombres:'',
    apellidos:'',
    matricula:'',
    promedio:''
}


app.get('/alumnos/', (req,res) => {
    alumnos.findAll().then((users) => {res.status(200).send(users)})
})

app.get('/alumnos/:id', (req,res) => {
    alumnos.findOne({where:{id:req.params.id}}).then((user) => {
        if(!user){ 
            res.sendStatus(404)
        } else{
            res.status(200).send(user)
        }
    })
})

app.post('/alumnos/', (req,res) => {
    if((validarTexto(req.body.nombres) && validarTexto(req.body.apellidos) && validarMatrícula(req.body.matricula) && (!isNaN(req.body.promedio) && req.body.promedio > 0))){
        alumnos.create({
            nombres : req.body.nombres,
            apellidos: req.body.apellidos,
            matricula: req.body.matricula,
            promedio: req.body.promedio,
            fotoPerfilUrl: req.body.fotoPerfilUrl,
        }).then((alumnos) => {res.status(201).send(alumnos)})
    }else {
        res.status(400).json({})
    }
})

app.put('/alumnos/:id', (req,res) => {
    if(validarTexto(req.body.nombres) && validarTexto(req.body.apellidos) && validarMatrícula(req.body.matricula) && (!isNaN(req.body.promedio) && req.body.promedio > 0)){
        alumnos.findOne({where:{id:req.params.id}}).then((user) => {
            if(!user){ 
                res.sendStatus(404)
            } else{
                user.update({
                    nombres : req.body.nombres,
                    apellidos: req.body.apellidos,
                    matricula: req.body.matricula,
                    promedio: req.body.promedio,
                    fotoPerfilUrl: req.body.fotoPerfilUrl,
                }).then(() => res.status(200).json({}))
            }
        })
    }else {
        res.status(400).json({})
    }
    
})

app.delete('/alumnos/:id', (req,res) => {
    alumnos.findOne({where:{id:req.params.id}}).then((user) => {
        if(!user){ 
            res.sendStatus(404)
        } else{
            user.destroy().then(() => {res.status(200).send(user)}) 
        }
    })
})

app.put('/alumnos/', (req,res) => {
    res.sendStatus(405)
})
app.delete('/alumnos/', (req,res) => {
    res.sendStatus(405)
})
app.post('/alumnos/:id', (req,res) => {
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