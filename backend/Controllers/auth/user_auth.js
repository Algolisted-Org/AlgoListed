// const sayHello = (req,res)=>{
//     res.json("Hello there, I am Atanu Nayak!") ;
// }

const signup = async(req,res)=>{
    const { email, name, password } = req.body;

    res.status(200).json(`SignUp : Hello ${name}, your email id is ${email} with password ${password}`);
}

const login = async(req,res)=>{
    const { email, name, password } = req.body;

    res.status(200).json(`Login : Hello ${name}, your email id is ${email} with password ${password}`);
}



module.exports = { signup, login };