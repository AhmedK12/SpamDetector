const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel');

const authenticationCheck = async function(req,res,next){
    try{
      let token = req.headers.authorization;
      if (!token) return res.send({ status: false, message: "token must be present" });
     let bearerToken = token.split(" ")[1]
    // let token req.headers.authorization= req.header.authorization.split(" ")[1];
     
     jwt.verify(bearerToken, "jason-likas",async function (err, decodedToken) {
        if (err) {
             return res.status(401).send({ status: false, message: "invalid token" })
        } else {
            
            req.headers.phone = (await userModel.findByPk(decodedToken.id)).dataValues.phone
            next()
        }
    })
    
  }
  catch(err){
    return res.status(500).send({status:false,message:err.message})
  }
  }

  module.exports.authenticationCheck=authenticationCheck