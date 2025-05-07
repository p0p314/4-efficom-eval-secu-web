const User = require('./../model/user.schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { passwordComplexity, complexityOptions } = require('../middleware/passwordCheck.middleware.js');

const login = (req, res, next) => {
    let user = User.getByEmail(req.body.email);
    if (!user) {
        return res.status(404).json({error: "Email ou mot de passe incorrect"})
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(404).json({error: "Email ou mot de passe incorrect"})
    }

    res.status(200).json({
        id: user.id,
        email: user.email,
        token: jwt.sign({
            id: user.id,
            roles: user.roles
        }, process.env.SECRET_KEY)
    });
}

const signIn = async (req,res,next) => {
    let member = await Role.findOne({ where: { name: "Member" } });
    if (!member) {
        return res.status(404).json({ message: "Le rôle Member n'as pas été trouvé" });
    }

    if(req.body.email && req.body.email != null && req.body.email != ""){
        userToUpdate.email = req.body.email;
    }
        
    if(req.body.password && req.body.password != null && req.body.password != ""){
        if(req.body.password != req.body.confirmPassword) {
            return res.status(404).json({error: " Mot de passe incorrect"})
        }
        passwordComplexity(complexityOptions).validate(req.body.password);
        
        userToUpdate.password = bcrypt.hashSync(req.body.password, 10);
    }

    try {
        let result = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            roles: [member.id]
        });
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

module.exports = { login, signIn };