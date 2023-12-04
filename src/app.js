
import express from "express";
import config from "./config.js";
import viewRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import "./persistencia/db/dbConfig.js";
import cookieParser from "cookie-parser";
import socketProducts from "./listeners/socketProducts.js";
import session from "express-session";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./services/passport/passportStrategies.js";
import { generateProducts } from "./mocks/mockingproducts.js";
import ProductError from "./errors/customErrors.js";
import { ErrorMessages } from "./errors/numErrors.js";
import {errorMiddleware} from "./errors/middlewareError.js";
import { logger } from "./winston.js";

const app = express();
const PORT = process.env.PORT || 8080;
const fileStore = FileStore(session)

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Sessions
app.use(cookieParser());
app.use(session({
        store: MongoStore.create({
        mongoUrl: config.mongo_uri,
        ttl: 60000,
    }),
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
}));

app.use(express.static(__dirname+"/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views");

app.use("/api/views", viewRouter);
app.use("/api/products", productsRouter);
app.use("/api/views/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/session", sessionsRouter);


app.get('/', (req, res) => {
    res.send('Bienvenidos!');
});

app.get('/chat', (req, res) => {
    res.render('chat', { messages: [] }); 
});

app.get('/login', (req, res) => {
    res.render('login'); 
});
  
app.get('/register', (req, res) => {
    res.render('register'); 
});
  
app.get('/profile', (req, res) => {
    res.render('profile', {
    user: req.session.user,
    }); 
});
  
// Passport
app.use(passport.initialize())
app.use(passport.session())

const httpServer = app.listen(PORT, () => {
    logger.info(`Conectado al puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

const mensajes = [];

socketProducts(socketServer);


// Mocking Products
app.get("/api/mockingproducts", (req, res) => {
    const mockProducts = [];
    for (let i = 0; i < 100; i++) {
        const productsMock = generateProducts();
        mockProducts.push(productsMock);
    }
    res.json(mockProducts);
});

// Error
app.get("/products", (req, res) => {
    
    ProductError.createError(ErrorMessages.PRODUCT_NOT_FOUND)
        
});

app.use(errorMiddleware);

// Logger
app.get("/loggerTest", (req, res) => {
    logger.fatal("Fatal");
    logger.error("Error");
    logger.warning("Warning");
    logger.info("Info");
    logger.http("Http");
    logger.debug("Debug");
    res.send("Logger Test");
});
