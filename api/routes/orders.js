const express = require("express");
const router = express.Router();

// get
router.get("/", (req, res) => {
  res.status(200).json({
      ord_msg: "GET /orders"
  });
});

// get with parameter
router.get('/:orderId',(req,res) => {
  const id = req.params.orderId;
  if( id !== '123'){
      res.status(200).json({
          ord_msg: "Wrong ID"
      });
  } else {
      res.status(200).json({
        ord_msg: "Correct ID"
      });
  };
});


// post
router.post('/',(req,res) => {
  res.status(200).json({
    ord_msg:"POST / orders"
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
