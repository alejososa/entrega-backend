
import express from 'express';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import { __dirname } from './utils.js';
import  handlebars  from 'express-handlebars';
import viewsRouter from "./routes/views.router.js";
import { Server } from 'socket.io';
import productManager from './ProductManager.js';

const app = express();

// Estas dos líneas son claves para que el servidor entienda e interprete lo que pasa
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));

//handlebars

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/views', viewsRouter);


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

  socket.on("addProduct", (newProduct)=>{
    const addProduct= productManager.addProduct(newProduct);
    socketServer.emit("addProduct", addProduct);
  })

});
