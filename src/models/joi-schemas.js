import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const PlaceSpec = {
  name: Joi.string().required(),
  location: Joi.string().required(),
  info: Joi.string().required(),
  lat: Joi.string().required(),
  lng: Joi.string().required(),
};

export const PlaceMarkSpec = {
  title: Joi.string().required(),
};
