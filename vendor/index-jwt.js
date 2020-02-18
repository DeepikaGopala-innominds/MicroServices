let express = require('express');
let jwt = require('jsonwebtoken');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let apiRoutes = require("./api-routes");
// let Amplify = require('aws-amplify');
// let aws_exports = require('./aws-exports');

// Amplify.configure(aws_exports);



let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/expenceManagement', { useNewUrlParser: true});
var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")



app.use('/api', verifyToken, apiRoutes);

app.get('/', (req,res) => {
    res.json({
        message: "Home Page Started!!"});
});

app.post('/login', (req, res) => {
    const user = {
        id: 1,
        username : 'user',
        email: 'user@SpeechGrammarList.com'
    };

    jwt.sign({ user},"secretkey",(err, token) => {
        res.send({
            token: token
        });
    })
});

var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Running Vendor on port " + port);
});


function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader  !== 'undefined'){
        const bearer = bearerHeader.split(' ');
     
        bearerToken = bearer[1];
        console.log(bearerToken);
        jwt.verify(bearer[1], "secretkey", (err, user) => {
            console.log("error", err);
            if(err){
                return res.status(403).json({
                    message: "Invalid token"
                });
            }else{
                next();
            }           
        });   
    }else{
          res.status(401).json({
              message: "Authentication Required"
          });
    }
  }