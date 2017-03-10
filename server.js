var express = require('express');
var path = require('path');
var utilities = require('./utilities.js');
var mongo = require('mongodb');

var app = express();
var username = process.env.URLMDBUSER;
var password = process.env.URLMDBPASS;
var url = "mongodb://" + username + ":" + password + "@ds127730.mlab.com:27730/url_shortener";

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// app.use(express.static(path.join(__dirname + '.../templates')));
app.use(express.static(__dirname + '/templates'));
app.set('views', path.join(__dirname, '/templates'));
app.set('css', path.join(__dirname, '/templates/css'));

app.get(['/new/https://:url', '/new/http://:url'], function(req, res) {
    // console.log('req.params.url:', req.params.url);
    var responseObj = {};
    
    // check if passed url string is valid
    console.log(utilities.validURL(req.params.url));
    if (!(utilities.validURL(req.params.url))) {
        responseObj = {
           error: "Please enter a valid URL in the http://www.example.com format." 
        };
    } else {
        // check if http:// or https:// submitted by looking at the 10th character in the request url
        // console.log(req.url[9] == 's');
        var secure = (req.url[9] == 's');
        
        // log the url and http type in db and return index to client
        
        
        
        responseObj = {
          original_url: 'http' + (req.url[9] == 's' ? 's' : '') + '://' + req.params.url,
          short_url: null
        };
    }
    
    res.send(responseObj);
});

app.get('/new/*', function(req, res) {
   res.send({ error: "Please enter a valid url containing http:// or https://."}); 
});

app.get('/:shortened_url_id', function(req, res) {
     
    // query the database for the requested shortened url (db index)
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        var urls = db.collection('urls');
        // console.log('urls', urls);
        urls.find({
            "original_url": "ca.godaddy.com/promos/campaigns/cats-with-hats"
        }).toArray(function(err, doc) {
            if (err) throw err;
            console.log(doc.original_url);
        });
        db.close();
    });
    
    // redirect the client or notify the user of db index not found
    
    res.send(req.params.shortened_url_id);
});

app.get('*', function (req, res) {
    res.render('index');
});

app.listen(process.env.PORT, function () {
    console.log('app listening on port ' + process.env.PORT);
});