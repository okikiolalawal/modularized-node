const userModel = require ("../models/userModel");
const jwt = require("jsonwebtoken")
const studentArray = []
const addStudent = async (req, res)=>{
   
    const userId= Math.floor(Math.random() * 10e5)
    //console.log(req.body)
    const userObj = 
    { 
        userId, 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password : req.body.password
    }

let form = new userModel(userObj)
console.log(form.email, form.password)
form.save()
.then(() => 
{
    console.log("Saved successfully")
 res.send({ status: true, message: "Student saved successfully" });
})
.catch((err)=>{
    console.log(err)
   res.send({status:false,message:"There's an error"+err})
})
}
const login =(req,res)=>{
console.log(req.body)
let {email,password}= req.body
userModel.findOne({email:email})
.then((user)=>{
    console.log(user)
    if(!user){
        res.send({status:false,message:"user not found"})
    }
    else{
        let secret = process.env.SECRET
        user.validatePassword(password,(err,same)=>{
            if(!same){
                res.send({status:false,message:"Invalid Password"})
            }
            let token = jwt.sign({email},secret,{expiresIn:'3h'})
            res.send({status:true,message:"Correct Password",token})
            console.log(token )
        })
    }
})
}
const dashBoard= (req,res)=>
{
    let token =  req.headers.authorization.split(" ")[1];
    let secret = process.env.SECRET
    jwt.verify(token,secret,(err,result)=>{
        if(err)
        {
            console.log(err)
            res.send({status:false,message:"Invalid token"})
        }else
        {
            res.send({status:true,message:"welcome",result})
            console.log(result.email)
        }
    })
}

module.exports = {addStudent,login} 