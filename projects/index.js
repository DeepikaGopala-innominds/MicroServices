let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
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