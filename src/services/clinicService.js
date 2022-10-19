const db = require("../models");

let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        if (data.action === "CREATE") {
          await db.Clinic.create({
            name: data.name,
            address: data.address,
            image: data.imageBase64,
            descriptionHTML: data.descriptionHTML,
            descriptionMarkdown: data.descriptionMarkdown,
          });
        } else if (data.action === "EDIT") {
          let clinicInfo = await db.Clinic.findOne({
            where: { id: data.clinicId },
            raw: false,
          });
          if (clinicInfo) {
            clinicInfo.name = data.name;
            clinicInfo.address = data.address;
            clinicInfo.image = data.image;
            clinicInfo.descriptionHTML = data.descriptionHTML;
            clinicInfo.descriptionMarkdown = data.descriptionMarkdown;
            clinicInfo.id = data.clinicId;
            // doctorMarkdown.updatedAt = new Date();
            await clinicInfo.save();
          }
          console.log('check id clinic>>>', clinicInfo)
        }
        resolve({
          errCode: 0,
          errMessage: "Ok!",
        });
      }
    } catch (e) {
      reject(e);
    }
    console.log('check data clinic>>>', data)
  });
};

let getAllClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();

      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Ok!",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: { id: inputId },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        console.log('check id input>>', inputId)
        if (data) {
          //do something
          let doctorClinic = [];
          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });
          data.doctorClinic = doctorClinic;
        } else {
          data = { key: 'loi roi' };
        }
        resolve({
          errCode: 0,
          errMessage: "Ok!",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailClinicInfo = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: { id: inputId },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
            "image"
          ],
        });
        console.log('check id input>>', inputId)
        // if (data) {
        //   //do something
        //   let doctorClinic = [];
        //   doctorClinic = await db.Doctor_Infor.findAll({
        //     where: { clinicId: inputId },
        //     attributes: ["doctorId", "provinceId"],
        //   });
        //   data.doctorClinic = doctorClinic;
        // } else {
        //   data = { key: 'loi roi' };
        // }
        resolve({
          errCode: 0,
          errMessage: "Ok!",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
  getDetailClinicInfo: getDetailClinicInfo
};
