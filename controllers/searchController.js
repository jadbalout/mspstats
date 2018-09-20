const {post} = require('request');
var async = require('async');
exports.searchUserByRegion = function(req, res, next) {
    async.parallel({
        user: function(callback) {
            var region = req.body.region || req.params.region;
            if (region == undefined)
                return res.redirect('/?swal');
            var regions = ["US", "UK", "CA", "AU", "NZ", "DE", "DK", "FR", "PL", "NL", "SE", "NO", "FI", "TR", "IE", "ES"]
            if (regions.indexOf(region.toUpperCase()) == -1)
                return res.redirect('/?swal');
            var username = req.body.username || req.params.username;
            if (username == undefined || username.length < 3) 
                return res.redirect('/?swal');
            post({
                url:     'http://bla/actor/search/username/',
                form:    { username: encodeURIComponent(username), region: region.toLowerCase() }
            }, function(error, response, body){
                if (error || response.statusCode != 200)
                    callback(true);
                callback(null, {username: username, region: region, data: body});
            });
        },
    }, function(err, results) {
        if(!err) {
            try {
                results.user.data = JSON.parse(results.user.data);
            } catch (e) {
                err = true;
            }
        }
        if (err) {
            var err = new Error('Something went wrong contacting the API...');
            err.status = 500;
            return next(err);
        }
        if(results.user.data.error)
            return res.redirect('/?swal');
        res.render('search', { title: 'MSPStats | '+results.user.username, region: results.user.region, data: results.user.data, i18n: res} );
        return;
    });

};


