var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.get('/', function(req, res, next) {
    Product.find(function(err, products) {
        if (err)
            res.send(err);

        res.json({
            products : products,
            user : req.user,
            token : req.query.secret_token
        });
    });    
});

router.post('/',function(req, res) {

    var product = new Product();
    product.nom             = req.body.nom;
    product.reference       = req.body.reference;
    product.photo           = req.body.photo;
    product.date            = req.body.date; 
    product.emprunte_par    = req.body.emprunte_par;
    product.localisation    = req.body.localisation;
    product.estDispo        = req.body.estDispo;
    product.caution         = req.body.caution;
    product.debut_emprunt   = req.body.debut_emprunt;
    product.fin_emprunt     = req.body.fin_emprunt;

    product.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: "Produit créé avec succès!",
            user : req.user,
            token : req.query.secret_token
        });
    });
});

router.get('/:product_id',function(req, res){

    Product.findById(req.params.product_id, function(err, product) {
        if (err)
            res.send(err);
        res.json({
            product: product,
            user : req.user,
            token : req.query.secret_token
        });
    });
});

router.put('/:product_id',function(req, res) {

    Product.findById(req.params.product_id, function(err, product) {

        if (err)
            res.send(err);

        for(var el in req.body) {
            product[el] = req.body[el];
        }
        
        product.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: "Sauvegardé!",
                user : req.user,
                token : req.query.secret_token
            });
        });
    });
});


router.delete('/:product_id',function(req, res) {
    Product.remove({
        _id: req.params.product_id
    }, function(err, product) {
        if (err)
            res.send(err);

        res.json({
            message:"Supprimé!",
            user : req.user,
            token : req.query.secret_token
        });
    });
});

module.exports = router;
