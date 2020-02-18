let express = require('express');
let jwt = require('jsonwebtoken');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let apiRoutes = require("./api-routes");
let CognitoExpress = require('cognito-express');
const expressValidator = require('express-validator')
var port = process.env.PORT || 4000;
let app = express();
const cognitoExpress = new CognitoExpress({
	region: "us-east-1",
	cognitoUserPoolId: "us-east-1_UVFlLBsPg",
	tokenUse: "access", //Possible Values: access | id
	tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/expenceManagement', { useNewUrlParser: true});
var db = mongoose.connection;
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator);
app.use('/api', apiRoutes);
app.use(function(req, res, next) {
    let accessTokenFromClient = req.headers.accesstoken;
    if (!accessTokenFromClient) return res.status(401).send("Access Token missing from header");
 
    cognitoExpress.validate(accessTokenFromClient, function(err, response) {
        
        //If API is not authenticated, Return 401 with error message. 
        if (err) {
            err = {
                "name": "TokenNotFound",
                "message": "access token not found"
            };
            
            //If tokenuse doesn't match accessTokenFromClient
            // {
            //     "name": "InvalidTokenUse",
            //     "message": "Not an id token"
            // }
 
            // //If token expired
            // err = {
            //     "name": "TokenExpiredError",
            //     "message": "jwt expired",
            //     "expiredAt": "2017-07-05T16:41:59.000Z"
            // }
 
            // //If token's user pool doesn't match the one defined in constructor
            // {
            //     "name": "InvalidUserPool",
            //     "message": "access token is not from the defined user pool"
            // }
            return res.status(401).send(err);
     }
        res.locals.user = response;
        next();
    });
});

app.get('/', (req,res) => {
    res.json({
        message: "Home Page Started!!"});
});

app.listen(port, function () {
    console.log("Running Vendor on port " + port);
});