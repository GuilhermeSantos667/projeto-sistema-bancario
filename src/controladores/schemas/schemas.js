const Joi = require('joi');
const date = new Date()
const schemaUsuario = Joi.object({
  nome: Joi.string().required().messages({
    'any.required': 'o campo nome é obrigatorio'
  }),
  senha: Joi.string().min(5).required().messages({
    'any.required': 'o campo senha é obrigatorio',
    "string.min" : "a senha deve ser de no minimo 5 caracteres"
  }),
  telefone: Joi.string().required().messages({
    'any.required': 'o campo telefone é obrigatorio',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'o campo email é obrigatorio',
    "string.email": "o email deve ter um formato valido"
  }),
  cpf: Joi.string().max(11).required().messages({
    'any.required': 'o campo senha é obrigatorio',
    "string.max" : "o campo cpf deve ter 11 digitos sem caracteres especiais"

  }),
  data_nascimento: Joi.date().max(date).required().messages({
    "date.base": "o formato valido parar datas é YYYY/MM/DD",
    "date.max": "parece que voce ainda ira nascer hahaha"
  })
});

const validarReq = joiSchema => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

module.exports = {
  schemaUsuario,
  validarReq
};

