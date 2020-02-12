let express = require('express');
let bodyParser = require('body-parser');
let oauthserver = require('oauth2-server');
let mongoose = require('mongoose');
let app = express();
let apiRoutes = require("./api-routes");

const model = {
    // We support returning promises.
    getAccessToken: function() {
      return new Promise('works!');
    },
  
    // Or, calling a Node-style callback.
    getAuthorizationCode: function(done) {
      done(null, 'works!');
    },
  
    // Or, using generators.
    getClient: function*() {
      yield somethingAsync();
      return 'works!';
    },
  
    // Or, async/wait (using Babel).
    getUser: async function() {
      await somethingAsync();
      return 'works!';
    }
  };


// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.oauth =  new oauthserver({
    model: model,
    grants: ['password'],
    debug: true ,
    accessTokenLifetime: 60 * 60 * 24,
    clientIdRegex: '^[A-Za-z0-9-_\^]{5,30}$'
});

app.all('/oauth/token', app.oauth.grant());

app.get("/",app.oauth.authorise(), function(req,res){
    res.send("Secret area");
});
app.use(app.oauth.errorHandler());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/expenceManagement', { useNewUrlParser: true});
var database = mongoose.connection;

if(!database)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 3000;
// Use Api routes in the App
app.use('/api', apiRoutes);
app.listen(port, function () {
    console.log("Running Projects on port " + port);
});