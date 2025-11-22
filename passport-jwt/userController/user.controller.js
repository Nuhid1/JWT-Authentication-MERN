require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.registerRoute= async(req, res)=>{
   try {
     const user = await User.findOne({username: req.body.username});

    if(user){
       return res.status(400).send("user already exist")
    }

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) =>{
    const newUser = new User({
        username: req.body.username,
        password: hash
    });

    await newUser.save().then((user)=>{
        res.send({
            success: true,
            message: "user is created",
            user: {
                id: user._id,
                name: user.username
            }
        })
    }).catch((error)=>{
        res.send({
            success: false,
            message: "user not created",
            error: error
        })
    })
});
   } catch (error) {
    res.status(500).send(error.message)
   }
};

exports.loginRoute = async (req, res)=>{
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(401).send({
                success: false,
                message: "user not found"
            })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).send({
                success: false,
                message: "incorrect password"
            })
        }

       const payload = {
        id: user._id,
        username: user.username
       }

       const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1d"
       });
       
       return res.status(200).send({
        success: true,
        message: "logged in goodly",
        token: "Bearer " + token
       })
        
    } catch (error) {
       return res.status(500).send({
        success: false,
        message: "server error",
        error: error.message
    }); 
    }
};

exports.getProfile = (req, res) =>{
       return res.status(200).send({
           success: true,
         user: {
            id: req.user._id,
            username: req.user.username
         }
        })
    };