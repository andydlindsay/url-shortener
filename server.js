var express = require('express');

var app = express();

app.use(express.static(__dirname + '/templates'));

app.get('*', function (req, res) {
    res.render('index');
});

app.listen(process.env.PORT, function () {
    console.log('app listening on port ' + process.env.PORT);
});