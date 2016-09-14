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

function getPlace(req, res) {
        var login = (req.user) ? req.user : false;

        Places.find({}, function (err, place) {
            if (err) {
                res.status(500).send(err.message);
            } else {
                Article.find({status: "APPROVED"}, function (err, articles) {
                    if (err) {
                        res.status(500).send(err.message);
                    } else {
                        res.render('place/index', {
                            places: place,
                            articles: articles,
                            login: login
                        });
                    }
                });
            }
        });
    }

module.exports = {
  createPlace: createPlace,
  postPlace: postPlace,
  getPlace: getPlace
}
