const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Course = new Schema ({
    name: { type: String, maxLength: 255},
    description: { type: String, maxLength: 255},
    image: { type: String, default: 600,},
    slug: { type: String, slug: 'name', unique: true},
    
}, {
    timestamps: true,
});

/// add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete,{
    overrideMethods: 'all',
    deletedAt : true,
})

module.exports = mongoose.model('courses',Course);