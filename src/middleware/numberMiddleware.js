const userModel = require('../models/userModel')
const numberModel=require('../models/numberModel')
const validator = require('../validators/validator')




const validateSpamRequest = async (req,res,next)=>{
    
    try {
        if(Object.keys(req.body).length === 0) return res.status(400).send({ status: false, msg: "No Data Found!" });
    let errMsg = {}
    errMsg.phone = req.body.phone===undefined?"Phone Number Required!":validator.isValidPhone(req,'phone')?false:"Invalid Phone Number";
    errMsg.contactOf = req.body.contactOf===undefined?false:validator.isValidPhone(req,'contactOf')?false:"Invalid Phone Number";
    errMsg.name = req.body.name ===undefined?false:validator.isValidName(req)?false:"Invalid Name";
    
    Object.keys(errMsg).forEach(key => errMsg[key] === false && delete errMsg[key])
    if(Object.keys(errMsg).length!==0) return res.status(400).send({status:false,msg:errMsg})

   
    next()
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}


module.exports.validateSpamRequest = validateSpamRequest;