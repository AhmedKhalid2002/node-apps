//  login validation schama
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .min(8)
    .required(),
}).required();

// sign up validation schama
export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  age: Joi.number().integer().min(18).required(),
  name: Joi.string().min(3).max(30).required(),
}).required();

// forget password validation schama
export const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
}).required();

// reset password validation schama
export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
}).required(); 