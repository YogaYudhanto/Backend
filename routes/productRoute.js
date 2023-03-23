const express = require('express');
const router = express.Router()
const {createProduct, getProduct, getOneProduct, updateProduct, deleteProduct} = require('../controllers/productController')

router.post('/createproduct', createProduct)
router.get('/getallproduct', getProduct)
router.get('/getoneproduct/:id', getOneProduct)
router.put('/updateproduct/:id', updateProduct)
router.delete('/deleteproduct/:id', deleteProduct)

module.exports = router