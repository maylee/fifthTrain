const express = require('express');
const router = express.Router() ;

const mongoose = require('mongoose');
const productModel = require('../models/product');

// Get All productInfo from DB
router.get('/', (req, res) => {
    productModel
      .find()
      .exec()
      .then( docs =>{
        console.log(docs);
        res.status(200).json({
          product_Info: docs
        });
      })
      .catch( err => {
        console.log(err);
        res.status(500).json({
          product_err: err
        });
      });
  });

// post
router.post('/', (req, res) => {
    const productInfo = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(200).json({
        prd_msg:"POST / proudcts",
        productInfo: productInfo
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