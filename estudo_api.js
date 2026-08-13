import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

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








app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});