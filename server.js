const express = require('express');
const app = express();
const personas = require('./personas');
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
}); //Buscado para solucionar CORS :(

app.get('/personas', (req, res) => {
    res.json(personas);
});

app.post('/sumar', (req, res) => {
    const nuevaPersona = req.body;
    if (nuevaPersona.nombre && nuevaPersona.apellido && nuevaPersona.edad) {
        personas.push(nuevaPersona);
        res.send('Persona añadida con éxito');
    } else {
        res.send('Datos inválidos');
    }
});

app.put('/modificar', (req, res) => {
    const datosActualizados = req.body;

    if (!datosActualizados.nombre) {
        res.send('El nombre es necesario para actualizar');
        return;
    }

    let personaEncontrada = false;

    for (let i = 0; i < personas.length; i++) {
        if (personas[i].nombre === datosActualizados.nombre) {
            if (datosActualizados.apellido) personas[i].apellido = datosActualizados.apellido;
            if (datosActualizados.edad) personas[i].edad = datosActualizados.edad;
            personaEncontrada = true;
            break;
        }
    }

    if (personaEncontrada) {
        res.send('Persona actualizada con éxito');
    } else {
        res.send('Persona no encontrada');
    }
});

app.delete('/borrar', (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        res.send('El nombre es necesario para eliminar');
        return;
    }

    const indice = personas.findIndex(persona => persona.nombre === nombre);

    if (indice !== -1) {
        personas.splice(indice, 1);
        res.send('Persona eliminada con éxito');
    } else {
        res.send('Persona no encontrada');
    }
});



app.listen(  process.env.PORT || 3000, (e)=>{
    e
    ? console.error('Imposible poner el servidor a la escucha.')
    : console.log('Servidor a la escucha en el puerto: ' + (process.env.PORT || 3000))
})
