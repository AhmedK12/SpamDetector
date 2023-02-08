const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const sequelize = require("../config/database");
const jwt = require("jsonwebtoken");
const numberModel = require('../models/numberModel');
const validation = require('../validators/validator')




sequelize.sync({ force: false });
userModel.hasMany(numberModel)


/******************************************************************Registered API *****************************************************************/


const registerUser = async (req, res) => {
  try {
    let user = {};
    
    req.body.email && (user.email = req.body.email.trim())
    user.phone = req.body.phone
    user.name = req.body.name;
    user.password = (await bcrypt.hash(req.body.password.trim(), 10)).toString();
    if(await userModel.findOne({where:{ phone : user.phone }})) return res.status(409).send({status:false,message:"User Already Exists"});
    let userSaved = await userModel.create(user);
    return res.status(201).send({ status: false, message: "User Registered SuccessFully!",data:userSaved});
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
}



/******************************************************************LOGIN API *****************************************************************/



const userLogin = async function (req, res) {
  try {
    const { phone, password } = req.body; //destructioring
    

    const user = await userModel.findOne({where: { phone: phone}});
    if (!user) {
      return res.status(403).send({ status: false, message: "Login failed! Wrong Phone Number or password." });
    }

    let hashedPassword = await bcrypt.compare(password.trim(), user.password);

    if (!hashedPassword)
      return res
        .status(403)
        .send({ status: false, message: "Login failed! Wrong Phone Number or password." });

    //Token Generation

    var token = jwt.sign(
      {
        id: user.id.toString(),
        iat: Math.floor(new Date().getTime() / 1000),
      },
      "jason-likas",
      {
        expiresIn: "72h", // token expire date
      }
    );

    // req.header("x-api-key", token); //setting headers
    return res.status(200).send({status: true,message: "login successfully", data: { id: user.id.toString(), token: token }});
  } catch (error) {
    res.status(500).send({ status: false, Error: error.message });
  }
};



















module.exports.registerUser = registerUser;
module.exports.userLogin = userLogin;

