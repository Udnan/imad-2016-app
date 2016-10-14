var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/main.js', function (req, res) {
  console.log("loaded JS file");
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/JS.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'JS.png'));
});

app.get('/ui/Nandu.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Nandu.jpg'));
});

app.get('/ui/python1.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'python1.png'));
});

app.get('/ui/c.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'c.png'));
});

app.get('/ui/css.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'css.png'));
});

app.get('/ui/html.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'html.png'));
});

app.get('/ui/wall.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'wall.jpg'));
});

app.get('/ballExplosion', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ball_index.html'));
});

app.get('/ui/ball_style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ball_style.css'));
});

app.get('/ui/ball_main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ball_main.js'));
});

var comments=[];
app.get('/comments/:comment',function(req,res){
    var comment=req.params.comment;
    console.log(comment);
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    comments.push(comment+'  -from ip:'+ip.toString());
    res.send(JSON.stringify(comments));
});





var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
