const User = require('./../model/user.schema.js');
const Role = require('../model/role.schema.js');
const bcrypt = require('bcrypt');

const getAll = (req, res, next) => {
    let result = User.findAll();
    res.status(200).json(result);
}


const getById = async (req, res, next) => {
    let result = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(result);
}

const create = async (req, res, next) => {
    let member = await Role.findOne({ where: { name: "Member" } });
    if (!member) {
        return res.status(404).json({ message: "Le rôle Member n'as pas été trouvé" });
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

const update = (req, res, next) => {
    let userToUpdate = User.findOne({ where: {id: req.payload.id}})
    if(req.body.email && req.body.email != null && req.body.email != ""){
        userToUpdate.email = req.body.email;
    }
    
    if(req.body.password && req.body.password != null && req.body.password != ""){
        if(req.body.password == req.body.confirmPassword) {
            userToUpdate.password = bcrypt.hashSync(req.body.password, 10);
        }
    }
    userToUpdate.save();
    res.status(201).json(userToUpdate);
}

const remove = (req, res, next) => {
    let userToRemove = User.findOne({ where: {id: req.payload.id}})
    
    userToRemove.destroy();
    res.status(200).json(result);
}

const addRole = async (req, res, next) => {
    try {
        let role = await Role.findOne({ where: { id: req.params.roleId } });
        let user = await User.findOne({ where: { id: req.params.userId } });
        user.addRole(role);
        user.save();
        return res.status(201).json({ message: "Le rôle a bien été ajouté à l'utilisateur" });
    } catch (e) {
        return res.status(404).json(e);
    }
}

const removeRole = async (req, res, next) => {
    try {
        let role = await Role.findOne({ where: { id: req.params.roleId } });
        let user = await User.findOne({ where: { id: req.params.userId } });
        user.removeRole(role);
        user.save();
        return res.status(201).json({ message: "Le rôle a bien été retiré de l'utilisateur" });
    } catch (e) {
        return res.status(404).json(e);
    }
}

module.exports = { getAll, create, getById, update, remove, addRole, removeRole };