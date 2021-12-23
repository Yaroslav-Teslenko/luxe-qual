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
    /*
     n
    w e
     s

     nw  ne
     sw  se
    */
    const { sw_lat, ne_lat, sw_lng, ne_lng } = bounds;
    const responce = await RecordModel.find({
      location: {
        $geoWithin: {
          $box: [
            [sw_lng, sw_lat],
            [ne_lng, ne_lat],
          ],
        },
      },
    });
    return responce;
  }
}

module.exports = new RecordService();
