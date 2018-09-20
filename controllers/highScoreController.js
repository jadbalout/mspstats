var async = require('async');
const {get} = require('request');
exports.getMoviesByRegion = function(req, res, next) {
    if(!req.params.region) return res.render('movies', { title: 'MSPStats | Movies', i18n: res} );
    async.parallel({
        movie: function(callback) {
            var region = req.body.region || req.params.region;
            var regions = ["US", "UK", "CA", "AU", "NZ", "DE", "DK", "FR", "PL", "NL", "SE", "NO", "FI", "TR", "IE", "ES"]
            if (regions.indexOf(region.toUpperCase()) == -1)
                return res.render('movies', { title: 'MSPStats | Movies', i18n: res} );
            var page = req.body.page || req.params.page || 1;
            if (page%1 !== 0 || page <= 0) 
                return res.render('movies', { title: 'MSPStats | Movies', i18n: res} );
            var weekly = req.body.weekly || req.params.weekly || 1;
            if(weekly=="0") weekly=0;
            weekly = Boolean(weekly);
            weekly = Number(weekly);
            //Turning it into 0 or 1 no matter what.
            get({
                url:     `http://bla/highscore/movies/${region.toLowerCase()}/${page}/${weekly}`,
            }, function(error, response, body){
                if (error || response.statusCode != 200)
                    callback(true);
                callback(null, {region: region, data: body, page:page, weekly:weekly});
            });
        },
    }, function(err, results) {
        if(!err) {
            try {
                results.movie.data = JSON.parse(results.movie.data);
            } catch (e) {
                err = true;
            }
        }
        if (err || results.movie.data.error) {
            var err = new Error('Something went wrong contacting the API...');
            err.status = 500;
            return next(err);
        }
        res.render('movies_highscore', { title: 'MSPStats | Movies', region: results.movie.region, data: results.movie.data, i18n: res, page: results.movie.page, weekly: results.movie.weekly} );
        return;
    });

};
exports.getActorsByRegion = function(req, res, next) {
    if(!req.params.region) return res.render('actors', { title: 'MSPStats | Movie Stars', i18n: res} );
    async.parallel({
        stars: function(callback) {
            var region = req.body.region || req.params.region;
            var regions = ["US", "UK", "CA", "AU", "NZ", "DE", "DK", "FR", "PL", "NL", "SE", "NO", "FI", "TR", "IE", "ES"]
            if (regions.indexOf(region.toUpperCase()) == -1)
                return res.render('actors', { title: 'MSPStats | Movie Stars', i18n: res} );
            var page = req.body.page || req.params.page || 1;
            if (page%1 !== 0 || page <= 0) 
                return res.render('actors', { title: 'MSPStats | Movie Stars', i18n: res} );
            var weekly = req.body.weekly || req.params.weekly || 1;
            if(weekly=="0") weekly=0;
            weekly = Boolean(weekly);
            weekly = Number(weekly);
            //Turning it into 0 or 1 no matter what.
            get({
                url:     `http://bla/highscore/actors/${region.toLowerCase()}/${page}/${weekly}`,
            }, function(error, response, body){
                if (error || response.statusCode != 200)
                    callback(true);
                callback(null, {region: region, data: body, page:page, weekly:weekly});
            });
        },
    }, function(err, results) {
        if(!err) {
            try {
                results.stars.data = JSON.parse(results.stars.data);
            } catch (e) {
                err = true;
            }
        }
        if (err || results.stars.data.error) {
            var err = new Error('Something went wrong contacting the API...');
            err.status = 500;
            return next(err);
        }
        res.render('actors_highscore', { title: 'MSPStats | Movie Star', region: results.stars.region, data: results.stars.data, i18n: res, page: results.stars.page, weekly: results.stars.weekly} );
        return;
    });

};
