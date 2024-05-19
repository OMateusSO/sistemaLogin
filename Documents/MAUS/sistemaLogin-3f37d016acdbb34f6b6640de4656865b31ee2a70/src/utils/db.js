import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Conexão com o banco de dados MongoDB estabelecida.");
  } catch (error) {
    console.error("Erro ao conectar-se ao banco de dados MongoDB:", error);
    throw new Error(error);
  }
}
