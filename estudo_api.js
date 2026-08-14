import express from "express";

const app = express();
const port = 3000;

app.use(express.json());


let tarefas = [
    { id: 1, titulo: "Fazer compras", descricao: "Fazer compras no supermercado", concluida: false },
    { id: 2, titulo: "Estudar JavaScript", descricao: "Estudar JavaScript e suas funcionalidades", concluida: false },
    { id: 3, titulo: "Fazer exercícios", descricao: "Fazer exercícios físicos", concluida: false }
];

app.get("/tarefas", (req, res) => {
    res.status(200).json(tarefas);
});


app.get("/tarefas/:id", (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        res.status(200).json(tarefa);
    } else {
        res.status(404).json({ mensagem: "Tarefa não encontrada" });
    }
});

app.post("/tarefas", (req, res) => {
    const { titulo, descricao } = req.body;
    if (!titulo || !descricao) {
        return res.status(400).json({ mensagem: "Título e descrição são obrigatórios" });
    } else {
        const novaTarefa = {
            id: tarefas.length + 1,
            titulo,
            descricao,
        };
        tarefas.push(novaTarefa);
        
        res.status(201).json(novaTarefa);
    }
});

app.put("/tarefas/:id", (req, res) => {
    const id = Number(req.params.id);
    const { titulo, descricao } = req.body
    if (!titulo || !descricao) {
        return res.status(400).json({ mensagem: "Título e descrição são obrigatórios" });
    }
    if (id < 1 || id > tarefas.length) {
        return res.status(404).json({ mensagem: "Tarefa não encontrada" });
    } else {
        const tarefaAtualizada = {
            id,
            titulo,
            descricao
        };
        tarefas = tarefas.map(t => t.id === id ? tarefaAtualizada : t);
        res.status(200).json(tarefaAtualizada);
    }
});

app.delete("/tarefas/:id", (req, res) => {
    const id = Number(req.params.id);
    if (id < 1 || id > tarefas.length) {
        return res.status(404).json({ mensagem: "Tarefa não encontrada" });
    } else {
        tarefas = tarefas.filter(t => t.id !== id);
        res.status(204).send();
    }
});























app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});