const http = require('http');
const express = require('express');
const app = express();
const morgan = require('morgan');

const orderRoutes = require('./api/routes/orders');
const productRoutes = require('./api/routes/products');

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
