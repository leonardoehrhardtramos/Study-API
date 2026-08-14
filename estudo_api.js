import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let produtos = [
    { id: 1, nome: "Produto A", preco: 10.0, categoria: "Categoria 1" },
    { id: 2, nome: "Produto B", preco: 20.0, categoria: "Categoria 2" },
    { id: 3, nome: "Produto C", preco: 30.0, categoria: "Categoria 3" },
];

// Rota para obter todos os produtos
app.get("/produtos", (req, res) => {
    res.status(200).json(produtos);
});

//Rota para obter um produto específico pelo ID
app.get("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);
    const produto = produtos.find((p) => p.id === id);
    if (produto) {
        res.status(200).json(produto);
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado" });
    }
});


// Rota para criar um novo produto
app.post("/produtos", (req, res) => {
    const { nome, preco, categoria } = req.body;
    if (preco <= 0) {
            return res.status(400).json({ mensagem: "Somente preços acima de zero são permitidos" });
        }
    if (!nome || !preco || !categoria) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    } else {
        const novoProduto = {
            id: produtos.length + 1,
            nome,
            preco,
            categoria
        };

        produtos.push(novoProduto);
        res.status(201).json(novoProduto);
    }
});

// Rota para atualizar um produto existente
app.put("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);
    const { nome, preco, categoria } = req.body;
    if (preco <= 0) {
            return res.status(400).json({ mensagem: "Somente preços acima de zero são permitidos" });
        }
    if (!nome || !preco || !categoria) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    } else {
        const produtoIndex = produtos.findIndex((p) => p.id === id);
        if (produtoIndex !== -1) {
            produtos[produtoIndex] = { id, nome, preco, categoria };
            res.status(200).json(produtos[produtoIndex]);
        } else {
            res.status(404).json({ mensagem: "Produto não encontrado" });
        }
    }
});

// Rota para excluir um produto existente
app.delete("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);
    const produtoIndex = produtos.findIndex((p) => p.id === id);
    if (produtoIndex !== -1) {
        produtos.splice(produtoIndex, 1);
        res.status(200).json({ mensagem: "Produto excluído com sucesso" });
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado" });
    }
});

































app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});