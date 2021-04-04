module.exports = {
    multipalToObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    toObject: function (mongooses) {
        return mongooses ? mongooses.toObject() : mongooses;
    }
}