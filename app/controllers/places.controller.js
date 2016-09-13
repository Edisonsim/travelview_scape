var Place = require('mongoose').model('Place');

function createPlace(req, res) {
    var login = (req.user) ? true : false;

    var places;
    Places.find({}, function (err, data) {
        places = data;
    });

    res.render('place/create', {
        places: places,
        login: login
    });
}

function postPlace(req, res) {
    var login = (req.user) ? true : false;

    var place = new Places();
    place.address = req.body.address;
    place.descriptions = req.body.descriptions;
    place.country = req.body.country;
    place.user = req.user._id;
    place.save(function (err) {
        if (err) {
            console.log(err);
            res.status(500).send(err.message);
        } else {
            res.redirect('/place');
        }
    });
    return app;
}

module.exports = {
  createPlace: createPlace,
  postPlace: post:place
}
