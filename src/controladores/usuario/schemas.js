const Joi = require('joi');

const schemaUsuario = Joi.object({
  nome: Joi.string().required().messages({
    'any.required': 'o campo nome é obrigatorio'
  }),
  senha: Joi.string().min(5).required(),
  telefone: Joi.string().required(),
  email: Joi.string().email().required(),
  cpf: Joi.string().required(),
  data_nascimento: Joi.string().required()
});

const validarReq = joiSchema => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ erro: 'Erro de validação' });
  }
};

module.exports = {
  schemaUsuario,
  validarReq
};

