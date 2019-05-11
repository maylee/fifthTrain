const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');
const orderModel = require('../models/order');
const productModel = require('../models/product');

// Get All Order Info
router.get('/', (req, res) => {
  orderModel.find()
    .select("product quantity _id")
    .exec()
    .then( docs => {
      res.status(200).json({
        count: docs.length,
        order: docs.map( doc => {
          return{
             orderId: doc.id,
             productId: doc.product,
             quantity: doc.quantity
        }
        })
      });
    })
    .catch( err => {
      res.status(500).json({
        //ord_err: "주문정보조회에 문제가 생겼습니다."
        ord_err: err
      });
    });
});

// Get Order Info by OrderId Parameter
router.get('/:orderId',(req,res) => {
  const id = req.params.orderId;
  orderModel.findById(id)
    .exec()
    .then( order => {
      if (!order) {
        return res.status(400).json({
          ord_err: "주문정보를 찾지 못했습니다."
        });
      }
      res.status(200).json({
        orderInfo : order
      });
    })      
    .catch( err => {
      res.status(500).json({
        ord_err: "주문정보 조회에 문제가 발생하였습니다."
      });
    });
});

// Register Order Info - POST
router.post('/', (req, res) => {
  productModel.findById(req.body.productId)
  .then( product => {
    if(!product){
      return res.status(404).json({
        prd_err: "해당상품 정보를 찾지 못했습니다."
      });
    }
    const order = new orderModel({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product : req.body.productId
    });
    return order.save();
  })
  .then( result => {
    console.log(result);
    res.status(201).json({
      prd_msg: "주문이 처리 되었습니다.",
      createdOrder: {
        _id: result._id,
        product: result.prodcut,
        quantity: result.quantity
      }
    });
  })
  .catch( err => {
    console.log(err);
    res.status(500).json({
      prd_err: err
    });
  });
});


// patch
router.patch('/',(req,res) => {
  res.status(200).json({
    ord_msg:"PATCH / orders"
  });
});

// delete
router.delete('/',(req,res) => {
  res.status(200).json({
    ord_msg:"DELETE / orders"
  });
});

module.exports = router;
