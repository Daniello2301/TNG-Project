const { getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const { getDatabase, ref, set, get, child, remove } = require("firebase/database");
const storageDb = require('firebase/storage');
const { v4 } = require('uuid');
const productValidator = require('../helpers/product.validator');

const storage = storageDb.getStorage();
const database = getDatabase();

/**
 * Creates a new product in the database and stores an associated image in Firebase Storage.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 */
const createProduct = async (req, res) => {
    try {

        // Validate the product fields
        const errors = productValidator(req);
        if(errors.length > 0){
            return res.status(500).send(errors);
        }

        // Generate a UUID and get the current date and time
        const UUID = v4();
        const dateTime = new Date;

        // Get the data from the request body
        const { ...data } = req.body;

        // Create a reference to Firebase storage for the product image
        const storageRef = storageDb.ref(storage, `products/${UUID + "_" + req.file.originalname + " " + dateTime.toString()}`);
        // Define the image metadata
        const metadata = { contentType: req.file.mimetype };

         // Upload the image file to Firebase storage
        const fileSaved = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        // Get the download URL of the saved image
        await getDownloadURL(fileSaved.ref).then((reference) => {

            // Update the product data with the image URL and other details
            const images = [{ url: reference, name: req.file.originalname }];
            data.images = images;
            data.enable = true;

            // Save the product in the Firebase database
            set(ref(database, `products/${UUID}`), data).then((product) => {

                // Send a successful response with the details of the saved product
                return res.status(200).send({
                    message: 'Prduct saved!',
                    product: {
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        images: { url: reference, name: req.file.originalname },
                        product
                    },
                });

            }).catch((err) => {
                // In case of an error, send a response with a status code of 500 and the error
                return res.status(500).send({ err });
            });
        }).catch((err) => {
            // In case of an error, send a response with a status code of 500 and the error
            res.status(500).json(err);
        })
    } catch (error) {
        // In case of an error, send a response with a status code of 500 and the error
        res.status(500).json(error);
    }
}

const addImages = async (req, res) => {
    try {

        const UUID = v4();
        const dateTime = new Date;
        const { id } = req.params;

        const productFound = await get(ref(database, `/products/${id}`));
        
        if (productFound.exists()) {

            const storageRef = storageDb.ref(storage, `products/${UUID + "_" + req.file.originalname + " " + dateTime.toString()}`);
            const metadata = { contentType: req.file.mimetype };

            const fileSaved = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            const imgURL = await getDownloadURL(fileSaved.ref);

            const product = productFound.val();
            const images = product.images;
            const newImages = [...images, { url: imgURL, name: req.file.originalname }]

            await set(ref(database, `products/${productFound.key}/images`), newImages)
            .then((newImages) => {
                return res.status(200).json({msg:"Image successfully uploaded!!", newImages})
            })
            .catch((err) =>{
                return res.statu(500).json(err)
            });
        }else{
            return res.statu(404).json({msg:"Data not found"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const productFound = await get(ref(database, `/products/${id}`));
        
        if (productFound.exists()) {

            const product = productFound.val();

            const { ...data } = req.body

            const newProduct = {
                name: data.name ? data.name : product.name,
                description: data.description ? data.description : product.description,
                price: data.price ? data.price : product.price,
                quantity: data.quantity ? data.quantity : product.quantity,
                enable: data.enable ? data.enable : product.enable,
                images: product.images
            }

            await set(ref(database, `products/${productFound.key}`), newProduct)
            .then((productSaved) => {
                return res.status(200).json({msg:"Product updated successfully!!",id: productFound.key,  newProduct, data})
            })
            .catch((err) =>{
                return res.statu(500).json(err)
            });
            
        }else{
            return res.statu(404).json({msg:"Data not found"})
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const getProducts = async (req, res) => {
    try {
        await get(ref(database, `/products`)).then((products) => {
            if (products.exists()) {
                res.status(200).json(products.val());
                console.log(products);
            } else {
                res.status(404).json({ msg: "No data available" });
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        get(child(ref(database), `/products/${id}`)).then((product) => {
            if (product.exists()) {
                res.status(200).json({id: product.key, product:product.val()})
                console.log(product);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteProduct = async(req, res) => {
    try {
        
        const { id } = req.params;

        await get(child(ref(database), `/products/${id}`)).then(async(product) => {
            if (product.exists()) {
                const productFound = product.val();

                productFound.quantity = 0;
                console.log(productFound);
                await set(ref(database, `products/${product.key}`), productFound);
                return res.status(200).json({ msg: "Product removed" });
            } else {
                res.status(500).json({msg:"No data available"});
            }
        }).catch((error) => {
            res.status(500).json({error});
            console.error(error);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}



module.exports = {
    createProduct,
    updateProduct,
    getProducts,
    getProductById,
    addImages,
    deleteProduct
}
