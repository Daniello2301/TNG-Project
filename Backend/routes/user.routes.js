const { Router } = require('express');
const userController = require('../controllers/user');
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });


const router = Router();

router.get('/user/:id', userController.getUserUID);
router.get('/users', userController.getUsers);

router.post('/auth', userController.login);
router.post('/sign-up', userController.register);


router.post("/upload", upload.single("avatar"), userController.upload);

module.exports = router;