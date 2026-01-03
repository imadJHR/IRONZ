const cloudinary = require("cloudinary").v2;

function initCloudinary() {
  // Configuration directe (à éviter en production pour les secrets)
  cloudinary.config({
    cloud_name: "dypjgpisl",
    api_key: "981195214924221",
    api_secret: "3RAj44lyeVCpVnF_QCbclw7i0Ag"
  });

  return cloudinary;
}

module.exports = initCloudinary;