var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session= require('express-session');

var config ={
    user:'udnan',
    database:'udnan',
    password:'db-udnan-7012',
    host:'db.imad.hasura-app.io',
    port:'5432'
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:'someRandomSecretValue',
    cookie:{ maxAge:1000*60*60*24*30}
    
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

// password handling
function hash(input,salt){
    var hashed =crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2S','10000',salt,hashed.toString('hex')].join('$');
}




app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    
    //user name and password
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES($1,$2)',[username,dbString],function(err,result){
        if (err){
            res.status(500).send(err.toString(err));
        }else{
            res.send("User succesfully created :"+username);
        }
        
    });
    
});

app.post('/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    
    pool.query('SELECT * FROM "user" WHERE username=$1',[username],function(err,result){
        if (err){
            res.status(500).send(err.toString(err));
        }else{
            if (result.rows.length===0){
                res.status(403).send("USERNAME/PASSWORD is INVALID!");
                
            }else{
                var dbString=result.rows[0].password;
                var salt =dbString.split('$')[2];

                var hashedPassword=hash(password,salt);
                if (hashedPassword===dbString){
                    req.session.auth= {userName:result.rows[0].username};
                    res.send("CREDENTIALS are correct ");
                }else{
                    res.status(403).send("USERNAME/PASSWORD is INVALID!");
                    
                }
                
            }
        
        }
        
    });
});

app.get('/check-login',function(req,res){
    if (req.session && req.session.auth && req.session.auth.userName){
        res.send("You are logged in"+req.session.auth.userName);
    }else{
        res.send("You are not logged in! ");
    }
});

//data

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

app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname,'ui','login.html'));
});

app.get('/signup',function(req,res){
    res.sendFile(path.join(__dirname,'ui','signup.html'));
});

app.get('/ui/login.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','login.js'));
});

app.get('/ui/signup.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','signup.js'));
});

app.get('/logout',function(req,res){
    delete req.session.auth;
});



//new comment system
app.get('/comment',function(req,res){
    
    pool.query('SELECT * FROM "comment"',function(err,result){
        if (err){
            res.status(500).send("Something went wrong ");
        }else{
            if (result.rows.length===0){
                res.status(403).send("NO comments till now :(");
                
            }else{
                res.send(result.rows);
                }
            }
        
        });
});

app.post('/comment',function(req,res){
    var username=req.session.auth.userName;
    var comment=req.body.comment;
    //inserting comment
    pool.query('INSERT INTO "comment" (username,comment) VALUES($1,$2)',[username,comment],function(err,result){
        if (err){
            res.status(500).send(err.toString(err));
        }else{
            res.send(username+" succesfully Inserted comment :"+comment);
        }
    });
    
});

/*var comments=[];
app.get('/comments/:comment',function(req,res){var comment=req.params.comment;console.log(comment);var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    if (comment !==''){comments.push(comment+'  -from ip:'+ip.toString());}res.send(JSON.stringify(comments));});*/

var pool=new Pool(config);

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
