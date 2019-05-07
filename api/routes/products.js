const express = require('express');
const router = express.Router() ;

// get
router.get('/',(req,res)=> {
    res.status(200).json({
        prd_msg: "GET /products"
    });
});

// get with parameter
router.get('/:productId',(req,res) => {
    if (req.params.productId === 'special') {
        res.status(200).json({
            prd_msg:"GET / special product"
        });
    } else {
        res.status(200).json({
            prd_msg:"GET / normal product"
        });
    }
});

// post
router.post('/', (req, res) => {
    res.status(200).json({
        prd_msg:"POST / proudcts"
    });
});

// patch
router.patch('/', (req,res) => {
    res.status(200).json({
        prd_msg:"PATCH / products"
    });
});

// delete
router.delete('/', (req, res) => {
    res.status(200).json({
        prd_msg:"DELETE / products"
    });
});

module.exports = router;