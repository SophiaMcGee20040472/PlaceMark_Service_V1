import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const PlaceMarkSpec = Joi.object()
  .keys({
    name: Joi.string().required(),
    location: Joi.string().required(),
    info: Joi.string().required(),
    lat: Joi.string().required(),
    lng: Joi.string().required(),
    categoryid: IdSpec,
  })
  .label("Place");

export const PlaceMarkSpecPlus = PlaceMarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlaceMarkPlus");
export const PlaceMarkArraySpec = Joi.array().items(PlaceMarkSpecPlus).label("PlaceMarkArray");

export const CategorySpec = Joi.object()
  .keys({
    title: Joi.string().required().example("FreshWater"),
    userid: IdSpec,
    places: PlaceMarkArraySpec,
  })
  .label("Catergory");

export const CategorySpecPlus = CategorySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CategoryPlus");

export const CategoryArraySpec = Joi.array().items(PlaceMarkSpecPlus).label("CategoryArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
