const { Router } = require('express')
const product = require('../controllers/product');
const multer = require("multer");
const { check } = require('express-validator')

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/product/create',
        upload.single('images'), 
        product.createProduct);

router.put('/product/add-imgs/:id',upload.single('images'), product.addImages);

router.put('/product/update/:id', product.updateProduct);

router.get('/products', product.getProducts);
router.get('/product/:id', product.getProductById);

router.put('/product/delete/:id',product.deleteProduct);
module.exports = router;