const {
  Schema,
  model,
  Schema: {
    Types: { ObjectId },
  },
} = require("mongoose");
const adressSchema = new Schema({
  house_number: { type: String },
  road: { type: String },
  neighbourhood: { type: String },
  suburb: { type: String },
  borough: { type: String },
  city: { type: String },
  postcode: { type: String },
  country: { type: String },
  country_code: { type: String },
});
const recordSchema = new Schema({
  title: { type: String, unique: true, required: true },
  lat: { type: String },
  lon: { type: String },
  adress: { type: adressSchema, required: true },
  images: { type: Array, required: true },
});

module.exports = model("record", recordSchema, "records");
