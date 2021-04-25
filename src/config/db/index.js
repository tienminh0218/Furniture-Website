const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(
            "mongodb+srv://nodejs-khoapham:ZYIljMjJADH49dEY@cluster0.7tp7o.mongodb.net/DoAn2?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            }
        );
        console.log("%c Connect success", "color: yellow");
    } catch (error) {
        console.log("Error connect:" + error);
    }
}

module.exports = { connect };
