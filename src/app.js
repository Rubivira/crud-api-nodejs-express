import express from "express"
import connectDatabase from "./config/dbConnect.js"
import livro from "./models/Livro.js"

const connect = await connectDatabase()

connect.on("error", (erro) => {
    console.error("Erro de conexão: ", erro)
})

connect.once("open", () => {
    console.log("Banco conectado com sucesso.")
})

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.JS")
})

app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({})
    res.status(200).json(listaLivros)
})

app.post("/livros", (req, res) => {
    livros.push(req.body)
    res.status(201).send("Livro cadastrado com sucesso.")
})

app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    res.status(200).json(livros[index])
})

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    livros[index].titulo = req.body.titulo
    res.status(200).json(livros)
})

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    livros.splice(index, 1)
    res.status(200).send("Livro excluído com sucesso.")
})

export default app