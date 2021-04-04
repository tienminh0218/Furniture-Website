const Category = require('../models/Category');

class CategorysController {

    create (req, res, next) {
        res.render('./me/categorys');
    }
}

module.exports = new CategorysController();