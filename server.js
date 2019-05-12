const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');


const orderRoutes = require('./api/routers/orders');
const productRoutes = require('./api/routers/products');


// body-parser header (코드가 놓이는 위치 중요, 아래의 서브경로 앞에 선언)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// DB Connection
const db = require('./config/key').mongoURI;
mongoose
    .connect(db, { useNewUrlParser:true })
    .then( () => console.log("MongoDB Connected..."))
    .catch( err => console.log(err));

mongoose.Promise = global.Promise; 


app.use(morgan('dev'));
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

app.get('/',(req, res) => {
    res.send('Root');
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }        
    });
});



const PORT = 3000;
const server = http.createServer(app);

server.listen(PORT, console.log('Server Started....'));
