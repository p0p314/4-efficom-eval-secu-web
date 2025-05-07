const Message = require('../model/role.schema.js');

const getAll = (req, res, next) => {
    let result = Role.findAll();
    res.status(200).json(result);
}


const getById = async (req, res, next) => {
    let result = await Message.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(result);
}

const create = async (req, res, next) => {
    let messageTosave = {};
    
    if(req.body.title && req.body.title != null && req.body.title != ""){
        messageTosave.name = req.body.name;
    }
    if(req.body.content && req.body.content != null && req.body.content != ""){
        messageTosave.content = req.body.content;
    }

    try {
        let result = await Message.create({
            title: req.body.name,
            content: req.body.content,
            userId: req.payload.id
        });
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const update = async (req, res, next) => {
    try {
        let message = await Message.findOne({where: {id: req.params.id} });

        if(!message) {
            res.status(404).json({message: "message not found"});
        }

        if(message.userId != req.payload.id) {
            res.status(403).json({error: "You cannot change this message"});
        }
        
        let result = Message.updateOne(req.body, { id: req.params.id });
        res.status(201).json(result);
    } catch (E){
        return res.status(404).json(e.message);
    }
}

const remove = async (req, res, next) => {
    let message = await Message.findOne({where: {id: req.params.id} });

    if(!message) {
        res.status(404).json({message: "message not found"});
    }

    if(message.userId != req.payload.id) {
        res.status(403).json({error: "You cannot change this message"});
    }
    
    let result = Message.remove(req.params.id);
    res.status(200).json(result);
}

module.exports = { getAll, create, getById, update, remove };