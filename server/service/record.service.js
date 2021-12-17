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

  async getRecords(user) {
    const responce = await RecordModel.find({ user: user });
    return responce;
  }
}

module.exports = new RecordService();
