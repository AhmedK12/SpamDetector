const userModel = require('../models/userModel')
const numberModel=require('../models/numberModel')
const validation = require('../validators/validator')






const validateRegisterRequest = async (req,res,next)=>{
    try {
        if(Object.keys(req.body).length === 0) return res.status(400).send({ status: false, msg: "No Data Found!" });
    let errMsg = {}
    errMsg.phone = req.body.phone===undefined?"Phone Required":validation.isValidPhone(req,'phone')?false:"Invalid Phone Number";
    errMsg.name = req.body.name===undefined?"Name Required":validation.isValidName(req)?false:"Invalid Name";
    errMsg.password = req.body.password===undefined?"Password Required":validation.isValidPassword(req.body.password)?false:"Invalid Password!  Password length is in between 8-15, contain at least one Lowercse and one Uppercase and one Number and one special charactor ";
    errMsg.email = req.body.email ===undefined?false:validation.isValidEmail(req.body.email)?false:"Invalid Email";
    Object.keys(errMsg).forEach(key => errMsg[key] === false && delete errMsg[key])
       if (Object.keys(errMsg).length!==0) return res.status(400).send({status:false,msg:errMsg})
   
    next()
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }

    
}




const validateLoginRequest = async (req,res,next)=>{
    try {
        let errMsg ={}
    errMsg.phone = req.body.phone===undefined?"Phone Required":validation.isValidPhone(req,'phone')?false:"Invalid Phone Number";
    errMsg.password = req.body.password===undefined?"Password Required":validation.isValidPassword(req.body.password.trim())?false:"Invalid Password";
    Object.keys(errMsg).forEach(key => errMsg[key] === false && delete errMsg[key])
        if(Object.keys(errMsg).length!==0) return res.status(400).send({status:false,msg:errMsg})

    next()
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}



module.exports.validateLoginRequest = validateLoginRequest
module.exports.validateRegisterRequest = validateRegisterRequest