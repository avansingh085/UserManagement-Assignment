import Joi from "joi";

export const userValidationSchema = Joi.object({
  name: Joi.string().trim().min(2).required(),

  email: Joi.string()
    .email()
    .lowercase()
    .required(),
  phone: Joi.string().min(10).required(),
  company: Joi.string().trim().required(),
  address: Joi.object({
    city: Joi.string().trim().required(),
    zipcode: Joi.string().required(),
    geo: Joi.object({
      lat: Joi.number().required(),
      lng: Joi.number().required()
    }).required()

  }).required()
});

export const userUpdateSchema = Joi.object({
  name: Joi.string().trim().min(2),
  email: Joi.string().email().lowercase(),
  phone: Joi.string().min(10),
  company: Joi.string().trim(),
  address: Joi.object({
    city: Joi.string().trim(),
    zipcode: Joi.string(),
    geo: Joi.object({
      lat: Joi.number(),
      lng: Joi.number()
    })
  })
}).min(1); 

