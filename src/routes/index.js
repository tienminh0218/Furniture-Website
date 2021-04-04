const categorysProduct = require('./categorys');


function route(app) {


    app.use('/me/categorys', categorysProduct);
    app.use('/details', (req,res,next) => res.render('details'));
    app.use('/', (req,res,next) => res.render('home'));
}

module.exports = route;
