import clinicService from "../services/clinicService";

let createClinic = async (req, res) => {
  try {
    let infor = await clinicService.createClinic(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let infor = await clinicService.getAllClinic();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailClinicById = async (req, res) => {
  try {
    let inputId = req.query.id;
    let infor = await clinicService.getDetailClinicById(inputId);
    console.log('check req query id', req.query.id)
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailClinicInfo = async (req, res) => {
  try {
    let inputId = req.query.id;
    let infor = await clinicService.getDetailClinicInfo(inputId);
    console.log('check req query id', req.query.id)
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
  getDetailClinicInfo: getDetailClinicInfo
};
