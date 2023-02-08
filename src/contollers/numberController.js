const numberModel = require('../models/numberModel');
const userModel = require("../models/userModel");
const validator = require('../validators/validator');

const sequelize = require('sequelize');
const { QueryError } = require('sequelize');


/******************************************************************SPAM Mark API *****************************************************************/


const spamMark = async (req, res) => {
    try {
    if(Object.keys(req.body).length === 0) return res.status(400).send({ status: false, msg: "No Data Found!" });
    let name = null,contactOf = null
     if(req.body.name) name = req.body.name;
     if(req.body.contactOf) contactOf = req.body.contactOf;
     let number = await numberModel.findOne({ where:{phone:req.body.phone,name:name,contactOf:contactOf}})
     if(number){
        numberModel.update({ spam: true }, { where: { phone: req.body.phone } });
        return res.status(200).send({ status: true ,message:"Marked Successfully"});
     }
     
     // else new number created in global numbers
     await numberModel.create({ spam: false , phone: req.body.phone,name:name,contactOf:req.body.contactOf } );
      return res.status(201).send({ status: true ,message:"Marked Successfully"});
    } catch (err) {
        console.log(err)
      res.status(500).send({ status: false, Error: err.message });
    }
  }

/******************************************************************NUMBERGETBYNUMBER API API *****************************************************************/


const GetByNumber = async (req,res)=>{
    req.body.phone = req.params.phone;
    if(req.body.phone ===undefined) res.status(400).send({status:false,msg:"Number required in Params"})
    if(!validator.isValidPhone(req,"phone")) res.status(400).send({status:false,msg:"Invalid Number"})
    let user = await userModel.findOne({attributes:['name','email','phone',],where:{ phone:req.body.phone}})
    

    if(user){
       let number = await numberModel.findOne({where:{phone:req.headers.phone,contactOf:req.body.phone}})
       let userSpam = await numberModel.findOne({attributes:['spam'],where:{phone:req.body.phone }})
       user.dataValues.spam = userSpam && true;
    
       if(number){
            return res.status(200).send({status:true,data:user});
        }
        delete user.dataValues.email;
        return res.status(200).send({status:true,data:user})
    }
    let numbers = await numberModel.findAll({attributes:['phone','spam','name'],where:{phone:req.body.phone}})
    if(numbers.length==0)
           return res.status(404).send({status:false,msg:"Phone Number Not Exist"});
 
    return res.status(200).send({status:true,data:numbers});
 
 }
 


/******************************************************************NUMBERGETBNAME API API *****************************************************************/





const GetByName = async (req,res)=>{
    let queryName = req.query.name;
    let limit = 20  // Default LIMIT
     if(req.query.limit!==undefined && req.query.name.trim()){
        limit = parseInt(req.query.limit)
     }
    let numbers = await numberModel.findAll({attributes:['name','phone','spam'],where: {
        name: {
            [sequelize.Op.like]: `${queryName}%`
        }
      },/*limit:limit*/});

      let numbers2 = await numberModel.findAll({attributes:['name','phone','spam'],where: {
        name: {
            [sequelize.Op.like]: `%${queryName}%`
        }
      },/*limit:limit*/});


    // let data =await validator.nearestCollege(queryName,numbers.map(e=>e.dataValues))
    if(numbers.length==0)
        return res.status(404).send({status:false,msg:"Name Not Exist"});
    return res.status(200).send({status:true,data:numbers.concat(numbers2)});
}



module.exports.GetByName = GetByName;
module.exports.spamMark = spamMark;
module.exports.GetByNumber = GetByNumber