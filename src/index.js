import express from "express"


const app = express();
pp.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/bienvenida', (req, res) => {
    res.send(`<h1>Mi primer servidor con express</h1>`)
})


app.get('/usuario', (req, res) => {
    res.send({
        nombre: "Efren",
        apellido: "Garcia",
        edad: 20,
        correo: 'eeagp@gmail.com'
    })
})

app.listen(8080, () => console.log('Listening on port 8080'))