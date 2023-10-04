
import express from 'express';
import session from 'express-session'
import cookieParser from 'cookie-parser';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import handlebars from 'express-handlebars';
import sessionsRouter from "./routes/sessions.router.js";
import { Server } from 'socket.io';
import "./db/dbConfig.js";
//import productManager from './managers/products/ProductManager.js';
import { Message } from './db/models/messages.models.js';
import { productsMongo } from './managers/products/ProductsMongo.js';
import MongoStore from 'connect-mongo';
import viewsRouter from "./routes/views.router.js";
import jwtRouter from "./routes/jwt.router.js"
import FileStore from 'session-file-store';
import mongoose from 'mongoose';
import { __dirname } from './utils.js';
import passport from 'passport';
import './passport/passportStrategies.js'

const app = express();
const fileStorage = FileStore(session);


//codigo del sessi

// app.use(session({
//   store: new MongoStore({
//     mongoUrl: "mongodb+srv://alejososa1987:Mongo54321@cluster0.donqjdb.mongodb.net/entregaDataBase?retryWrites=true&w=majority",
//     ttl: 3600,
//   }),
//   secret: "secretSession",
//   resave: false,
//   saveUninitialized: false,
// }));

//passport
app.use(passport.initialize())
// app.use(passport.session())


//handlebars

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Estas dos líneas son claves para que el servidor entienda e interprete lo que pasa
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//cookies

app.use(cookieParser("secretKeyCookies"))


app.get("/guardarcookie", (req, res) => {
  res.cookie("cookie1", "primeraCookie").send()
})
app.get("/leercookie", (req, res) => {
  console.log(req);
  const { cookie1 } = req.cookies
  res.json({ message: "Leyendo cookie", ...req.cookies, ...req.signedCookies });
})
app.get("/eliminarcookie", (req, res) => {
  res.clearCookie("cookie1").send("eliminando cookie")
})
app.get("/guardarcookiefirmada", (req, res) => {
  res.cookie("cookienormal", "primera cookie", { signed: true }).send()
})



// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/views', viewsRouter);
app.use('/api/views/delete/:id', viewsRouter);
app.use('/api/jwt', jwtRouter);

app.use('/api/sessions', sessionsRouter);

//y sus rutas
//rutas para la session


app.get("/register", (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render("login");
});

app.get('/profile', (req, res) => {
  res.render('profile', {
    user: req.session.user
  });
});



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

  socket.on("addProduct", async (newProduct) => {
    const addedProduct = await productsMongo.createOne(newProduct);
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
