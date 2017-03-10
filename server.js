var express = require('express');
var path = require('path');
var utilities = require('./utilities.js');

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname + '.../templates')));
app.set('views', path.join(__dirname, '/templates'));
app.set('css', path.join(__dirname, '/templates/css'));

app.get(['/new/https://:url', '/new/http://:url'], function(req, res) {
    // console.log('req.params.url:', req.params.url);
    // check if passed url string is valid
    console.log(utilities.validURL(req.params.url));
    
    // check if http:// or https:// submitted by looking at the 10th character in the request url
    // console.log(req.url[9] == 's');
    
    var responseObj = {
      original_url: (req.url[9] == 's' ? 'https://' + req.params.url : 'http://' + req.params.url ),
      short_url: null
    };
    res.send(responseObj);
});

app.get('/new/*', function(req, res) {
   res.send({ error: "Please enter a valid url containing http:// or https://."}); 
});

app.get('/:shortened_url_id', function(req, res) {
    res.send(req.params.shortened_url_id); 
});

app.get('*', function (req, res) {
    res.render('index');
});

app.listen(process.env.PORT, function () {
    console.log('app listening on port ' + process.env.PORT);
});