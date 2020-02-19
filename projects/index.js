let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let apiRoutes = require("./api-routes");
let axios = require('axios');
let cors = require('cors');
var port = process.env.PORT || 9000;

const clientID = '478t7ahpg9o8kvbefsatl9tr9f';
const clientSecret = '1h9bso3il8ah3qb2q6gma3cqbunv5jm2jjegaeor5464m9pbvonr';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// // Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/expenceManagement', { useNewUrlParser: true});
var database = mongoose.connection;

if(!database)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.use(cors({
    origin: 'http://localhost',
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options('*', cors())

app.all('', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //Auth Each API Request created by user.
    next();
});
app.use('/api', apiRoutes);
app.listen(port, function () {
    console.log("Running Projects on port " + port);
});

// function obtainToken(req, res) {

// 	var request = new Request(req);
// 	var response = new Response(res);
// 	const headers = {
// 		'Content-Type' : 'application/x-www-form-urlencoded' 
// 	}

// 	return app.oauth.token(request, response)
// 		.then(function(token) {

// 			res.json(token);
// 		}).catch(function(err) {

// 			res.status(err.code || 500).json(err);
// 		});
// }

// function authenticateRequest(req, res, next) {

// 	var request = new Request(req);
// 	var response = new Response(res);

// 	return app.oauth.authenticate(request, response)
// 		.then(function(token) {

// 			next();
// 		}).catch(function(err) {

// 			res.status(err.code || 500).json(err);
//         });
// }

// var bodyParser = require('body-parser');
// var express = require('express');
// var OAuthServer = require('express-oauth-server');
// var port = process.env.PORT || 8000;

// var app = express();

// app.oauth = new OAuthServer({
//   model: require("./model.js"), // See https://github.com/oauthjs/node-oauth2-server for specification
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(app.oauth.authorize());

// app.use(function(req, res) {
//   res.send('Secret area');
// });

// app.listen(port, function () {
//       console.log("Running Projects on port " + port);
//   });