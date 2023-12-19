const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController, getProductController, updateProductController, getSingleProductController,
    productPhotoController, deleteProductController, productFilterController, productCountController, productListController } = require('../controllers/productController');
const formidableMiddleware = require('express-formidable-v2');

const router = express.Router();

//routes
//Create Product || POST
router.post('/create-product', requireSignIn, isAdmin, formidableMiddleware(), createProductController);

//update Product || PUT
router.put('/update-product/:id', requireSignIn, isAdmin, formidableMiddleware(), updateProductController);

//Get Products
router.get('/get-product', getProductController);

//Get single
router.get('/get-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:pid', productPhotoController);

//delete product
router.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProductController);

//filter product
router.post('/product-filters', productFilterController);

//product Count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);

module.exports = router;