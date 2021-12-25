const RecordService = require("../service/record.service");

class RecordController {
  async createRecord(req, res, next) {
    try {
      console.log(req.body);
      console.log(req.file);
      const payload = req.body;
      const imagename = req.file.filename;
      payload.image = imagename;
      const responce = await RecordService.createRecord(payload);
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
  async getRecord(req, res, next) {
    try {
      const _id = req.params.id;
      const responce = await RecordService.getRecord(_id);
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
  async editRecord(req, res, next) {
    try {
      // console.log(req);
      const _id = req.params.id;
      const payload = req.body;

      const responce = await RecordService.editRecord(_id, payload);
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
  async deleteRecord(req, res, next) {
    try {
      const _id = req.params.id;
      const responce = await RecordService.deleteRecord(_id);
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }

  async getRecords(req, res, next) {
    try {
      const responce = await RecordService.getRecords(req.query);
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
}

/* const adminrRole = new Role({ value: "ADMIN" });
      await adminrRole.save(); */
module.exports = new RecordController();
