const Blacklist = require("../model/blacklist.schema");

const checkBlackList = (req, res, next) => {

    let ip = req.ip; 
    if(Blacklist.findOne({where: {"ip":ip}}) == null){
        return res.status(403).json({message: "Vous n'avez pas les droits pour réaliser cette action"});
    }
    next();   
}

module.exports = {checkBlackList};