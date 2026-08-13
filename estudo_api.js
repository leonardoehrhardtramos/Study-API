import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

<<<<<<< HEAD
=======
let users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com" }
];

//listando
app.get("/users", (req, res) => {
  res.status(200).json(users);
});


//adicionando
app.post("/users", (req, res) => {
    const novoUsuario = req.body;

    users.push(novoUsuario);

    res.status(201).json({mensagem: "Usuário adicionado com sucesso!", usuario: novoUsuario});

});

//removendo
app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    users = users.filter(user => user.id !== id);

    res.status(200).json({mensagem: "Usuário deletado com sucesso!"});
});







app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
>>>>>>> parent of 9c24d07 (travado)
