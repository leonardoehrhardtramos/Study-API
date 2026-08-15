import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

const connectDB =async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,);
        console.log("MongoDB conectado");
    } catch (error) {
        console.log("Erro ao conectar ao MongoDB:", error);
    }
};
connectDB();

app.post("/vendas")
    
    























app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});