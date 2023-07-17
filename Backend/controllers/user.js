const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const { getDatabase, ref, set, get, child } = require("firebase/database");
const { getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const storageDb = require('firebase/storage');
const { v4 } = require('uuid')



const storage = storageDb.getStorage();
const auth = getAuth();
const database = getDatabase();

const login = async (req, res) => {

    const { email, password } = req.body

    try {
        await signInWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                // Signed in
                const user = userCredential.user;
                const id = userCredential.user?.uid

                await get(child(ref(database), `/users/${id}`)).then((u) => {
                    if (u.exists()) {
                        res.status(200).json({
                            msg: "Login Succesfully!",
                            user: u,
                            userUID: user?.uid,
                            userData: user?.reloadUserInfo,
                            userTokens: user?.stsTokenManager
                        });
                    } else {
                        res.status(404).json({msg:"No data available"});
                    }
                }).catch((error) => {
                    res.status(500).send(error);
                });
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

                res.status(500).json({ errorCode: errorCode, errorMessage: errorMessage });

            });

    } catch (error) {
        res.status(500).send(error)
    }
};


const register = async (req, res) => {
    try {

        const { email, password, ...data } = req.body

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                data.email = email;
                data.role = req.body.role.toUpperCase() || "USER";

                if (user) {
                    set(ref(database, 'users/' + user.uid), data)
                        .then(() => {
                            res.status(200).json({
                                msg: "Register Succesfully!",
                                userUID: user?.uid,
                                userData: data,
                                reloadUserInfo: user?.reloadUserInfo,
                                userTokens: user?.stsTokenManager
                            })
                        })
                        .catch((err) => {
                            res.status(500).json({ errorCode: err?.errorCode, errorMessage: err?.errorMessage });
                        });
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                res.status(500).json({ errorCode: errorCode, errorMessage: errorMessage });

            });
    } catch (error) {
        res.status(500).send(error)
    }
};

const getUserUID = async (req, res) => {
    try {
        const { id } = req.params;

        get(child(ref(database), `/users/${id}`)).then((user) => {
            if (user.exists()) {
                res.status(200).json(user)
                console.log(user);
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

const getUsers = async (req, res) => {
    try {
        await get(ref(database, `/users`)).then((users) => {
            if (users.exists()) {
                res.status(200).json(users.val())
                console.log(users);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    } catch (error) {
        res.status(500).json(error)
    }
}

const upload = async (req, res) => {
    try {

        const UUID = v4();
        const dateTime = new Date;

        const storageRef = storageDb.ref(storage, `images/${req.file.originalname + UUID + dateTime.toString()}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('File successfully uploaded.');
        return res.send({
            message: 'file uploaded to firebase storage',
            UUID: UUID,
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = {
    login,
    register,
    getUserUID,
    getUsers,
    upload
}


