const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Categorys = new Schema ({
    name: {type: String},
    productChild: {type: Array},
    image: {type: String},
    slug: {type: String, slug: 'name', unique: true},
},{
    timestamps: true,
});

module.exports = mongoose.model('categorys', Categorys);
