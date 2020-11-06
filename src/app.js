
const debug = require('debug')('app:inicio');
const debugDB = require('debug')('app:database');
const express = require('express');
const app = express();
const cnn = require('./config/cnn');
const bodyParser = require('body-parser');
const Joi = require('@hapi/joi');
const morgan = require('morgan');
const config = require('config');


app.use(bodyParser.json());

app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

//configuracion de entorno

console.log('App '+ config.get('nombre'));
console.log('App '+ config.get('configDB.host'));

app.use(morgan('tiny'));
console.log('morgan habilitado');
debug('iniciando morgan......')

app.get('/persons',(req,res)=>{

    const sql = "select * from persona";
    cnn.query(sql,(error,result) => {
        if(error) throw error;
        if(result.length > 0){
            res.json(result);
        }else{
            res.send("Sin resultados");
        }

    });
});


app.post('/add_person',(req,res)=>{

    const person = {

        nombre : req.body.nombre,
        ape_pat : req.body.ape_pat,
        ape_mat : req.body.ape_mat 
    };
    const sql = "insert into persona set ?";
    cnn.query(sql,person,error => {
        if(error) throw error;
        res.send('Persona Creada');

    });
});


app.get('/planetas',(req,res)=>{

    
    debugDB('obteniendo persona');
    const sql = "select * from Planeta";
    cnn.query(sql,(error,result) => {
        if(error) throw error;
        if(result.length > 0){
            res.json(result);
        }else{
            res.send("Sin resultados");
        }

    });
});

app.post('/add_planeta',(req,res)=>{

    const person = {

        nombrePlaneta : req.body.nombrePlaneta
    };
    const sql = "insert into Planeta set ?";
    cnn.query(sql,person,error => {
        if(error) throw error;
        res.send('Planeta Creado');

    });
    cnn.close();
});



app.post('/add',(req,res)=>{

    const schema = Joi.object({
        nombre : Joi.string().min(3).required()
    });

    const {error , value} = schema.validate({nombre : req.body.nombre});

    if(!error){
        res.send(value.nombre);
    }else{
        res.status(400).send(error.details[0].message);
    }

    res.send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT ,()=>{
    console.log("Servidor escuchando en el puerto "+PORT);
});