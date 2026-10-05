const express = require('express');
const router = express.Router();

const productServices = require('../services/productServices')

router.get('/', async function(req,res ){
    const products = await productServices.getAllProducts();
    res.json(products);
})

router.get('/:productId', async function(req,res){
    const product = await productServices.getProductById(req.params.productId);
    res.json(product);
})

module.exports = router;