const joi = require("@hapi/joi");

const registerValidation = (data) => {
  // validate register request data
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
    about: joi.string(),
    role: joi.number().required(),
  });

  const { error, value } = schema.validate(data, { abortEarly: false }); // Include all validation errors

  if (error) {
    // Map validation errors to include property names
    const errors = error.details.map((detail) => {
      return {
        property: detail?.context?.key,
        message: detail?.message?.toString(),
      };
    });

    return { error: errors };
  }

  // If validation passed, return the validated data
  return { value };
};

const loginValidation = (data) => {
  // validate login request data
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });
  // return schema.validate(data);

  const { error, value } = schema.validate(data, { abortEarly: false }); // Include all validation errors
  
  if (error) {
    // Map validation errors to include property names
    const errors = error.details.map((detail) => {
      return {
        property: detail?.context?.key,
        message: detail?.message?.toString(),
      };
    });

    return { error: errors };
  }

  // If validation passed, return the validated data
  return { value };
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
