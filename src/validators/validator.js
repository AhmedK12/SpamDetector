const userModel = require("../models/userModel");

const isValidPassword = function (pass) {
    return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(pass.trim());
  };


const isValidEmail =  (email)=>{
    return (typeof email !=='string' || email.trim()===""  || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim()))?false:true;
}
const isValidPhone = (req,attribute)=>{
    req.body[attribute] = req.body[attribute].toString().replace('+91-',"").replace('91-',"").replace("+91","").trim()
    if(req.body[attribute][0]=='0')
    req.body[attribute] = req.body[attribute].split("").splice(1,10).join("")
    if(req.body[attribute].split("").length==12){
        req.body[attribute] = req.body[attribute].replace("91","");
        
    }
    return (!/^[6-9]{1}[0-9]{9}$/.test(req.body[attribute]))?false:true;
}
const isValidName = (req)=>{
    if(!typeof req.body.name) return false
    req.body.name = req.body.name.split(" ").filter(e=>e).join(" ")
    return (!/^[A-Za-z ]{1,29}$/.test(req.body.name))?false:true;
}







const mincost = async (a, b)=>
{

   try {
    let dp = Array(a.length+1).fill().map(() => Array(b.length+1));
    for(let i=0;i<=a.length;i++){
        for(let j=0;j<=b.length;j++){
            if(i==0)
                dp[i][j] = j;
            else if(j==0)
                dp[i][j] = i;
            else if(a.charCodeAt(i-1) == b.charCodeAt(j-1))
                dp[i][j] = dp[i-1][j-1];
            else{
                dp[i][j] = 1 + Math.min(dp[i-1][j], Math.min(dp[i][j-1], dp[i-1][j-1]));
            }
        }
    }
    return dp[a.length][b.length];

   } catch (error) {
    return res.status(500).send({ status: false, messsage: error.message })
   }
	
}




const nearestCollege = async (name,userNames)=>{
 try {
 let list = []; 
 console.log(userNames)
 for(let i=0;i<userNames.length;i++){
    list.push([userNames[i], await mincost(name,userNames[i].name.toLowerCase())])
 }

await list.sort((a,b)=>{
     return a[1]-b[1]
 })
 console.log(list)
 return list.map(e=>e[0])
 } catch (error) {
    return {}
 }
}

















module.exports.nearestCollege = nearestCollege
module.exports.isValidEmail = isValidEmail;
module.exports.isValidPhone =isValidPhone;
module.exports.isValidName = isValidName;
module.exports.isValidPassword = isValidPassword