
import express from 'express';
import session from 'express-session'
import productRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import  handlebars  from 'express-handlebars';
import sessionsRouter from"./routes/sessions.router.js";
import { Server } from 'socket.io';
import "./db/dbConfig.js";
//import productManager from './managers/products/ProductManager.js';
import { Message } from './db/models/messages.models.js';
import { productsMongo } from './managers/products/ProductsMongo.js';
import MongoStore from 'connect-mongo';
import viewsRouter from "./routes/views.router.js";
import FileStore  from 'session-file-store';
import mongoose from 'mongoose';
const fileStorage= FileStore(session);


import { __dirname } from './utils.js';
const app = express();


//codigo del session
app.use(session({
  store:  MongoStore.create({
    mongoUrl: "mongodb+srv://alejososa1987:Mongo54321@cluster0.donqjdb.mongodb.net/entregaDataBase?retryWrites=true&w=majority",
    ttl:3600,
  }),
  secret:"CoderS3cret",
  resave:false,
  saveUninitialized: false,
}));

//handlebars

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Estas dos líneas son claves para que el servidor entienda e interprete lo que pasa
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));





// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/views', viewsRouter);
app.use('/api/views/delete/:id', viewsRouter);
app.use('/api/sessions', sessionsRouter);
//ruta al chat 

app.get('/chat', async (req, res) => {
  const messages = await Message.find().sort('-timestamp'); // Obtén los mensajes de la base de datos
  res.render('chat', { messages });
});



const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`)
})

//Sockets

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  console.log('Cliente conectado', socket.id);
  socket.on('disconnect', () => {
    console.log(`Cliente desconectado`);
  });

//le agregamos  un producto

  socket.on("addProduct",  async(newProduct)=>{
    const addedProduct= await productsMongo.createOne(newProduct);
      socketServer.emit("product created", addedProduct);
  });

  socket.on('deleteProduct', (productId) => {
    productsMongo.deleteOne(Number(productId));
    socketServer.emit('productDeleted', productId); 
    socketServer.emit('newProductList'); 
  });

  socket.on('chatMessage', async (messageData) => {
    const { user, message } = messageData;
    const newMessage = new Message({ user, message });
    await newMessage.save();

    // Emitir el mensaje a todos los clientes conectados
    socketServer.emit('chatMessage', { user, message });

    console.log(`Mensaje guardado en la base de datos: ${user}: ${message}`);
  });




});
