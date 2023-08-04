const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// route : POST /api/user/register
// public
router.post('/register', async (req, res) => {
    try {

        const { firstname, lastname, email, password } = req.body;

        if(!(email && firstname && lastname && password)) {
            res.status(400).json({ message: "All fields are required." });
        }

        const oldUser = await User.findOne({email: email});

        if(oldUser) {
            res.status(409).json({ message: "User already exists." });
        }

        const encryptedPassword = await bcrypt.hash(password, 8);

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: encryptedPassword,
        });

        // create token
        const token = await jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {expiresIn:"1h"}
        );


        user.token = token;

        res.status(201).json({message: "user is created.", user});

    } catch(err) {
        console.log('error in register user');
        console.error(err);
    }
});


// route : POST /api/user/login
// public
router.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body;

        if(!(email && password)) {
            res.status(409).json("All Fields are required.");
        }

        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))) {

            // create token
            const token = await jwt.sign(
                {user_id: user._id, email},
                process.env.TOKEN_KEY,
                {expiresIn:'1h'} 
            );

            user.token = token;

            res.status(200).json({message: "login uccessfull", user});
        }
        res.status(401).json({message: "Invalid Credentials."});

    } catch(err) {
        console.log("error in login");
        console.error(err);
    }
});


module.exports = router;