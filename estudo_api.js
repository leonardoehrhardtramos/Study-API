import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import VendaMensal from "./VendaMensal.js";

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,);
        console.log("MongoDB conectado");
    } catch (error) {
        console.log("Erro ao conectar ao MongoDB:", error);
    }
};
connectDB();

//criação de uma venda mensal
app.post("/vendas", async (req, res) => {
    try {
        const novaVendaMensal = await VendaMensal.create(req.body);
        res.status(201).json(novaVendaMensal);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar venda mensal" });
    }
});



//obter todas as vendas mensais
app.get("/vendas", async (req, res) => {
    try {
        const vendasMensais = await VendaMensal.find();
        res.status(200).json(vendasMensais);
    } catch (error) {
        res.status(500).json({ error: "Erro ao obter vendas mensais" });
    }
});

//obter uma venda mensal específica
app.get("/vendas/:id", async (req, res) => {
    try {
        const vendaMensal = await VendaMensal.findById(req.params.id);
        if (!vendaMensal) {
            return res.status(404).json({ error: "Venda mensal não encontrada" });
        }
        res.status(200).json(vendaMensal);
    } catch (error) {
        res.status(500).json({ error: "Erro ao obter venda mensal" });
    }
});

//alterando uma venda mensal específica
app.put("/vendas/:id", async (req, res) => {
    try {
        const vendaMensalAtualizada = await VendaMensal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendaMensalAtualizada) {
            return res.status(404).json({ error: "Venda mensal não encontrada" });
        }
        res.status(200).json(vendaMensalAtualizada);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar venda mensal" });
    }
});


//deletando uma venda mensal específica
app.delete("/vendas/:id", async (req, res) => {
    try {
        const vendaMensalDeletada = await VendaMensal.findByIdAndDelete(req.params.id);
        if (!vendaMensalDeletada) {
            return res.status(404).json({ error: "Venda mensal não encontrada" });
        }
        res.status(200).json({ message: "Venda mensal deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar venda mensal" });
    }
});



















app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});