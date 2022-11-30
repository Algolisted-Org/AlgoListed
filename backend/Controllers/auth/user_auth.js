const UsersModel = require("../../Models/userModel");
const bcrypt = require("bcrypt"); 
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UsersModel.findOne({email : email});
        if(existingUser) {
            return res.status(400).json({message : "User with this email, already exists!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const result = await UsersModel.create({
            email, 
            password : hashedPassword,
        })

        const token = jwt.sign({email : result.email, id : result._id}, SECRET_KEY);
        res.status(201).json({user : result, token : token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong !"});
    }

    // If you want use .save, but above we .create so no need to save.

    // new UsersModel({
    //     email,
    //     password,
    // }).save((err, result) => {
    //     if (err) res.status(400).json({ "err": err, "msg": "A user cannot be added!" });
    //     else res.status(200).json("User added succesfully !!!");
    // })
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UsersModel.findOne({email : email});
        
        if(!existingUser) {
            return res.status(400).json({message : "User does not exist!"});
        }
        
        const passwordMatched = await bcrypt.compare(password, existingUser.password);

        if(!passwordMatched){
            return res.status(400).json({message : "Password does not match!"});
        }

        const token = jwt.sign({email : existingUser.email, id : existingUser._id}, SECRET_KEY);
        res.status(200).json({user : existingUser, token : token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong !"});
    }
}



module.exports = { signup, login };