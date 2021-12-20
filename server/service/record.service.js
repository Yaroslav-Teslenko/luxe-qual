const RecordModel = require("../models/record.model");
class RecordService {
  async createRecord(payload) {
    const responce = await RecordModel.create(payload);
    return responce;
  }
  async getRecord(_id) {
    const responce = await RecordModel.findById({ _id });
    return responce;
  }
  async editRecord(_id, payload) {
    const responce = await RecordModel.findByIdAndUpdate({ _id }, payload);
    return responce;
  }

  async deleteRecord(_id) {
    const responce = await RecordModel.findByIdAndDelete({ _id });
    return responce;
  }

  async getRecords(bounds) {
    //const responce = await RecordModel.find({ user: user });
    //     public static Boolean isWithin(this GeoCoordinate pt, GeoCoordinate sw, GeoCoordinate ne)
    // {
    //    return pt.Latitude >= sw.Latitude && pt.Latitude <= ne.Latitude &&
    //           pt.Longitude >= sw.Longitude &&  pt.Longitude <= ne.Longitude

    console.log(bounds);
    const { sw_lat, ne_lat, sw_lng, ne_lng } = bounds;
    console.log(sw_lat, ne_lat);
    // const responce = await RecordModel.find({ $and: [{ lat: { $gte: +sw_lat } }, { lat: { $lte: +ne_lat } }, { lng: { $gte: +sw_lng } }, { lng: { $lte: +ne_lng } }] });
    // const responce = await RecordModel.find({ $and: [{ lat: { $gte: sw_lat } }, { lat: { $lte: ne_lat } }, { lng: { $gte: sw_lng } }, { lng: { $lte: ne_lng } }] });
    const responce = await RecordModel.find({ $and: [{ lat: { $gt: sw_lat } }, { lat: { $lt: ne_lat } }, { lng: { $gt: sw_lng } }, { lng: { $lt: ne_lng } }] });
    return responce;
  }
}

module.exports = new RecordService();
