const express = require('express');
const route = express.Router();
const CategorysController = require('../app/controllers/CategorysController');

route.get('/create', CategorysController.create)

module.exports = route;
