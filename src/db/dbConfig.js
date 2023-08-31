import mongoose from "mongoose";

const URI = `mongodb+srv://alejososa1987:Mongo54321@cluster0.donqjdb.mongodb.net/entregaDataBase?retryWrites=true&w=majority`


mongoose.connect(URI)
    .then(() => console.log("conectado a la base de datos"))
    .catch(error => console.log("error"))



