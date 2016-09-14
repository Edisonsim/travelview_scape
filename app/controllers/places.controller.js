var Place = require('mongoose').model('Place');
var Article = require('mongoose').model('Article');


function createPlace(req, res) {
    var login = (req.user) ? true : false;

    Place.find({}, function (err, data) {
      res.render('place/create', {
          place: data,
          login: login
      })
    });

    ;
}

function postPlace(req, res) {
    var login = (req.user) ? true : false;
    console.log(req.user);

    var place = new Place();
    place.address = req.body.address;
    place.descriptions = req.body.descriptions;
    place.country = req.body.country;
    place.user = req.user._id;
    place.save(function (err, place) {
        if (err) {
            console.log(err);
            res.status(500).send(err.message);
        } else {
            res.redirect('/place');
        }
    });
}

function getPlace(req, res) {
        var login = (req.user) ? req.user : false;

        Place.find({}, function (err, place) {
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
