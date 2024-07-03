const joi = require("joi");
module.exports.schemaNode=joi.object({
    node:joi.object({
        username:joi.string().required(),
        address:joi.string().required(),
        email:joi.string().required(),
        password:joi.string().required(),
        node:joi.string().required(),
        phone:joi.number().required(),
    }).required(),
});

