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
  lat: { type: Number },
  lon: { type: Number },
  adress: { type: adressSchema, required: true },
  images: { type: Array, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
  },
});
//Geocode & create location
recordSchema.pre("save", async function (next) {
  this.location = {
    type: "Point",
    coordinates: [this.lon, this.lat],
    //  formattedAddress: loc[0].formattedAddress,
  };

  // Do not save address
  this.address = undefined;
  next();
});
module.exports = model("record", recordSchema, "records");
