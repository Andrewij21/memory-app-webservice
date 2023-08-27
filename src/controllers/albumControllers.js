const albumService = require("../services/albumServices");
const checkIfEmpty = require("../utils/checkIfEmpty");
const checkResponse = require("../utils/checkResponse");

let response;
class AlbumControllers {
  async getPhoto(req, res) {
    try {
      const data = await albumService.get();
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }

  async createPhoto(req, res) {
    const { name, date } = req.body;
    const check = checkIfEmpty([name, date]);
    if (check.status) {
      return res.status(400).json({ message: check.msg });
    }
    try {
      const data = await albumService.create(req.body);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }

  async updatePhoto(req, res) {
    const { name, date } = req.body;
    const check = checkIfEmpty([name, date]);
    if (check.status) {
      return res.status(400).json({ message: check.msg });
    }
    try {
      const data = await albumService.update(req.body, req.params.id);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response, __filename);
  }
}

module.exports = new AlbumControllers();
