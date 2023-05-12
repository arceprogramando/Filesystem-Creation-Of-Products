import express from "express"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const personas = [
    {
        "id": 1,
        "nombre": "pepe",
        "edad": 30,
    },
    {
        "id": 2,
        "nombre": "daniel",
        "edad": 50,
    },
    {
        "id": 3,
        "nombre": "ana",
        "edad": 25,
    },
    {
        "id": 4,
        "nombre": "carlos",
        "edad": 42,
    },
    {
        "id": 5,
        "nombre": "luisa",
        "edad": 28,
    },
    {
        "id": 6,
        "nombre": "juan",
        "edad": 35,
    },
    {
        "id": 7,
        "nombre": "maria",
        "edad": 52,
    },
    {
        "id": 8,
        "nombre": "pedro",
        "edad": 20,
    },
    {
        "id": 9,
        "nombre": "laura",
        "edad": 39,
    },
    {
        "id": 10,
        "nombre": "jorge",
        "edad": 45,
    }
]

const alumno = [{
    "nombre": "Felipe Arce",
    "edad": 23,
    "gracias": "gracias por verificar",
}
]
app.get("/", (req, res) => {
    console.log("REQ", req)
    res.send("Hola World!");
})

app.get("/bienvenida", (req, res) => {
    res.send(alumno)
})

app.get("/personas", (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        res.send(personas.slice(0, limit));
    } else {
        res.send(personas);
    }
})

app.get("/personas/:id", (req, res) => {
    const persona = personas.find(persona => persona.id == req.params.id)
    if (persona) {
        res.send(persona);
    } else {
        res.status(404).send({ error: "El producto no existe" });
    }
})

app.listen(8080, () => console.log('Listening on port 8080\nhttp://localhost:8080'))

