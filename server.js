var express = require('express');
var path = require('path');
var utilities = require('./utilities.js');
var mongo = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

var app = express();
var username = process.env.URLMDBUSER;
var password = process.env.URLMDBPASS;
var url = "mongodb://" + username + ":" + password + "@ds127730.mlab.com:27730/url_shortener";
var db;

// database connection and application listen
mongo.connect(url, function(err, database) {
    if (err) throw err;
    db = database;
    app.listen(process.env.PORT, function () {
        console.log('app listening on port ' + process.env.PORT);
    });
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// app.use(express.static(path.join(__dirname + '.../templates')));
app.use(express.static(__dirname + '/templates'));
app.set('views', path.join(__dirname, '/templates'));
// app.set('css', path.join(__dirname, '/templates/css'));

app.get(['/new/https://:url', '/new/http://:url'], function(req, res) {
    // console.log('req.params.url:', req.params.url);
    var responseObj = {};
    
    // check if passed url string is valid
    // console.log(utilities.validURL(req.params.url));
    if (!(utilities.validURL(req.params.url))) {
        responseObj = {
           error: "URL must be in the valid http://www.example.com format." 
        };
        res.send(responseObj);
    } else {
        // check if http:// or https:// submitted by looking at the 10th character in the request url
        // console.log(req.url[9] == 's');
        var secure = (req.url[9] == 's');
        var orgUrl = req.params.url;
        var shortUrl;
        var docObj = {
            "original_url": orgUrl,
            "secure": secure
        };
        // query db to determine if url has already been shortened
        db.collection('urls').find({
            original_url: orgUrl
        }).toArray(function(err, doc) {
            if (err) throw err;
            if (doc.length > 0) {
                var orgDoc = doc[0];
                orgUrl = 'http' + (req.url[9] == 's' ? 's' : '') + '://' + orgDoc.original_url;
                shortUrl = 'http://andydlindsay-url-shortener.herokuapp.com/' + orgDoc._id;
                responseObj = {
                  original_url: orgUrl,
                  short_url: shortUrl
                };
                res.send(responseObj);
            } else {
                // log the url and http type in db and return index to client
                db.collection('urls').insert(docObj, function(err, docInserted) {
                    if (err) throw err;
                    orgUrl = 'http' + (req.url[9] == 's' ? 's' : '') + '://' + req.params.url;
                    shortUrl = 'http://andydlindsay-url-shortener.herokuapp.com/' + docInserted.insertedIds[0];
                    responseObj = {
                      original_url: orgUrl,
                      short_url: shortUrl
                    };
                    res.send(responseObj);
                });
            }
        });
    }
});

app.get('/new/*', function(req, res) {
   res.send({ error: "Url must start with either http:// or https://."}); 
});

app.get('/:shortened_url_id', function(req, res) {
     
    // query the database for the requested shortened url (db index)
    var id;
    if (utilities.isHex(req.params.shortened_url_id)) {
        id = ObjectID(req.params.shortened_url_id);
    } else {
        id = req.params.shortened_url_id;
    }
    
    // console.log('urls', urls);
    db.collection('urls').find({
        _id: id
    }).toArray(function(err, doc) {
        if (err) throw err;
        // console.log('doc:', doc);
        if (doc.length > 0) {
            // redirect the client
            var orgUrl = doc[0];
            var builtUrl = 'http' + ( orgUrl.secure ? 's' : '' ) + '://' + orgUrl.original_url;
            res.redirect(builtUrl);
        } else {
            // notify the user of db index not found
            res.send({ error: "The supplied url does not match anything in the database." });
        }
    });
    
});

app.get('*', function (req, res) {
    res.render('index');
});
