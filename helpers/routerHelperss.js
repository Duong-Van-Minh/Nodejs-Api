const Joi = require('@hapi/joi')

const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body)
        if(validatorResult.error){
            return res.status(400).json(validatorResult.error) = {}
        }else{
            if(!req.value) req.value = {}
            if(!req.value['params']) req.value.params = {}
            req.value.body = validatorResult.value
            next()
        }
    }
}



const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate({param: req.params[name]})
        if(validatorResult.error){
            return res.status(400).json(validatorResult.error)
        }else{
            //console.log('1', req.value)
            if(!req.value) req.value = {}
            //console.log('2' ,req.value.param)
            if(!req.value['params']) req.value.params = {}
            //console.log('3', req.value)
            req.value.params[name] = req.params[name]
            //console.log('req value', req.value)
            next()
        }
    }
}

const schemas = {
    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    userSchema: Joi.object().keys({
        firsName: Joi.string()
                .min(3)
                .max(15)
                .required(),
        lastName: Joi.string()
                .min(3)
                .max(15)
                .required(),
        email: Joi.string()
            .email()
            .required()     


    })
}

module.exports = {
    validateParam,
    validateBody,
    schemas
}