import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let users = [
    {
        id: 1,
        nome: "John Doe",
        email: "john.doe@example.com"
    },
    {
        id: 2,
        nome: "Jane Smith",
        email: "jane.smith@example.com"
    },
    {
        id: 3,
        nome: "Bob Johnson",
        email: "bob.johnson@example.com"
    }
];


//listando todos os usuários
app.get("/users", (req, res) => {

    res.status(200).json(users);
});

//listando por ID
app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.filter((user) => user.id === id);

    res.status(200).json(user);
});

//adicionando um novo usuário
app.post("/users", (req, res) => {
    const novoUsuario = req.body;

    users.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

//atualizando um usuário
app.put("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const usuarioAtualizado = req.body;

    users = users.map((user) => {
        if (user.id === id) {
            return { ...user, ...usuarioAtualizado };
        } else {
            return user;
        }
    });
    if (users.some((user) => user.id === id)) {
        res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } else {
        res.status(404).json({ message: "Usuário não encontrado" });
    }
});

//deletando um usuário
app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    users = users.filter((user) => user.id !== id);

    res.status(200).json({ message: "Usuário deletado com sucesso" });
});




app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});