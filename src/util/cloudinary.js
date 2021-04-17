const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "tengicungduocditme",
    api_key: "238713693441382",
    api_secret: "UnNbpumho1qPyDnhzL-VY0fgL0Y",
});

module.exports = cloudinary;
